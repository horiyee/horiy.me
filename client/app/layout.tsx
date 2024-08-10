import "@picocss/pico";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="ja">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
