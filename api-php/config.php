<?php
/**
 * Lead-capture backend configuration.
 *
 * TODO before going live:
 * 1. Set RECIPIENT_EMAIL to the real inbox that should receive quote/order leads.
 * 2. Decide how mail actually gets sent from your production host — see README.md
 *    in this folder. PHP's built-in mail() often lands in spam or is blocked
 *    entirely on shared hosting; SMTP (via PHPMailer) is more reliable.
 * 3. Confirm this endpoint is reachable at /api-php/quote.php and /api-php/order.php
 *    once deployed, and send a real test enquiry before announcing the site live.
 */

const RECIPIENT_EMAIL = "support@drooov.com.au"; // TODO: confirm this is a real, monitored inbox
const RECIPIENT_NAME = "drooov Sales";
const FROM_EMAIL = "noreply@drooov.com.au"; // TODO: use a real sending address on your domain
const FROM_NAME = "drooov Website";
const SITE_NAME = "drooov";

// Leads are always appended to this local log as a durable fallback, even if email fails.
const LEAD_LOG_PATH = __DIR__ . "/leads.log";

// Reject attachments above this size (keep mail-server-friendly).
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
