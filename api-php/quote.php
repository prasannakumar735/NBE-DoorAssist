<?php
require_once __DIR__ . "/lib/mailer.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond_json(["ok" => false, "error" => "Method not allowed"], 405);
}

$data = json_input();

$name = trim((string) ($data["name"] ?? ""));
$email = trim((string) ($data["email"] ?? ""));
$phone = trim((string) ($data["phone"] ?? ""));
$business = trim((string) ($data["business"] ?? ""));
$item = trim((string) ($data["item"] ?? ""));
$message = trim((string) ($data["message"] ?? ""));
$context = trim((string) ($data["context"] ?? ""));
$attachment = is_array($data["attachment"] ?? null) ? $data["attachment"] : null;

if ($name === "" || $email === "" || !is_valid_email($email)) {
    respond_json(["ok" => false, "error" => "A valid name and email are required."], 422);
}

if ($attachment && strlen((string) ($attachment["base64"] ?? "")) > MAX_ATTACHMENT_BYTES * 1.4) {
    // base64 inflates size ~33% — reject generously above the client-side cap
    $attachment = null;
}

$lines = [
    "New quote request from " . SITE_NAME,
    "",
    "Name: {$name}",
    "Email: {$email}",
    "Phone: " . ($phone ?: "-"),
    "Business: " . ($business ?: "-"),
    "Item / spec: " . ($item ?: "-"),
    "Source: " . ($context ?: "-"),
    "",
    "Details:",
    $message ?: "-",
];
$body = implode("\r\n", $lines);

$sent = send_lead_email("Quote request — " . ($item ?: $name), $body, $attachment);

log_lead("quote", [
    "name" => $name,
    "email" => $email,
    "phone" => $phone,
    "business" => $business,
    "item" => $item,
    "message" => $message,
    "context" => $context,
    "hadAttachment" => (bool) $attachment,
    "emailed" => $sent,
]);

respond_json(["ok" => true, "emailed" => $sent]);
