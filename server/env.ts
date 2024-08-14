export const envVariables = {
  FIREBASE_PROJECT_ID: Deno.env.get("FIREBASE_PROJECT_ID"),
  FIREBASE_CLIENT_EMAIL: Deno.env.get("FIREBASE_CLIENT_EMAIL"),
  FIREBASE_PRIVATE_KEY: Deno.env.get("FIREBASE_PRIVATE_KEY"),
} as const;
