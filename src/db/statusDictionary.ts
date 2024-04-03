// statusDictionary.js

interface NumberToStringDictionary {
  [key: number]: string;
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

const statusDictionary: NumberToStringDictionary = {
  0: "Not Applied",
  1: "Pending",
  2: "No positions",
  3: "Applied",
  4: "Interview",
  5: "Offer",
  6: "Rejected",
  // Add more statuses as needed
};

export default statusDictionary;
