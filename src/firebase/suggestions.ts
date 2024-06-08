export const addCompanySuggestion = async (newCompany: {
  companyName: string;
  supporterName: string;
}) => {
  try {
    // const compRef = await addDoc(
    //   collection(firestoreDB, "suggestions"),
    //   newCompany,
    // );
    console.log("Document written with ID: ", newCompany);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
