import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
          apiKey: "AIzaSyADu8eYvaNcFQKcYlnFNtkmcrBaT_8lfpk",
          authDomain: "dainichi-portal-ce3eb.firebaseapp.com",
          projectId: "dainichi-portal-ce3eb",
          storageBucket: "dainichi-portal-ce3eb.appspot.com",
          messagingSenderId: "344874936177",
          appId: "1:344874936177:web:9e10c39d39c55cf93978d0",
          measurementId: "G-9RFTY33VL3"
        };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
