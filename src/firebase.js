// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyADu8eYvaNcFQKcYlnFNtkmcrBaT_8lfpk",
  authDomain: "dainichi-portal-ce3eb.firebaseapp.com",
  projectId: "dainichi-portal-ce3eb",
  storageBucket: "dainichi-portal-ce3eb.appspot.com",
  messagingSenderId: "344874936177",
  appId: "1:344874936177:web:9e10c39d39c55cf93978d0",
  measurementId: "G-9RFTY33VL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Save user data to Firestore
const saveUserData = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "NN",
      createdAt: new Date(), // Store creation date
      lastLogin: new Date().toISOString() // Update login time
    }, { merge: true }); // merge to avoid overwriting existing data
    console.log("User data saved.");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}

// Export auth and db for use in other parts of the app
export { auth, db, saveUserData};