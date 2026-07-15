import { mockProducts } from "@/prototype/mockProducts";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const base44 = {
  entities: {
    Product: {
      list: async () => {
        await delay(150);
        return mockProducts;
      },
    },
    Enquiry: {
      create: async (payload) => {
        await delay(250);
        // eslint-disable-next-line no-console
        console.log("Enquiry.create", payload);
        return { id: `enq_${Date.now()}` };
      },
    },
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        await delay(250);
        return { file_url: URL.createObjectURL(file) };
      },
      InvokeLLM: async () => {
        await delay(350);
        return "Thanks — for accurate pricing, please submit a quote request and include dimensions, location, and your preferred timeframe.";
      },
    },
  },
};

