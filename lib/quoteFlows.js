/** Family-driven step configuration for the QuoteBuilder wizard.
 *  Adding a new family means adding an entry here — QuoteBuilder itself
 *  stays generic and doesn't branch on family by name. */

export const QUOTE_FLOWS = {
  "rapid-door": {
    label: "Rapid Roller Door Quote",
    itemFieldLabel: "Door type / model",
    steps: [
      {
        id: "application",
        title: "Application",
        question: "What will the door be used for?",
        field: "application",
        type: "choice",
        options: ["Internal Access", "External Access", "Food Processing", "Cold Storage", "High Traffic Area", "Not Sure"],
      },
      {
        id: "environment",
        title: "Facility / Environment",
        question: "What best describes the facility environment?",
        field: "environment",
        type: "choice",
        options: ["Warehouse", "Cold Storage", "Manufacturing", "Distribution / Dock", "Retail", "Other"],
      },
      {
        id: "dimensions",
        title: "Opening Dimensions",
        question: "Opening size",
        field: "dimensions",
        type: "dimensions",
      },
      {
        id: "traffic",
        title: "Traffic Type",
        question: "What type of traffic uses the opening?",
        field: "traffic",
        type: "choice",
        options: ["Pedestrian", "Trolley", "Forklift", "Vehicle", "Mixed Traffic"],
      },
      {
        id: "project",
        title: "Existing Door / Project Type",
        question: "Is this a replacement or a new opening?",
        field: "project_type",
        type: "choice",
        options: ["Replacing an existing door", "New opening / new build", "Not sure"],
      },
      {
        id: "uploads",
        title: "Uploads",
        question: "Upload a drawing, photo or spec sheet (optional)",
        field: "attachment",
        type: "upload",
      },
      {
        id: "contact",
        title: "Contact Details",
        question: "Your details",
        field: "contact",
        type: "contact",
      },
    ],
  },
  pvc: {
    label: "PVC Strip Curtain Quote",
    itemFieldLabel: "PVC type / product",
    steps: [
      {
        id: "requirement",
        title: "PVC Requirement",
        question: "What do you need?",
        field: "requirement",
        type: "choice",
        options: ["Complete Curtain", "Replacement Strips", "Not Sure"],
      },
      {
        id: "environment",
        title: "Application / Environment",
        question: "Where will the curtain be used?",
        field: "environment",
        type: "choice",
        options: ["Warehouse", "Cool Room", "Freezer", "Food Processing", "Workshop", "Existing Curtain Replacement"],
      },
      {
        id: "dimensions",
        title: "Opening Dimensions",
        question: "Opening size",
        field: "dimensions",
        type: "dimensions",
      },
      {
        id: "traffic",
        title: "Traffic Type",
        question: "What uses the opening?",
        field: "traffic",
        type: "choice",
        options: ["Pedestrian", "Trolley", "Forklift", "Mixed Traffic"],
      },
      {
        id: "curtain_type",
        title: "Complete Curtain or Replacement Strips",
        question: "Confirm what you're after",
        field: "curtain_type",
        type: "choice",
        options: ["Complete Curtain", "Replacement Strips"],
      },
      {
        id: "existing",
        title: "Existing Curtain Details / Upload",
        question: "Upload a photo of the existing curtain or opening (optional)",
        field: "attachment",
        type: "upload",
      },
      {
        id: "contact",
        title: "Contact Details",
        question: "Your details",
        field: "contact",
        type: "contact",
      },
    ],
  },
};

export const DEFAULT_FAMILY = "rapid-door";

export function getQuoteFlow(family) {
  return QUOTE_FLOWS[family] || QUOTE_FLOWS[DEFAULT_FAMILY];
}
