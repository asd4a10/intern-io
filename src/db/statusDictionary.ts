// statusDictionary.js

interface NumberToStringDictionary {
  [key: number]: {
    value: string;
    color:
      | "inherit"
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "info"
      | "warning";
  };
}

export const statusArray = [
  { key: 0, value: "Not Applied" },
  { key: 1, value: "Pending" },
  { key: 2, value: "No positions" },
  { key: 3, value: "Applied" },
  { key: 4, value: "Interview" },
  { key: 5, value: "Offer" },
  { key: 6, value: "Rejected" },
];

// dict from statusId to dict of statusName and color
const statusDictionary: NumberToStringDictionary = {
  0: { value: "Not Applied", color: "secondary" },
  1: { value: "Pending", color: "warning" },
  2: { value: "No positions", color: "error" },
  3: { value: "Applied", color: "warning" },
  4: { value: "Interview", color: "success" },
  5: { value: "Offer", color: "success" },
  6: { value: "Rejected", color: "error" },
  // Add more statuses as needed
};

export default statusDictionary;
