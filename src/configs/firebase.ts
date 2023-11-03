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
    companies = snapshot.val();
    setData(snapshot.val());
    console.log(companies);
  });
  return companies;
};

export { writeCompanyData };
