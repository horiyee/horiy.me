import { cert, getAuth, initializeApp } from "./deps.ts";
import { envVariables } from "./env.ts";

export const firebaseApp = initializeApp({
  credential: cert({
    projectId: envVariables.FIREBASE_PROJECT_ID,
    clientEmail: envVariables.FIREBASE_CLIENT_EMAIL,
    privateKey: envVariables.FIREBASE_PRIVATE_KEY,
  }),
});

export const firebaseAuth = getAuth(firebaseApp);
