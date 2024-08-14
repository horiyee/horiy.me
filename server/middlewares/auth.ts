import { Status } from "../deps.ts";
import { Middleware } from "../deps.ts";
import { firebaseAuth } from "../firebase.ts";
import { User } from "../types/user.ts";

export const authMiddleware: Middleware = async (ctx) => {
  const header = ctx.request.headers.get("Authorization");

  if (header !== null) {
    const idToken = header.split(" ")[1];

    await firebaseAuth
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const { uid } = decodedToken;

        const user: User = {
          firebaseUid: uid,
        };

        ctx.state = { user };
      })
      .catch((err) => {
        console.error(`Failed to verify token: ${err}`);

        ctx.response.status = Status.Unauthorized;
        ctx.response.body = {
          error: "Invalid token",
        };
      });
  }
};
