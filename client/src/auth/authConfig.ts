import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, signInWithPopup, OAuthProvider } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// const provider = new OAuthProvider('microsoft.com');

// signInWithPopup(auth, provider)
//   .then((result) => {
//     // User is signed in.
//     // IdP data available in result.additionalUserInfo.profile.

//     console.log(result)
//     // Get the OAuth access token and ID Token
//     const credential = OAuthProvider.credentialFromResult(result);
//     const accessToken = credential?.accessToken;
//     const idToken = credential?.idToken;
//   })
//   .catch((error) => {
//     // Handle error.
//   });
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
