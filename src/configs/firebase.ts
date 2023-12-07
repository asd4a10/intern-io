// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// import { getDatabase, onValue, ref } from "firebase/database";

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
  measurementId: "G-CW4T0PR53E",
  databaseURL:
    "https://intern-io-4a22b-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");

// firestore
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

export const firestoreDB = getFirestore(app);

export const addCompanyToFirestore = async (newCompany: ICompany) => {
  try {
    await setDoc(
      doc(firestoreDB, "companies", newCompany.id.toString()),
      newCompany,
    );
    console.log("Document written with ID: ", newCompany.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export let companiesSize = 0;
export const readCompaniesFirestore = async (
  setData: React.Dispatch<React.SetStateAction<ICompany[]>>,
) => {
  const q = query(collection(firestoreDB, "companies"), orderBy("id"));
  // const querySnapshot = await getDocs(collection(firestoreDB, "companies"));
  const querySnapshot = await getDocs(q);
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
  // console.log(comps);
};
