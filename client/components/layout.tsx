import { FC, PropsWithChildren } from "hono/jsx";
import { Header } from "./header.tsx";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body>
        <Header />

        <main>{children}</main>
      </body>
    </html>
  );
};
