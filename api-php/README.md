# Lead-capture backend

Two endpoints, both plain PHP (no dependencies), designed to sit next to the built
front-end under the same Apache docroot:

- `quote.php` — trade quote / enquiry requests (from the Get a Quote modal, custom
  curtain builder, kits page, and product pages).
- `order.php` — cart checkout order requests (rolls, hardware, replacement strips).
  **This is a mock checkout — it never takes payment.** It emails the order details
  so the team can follow up to confirm pricing, freight and payment.

Every submission is also appended to `leads.log` (JSON lines) as a durable fallback
in case email delivery fails or is misconfigured — check that file if a lead seems
to have gone missing. It's blocked from being served over HTTP by `.htaccess`.

## Local testing (XAMPP)

XAMPP ships with Mercury Mail, which lets PHP's `mail()` work out of the box for
local testing without a real SMTP account:

1. Start **Mercury** from the XAMPP control panel alongside Apache.
2. Submit a quote or test order from the site.
3. Open Mercury's mailbox for `support@drooov.com.au` (or check `leads.log`) to
   confirm it arrived.

## Before this goes live

1. **Set a real recipient.** Edit `config.php` → `RECIPIENT_EMAIL` to an inbox your
   team actually monitors.
2. **Decide how mail is actually sent in production.** PHP's built-in `mail()`
   (what this uses today) is frequently blocked or marked as spam on shared
   hosting. If your production host doesn't have a properly configured mail
   transport, switch `send_lead_email()` in `lib/mailer.php` to send via SMTP
   (e.g. with PHPMailer and your host's or a transactional provider's SMTP
   credentials) instead.
3. **Send a real test lead after deploying** and confirm it lands in the inbox —
   don't assume it works from local testing alone.
4. **Set `FROM_EMAIL` to a real address on your domain** (`config.php`) — some
   mail providers reject or spam-flag mail from a `From:` address that doesn't
   belong to the sending domain.
5. Rotate/clear `leads.log` periodically if you don't want PII sitting in a flat
   file long-term, or migrate to a database if lead volume grows.
