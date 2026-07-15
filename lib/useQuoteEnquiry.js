import { useCallback, useRef } from "react";
import { submitQuoteRequest, fileToAttachment } from "@/api/leadsClient";

/**
 * Wires QuoteForm's uploadFile/submitEnquiry props to the real /api-php/quote.php
 * endpoint. There's no file-storage backend, so uploadFile just holds onto the
 * File for later — submitEnquiry reads it into a base64 email attachment.
 */
export function useQuoteEnquiry(context) {
  const fileRef = useRef(null);

  const uploadFile = useCallback(async (file) => {
    fileRef.current = file;
    return { file_url: file.name };
  }, []);

  const submitEnquiry = useCallback(
    async (values) => {
      const attachment = fileRef.current ? await fileToAttachment(fileRef.current) : null;

      const message = [
        values.message,
        "",
        `Project type: ${values.project_type || "-"}`,
        `Dimensions: ${values.width_mm || "-"}mm x ${values.height_mm || "-"}mm`,
        `Quantity: ${values.quantity || "-"}`,
        `Urgency: ${values.urgency || "-"}`,
        `Location: ${values.location || "-"}`,
        `Product ID: ${values.product_id || "-"}`,
      ]
        .filter(Boolean)
        .join("\n");

      await submitQuoteRequest({
        name: values.name,
        email: values.email,
        phone: values.phone,
        business: values.company,
        item: values.door_type,
        message,
        context,
        attachment,
      });
    },
    [context]
  );

  return { uploadFile, submitEnquiry };
}
