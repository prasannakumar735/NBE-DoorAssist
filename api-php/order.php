<?php
require_once __DIR__ . "/lib/mailer.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond_json(["ok" => false, "error" => "Method not allowed"], 405);
}

$data = json_input();

$orderNumber = trim((string) ($data["orderNumber"] ?? ""));
$shipping = is_array($data["shipping"] ?? null) ? $data["shipping"] : [];
$items = is_array($data["items"] ?? null) ? $data["items"] : [];
$subtotal = (float) ($data["subtotal"] ?? 0);
$shippingCost = (float) ($data["shippingCost"] ?? 0);
$total = (float) ($data["total"] ?? 0);

$customerName = trim((string) ($shipping["name"] ?? ""));
$customerEmail = trim((string) ($shipping["email"] ?? ""));

if ($orderNumber === "" || $customerName === "" || $customerEmail === "" || !is_valid_email($customerEmail) || empty($items)) {
    respond_json(["ok" => false, "error" => "Missing required order details."], 422);
}

$itemLines = array_map(function ($item) {
    $name = clean_header_value((string) ($item["name"] ?? "Item"));
    $sku = clean_header_value((string) ($item["sku"] ?? ""));
    $qty = (int) ($item["qty"] ?? 1);
    $price = (float) ($item["price"] ?? 0);
    return sprintf("  - %s (%s) x%d — $%.2f each", $name, $sku, $qty, $price);
}, $items);

$lines = [
    "New order request — this is a MOCK checkout, no payment has been taken.",
    "",
    "Order reference: {$orderNumber}",
    "Customer: {$customerName}",
    "Email: {$customerEmail}",
    "Phone: " . clean_header_value((string) ($shipping["phone"] ?? "-")),
    "",
    "Ship to:",
    "  " . clean_header_value((string) ($shipping["address1"] ?? "")),
    "  " . clean_header_value((string) ($shipping["address2"] ?? "")),
    "  " . clean_header_value((string) ($shipping["suburb"] ?? "")) . " " . clean_header_value((string) ($shipping["state"] ?? "")) . " " . clean_header_value((string) ($shipping["postcode"] ?? "")),
    "",
    "Items:",
    ...$itemLines,
    "",
    sprintf("Subtotal: $%.2f", $subtotal),
    sprintf("Shipping: $%.2f", $shippingCost),
    sprintf("Total: $%.2f", $total),
    "",
    "Follow up to confirm final pricing, freight and payment before dispatch.",
];
$body = implode("\r\n", $lines);

$sent = send_lead_email("Order request {$orderNumber} — {$customerName}", $body);

log_lead("order", [
    "orderNumber" => $orderNumber,
    "shipping" => $shipping,
    "items" => $items,
    "subtotal" => $subtotal,
    "shippingCost" => $shippingCost,
    "total" => $total,
    "emailed" => $sent,
]);

respond_json(["ok" => true, "emailed" => $sent]);
