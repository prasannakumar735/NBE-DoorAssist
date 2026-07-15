/**
 * Real lead-capture client — posts to the PHP mail endpoints under /api-php.
 * In dev, Vite proxies /api-php to the local XAMPP Apache vhost (see vite.config.js).
 * In production this project's dist/ is deployed alongside the api-php/ folder
 * under the same Apache docroot, so the relative path resolves the same way.
 */
const API_BASE = "/api-php";

async function postJson(path, payload) {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response — fall through to the ok-check below */
  }

  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

/** Submits a quote/enquiry request. Emails the business and logs the lead. */
export function submitQuoteRequest(payload) {
  return postJson("quote.php", payload);
}

/** Submits a cart order request (mock checkout — no payment is taken). */
export function submitOrderRequest(payload) {
  return postJson("order.php", payload);
}

/**
 * Reads a File into the { base64, filename, type } shape quote.php expects
 * as an email attachment. There is no separate file-storage endpoint — the
 * file travels inline in the same JSON POST as the enquiry.
 */
export function fileToAttachment(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.slice(result.indexOf(",") + 1);
      resolve({ base64, filename: file.name, type: file.type || "application/octet-stream" });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
