<?php
require_once __DIR__ . "/../config.php";

function json_input(): array {
    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function respond_json(array $data, int $status = 200): void {
    http_response_code($status);
    header("Content-Type: application/json");
    echo json_encode($data);
    exit;
}

/** Strips CR/LF so untrusted input can't inject extra mail headers. */
function clean_header_value(string $value): string {
    return trim(str_replace(["\r", "\n"], " ", $value));
}

function is_valid_email(string $email): bool {
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

function log_lead(string $type, array $payload): void {
    $line = json_encode([
        "time" => date("c"),
        "type" => $type,
        "payload" => $payload,
    ]);
    @file_put_contents(LEAD_LOG_PATH, $line . PHP_EOL, FILE_APPEND | LOCK_EX);
}

/**
 * Sends a plain-text email, optionally with a single base64-encoded attachment.
 * Uses PHP's built-in mail() — see README.md for switching to SMTP in production.
 */
function send_lead_email(string $subject, string $body, ?array $attachment = null): bool {
    $to = clean_header_value(RECIPIENT_EMAIL);
    $subject = clean_header_value($subject);
    $fromHeader = clean_header_value(FROM_NAME) . " <" . clean_header_value(FROM_EMAIL) . ">";

    if ($attachment && !empty($attachment["base64"]) && !empty($attachment["filename"])) {
        $boundary = "b" . md5((string) microtime());
        $filename = clean_header_value($attachment["filename"]);
        $type = clean_header_value($attachment["type"] ?? "application/octet-stream");

        $headers = "From: {$fromHeader}\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

        $message = "--{$boundary}\r\n";
        $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $message .= $body . "\r\n";
        $message .= "--{$boundary}\r\n";
        $message .= "Content-Type: {$type}; name=\"{$filename}\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
        $message .= chunk_split($attachment["base64"]);
        $message .= "--{$boundary}--";

        return @mail($to, $subject, $message, $headers);
    }

    $headers = "From: {$fromHeader}\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    return @mail($to, $subject, $body, $headers);
}
