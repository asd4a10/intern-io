// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, child, get } from "firebase/database";

import { ICompany } from "../types/ICompany.ts";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBKY02jTCIPE12RGUr2m6pfxlefOq-UR4",
  authDomain: "intern-io-4a22b.firebaseapp.com",
  projectId: "intern-io-4a22b",
  storageBucket: "intern-io-4a22b.appspot.com",
  messagingSenderId: "673700748809",
  appId: "1:673700748809:web:1061dac4384b951932e2d8",
  measurementId: "G-GM1GQPWP2L",
  databaseURL:
    "https://intern-io-4a22b-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase();

const companiesRef = ref(db, "companies");
function writeCompanyData(companyId: number, name: string, link: string) {
  // const db = getDatabase();
  // const reference = ref(db, "companies/" + companyId);
  //
  // set(reference, { name, link });
}

export const getCompanyData = async (
  setData: React.Dispatch<React.SetStateAction<ICompany[]>>,
) => {
  let companies: ICompany[] = [];
  onValue(companiesRef, async (snapshot) => {
    companies = [];
    // console.log(snapshot);
    snapshot.forEach((child) => {
      // console.log(child.key);
      companies.push({ id: +child.key, ...child.val() });
    });
    setData(companies);
    console.log(companies);
  });
  return companies;
};

export { writeCompanyData };

// firestore
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

const firestoreDB = getFirestore(app);

export const addCompanyToFirestore = async (newCompany: ICompany) => {
  try {
    // const compRef = await addDoc(
    //   collection(firestoreDB, "companies"),
    //   newCompany,
    // );
    // console.log("Document written with ID: ", compRef.id);
    await setDoc(
      doc(firestoreDB, "companies", newCompany.id.toString()),
      newCompany,
    );
    console.log("Document written with ID: ", newCompany.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export let companiesSize = 0;
export const readCompaniesFirestore = async (
  setData: React.Dispatch<React.SetStateAction<ICompany[]>>,
) => {
  const querySnapshot = await getDocs(collection(firestoreDB, "companies"));
  const comps: ICompany[] = [];
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc}`);
    // console.log(doc.data());
    comps.push({
      id: +doc.id,
      name: doc.get("name"),
      link: doc.get("link"),
      img: doc.get("img"),
      description: doc.get("description"),
    });
  });
  setData(comps);
  companiesSize = comps.length;
  console.log(comps);
};
