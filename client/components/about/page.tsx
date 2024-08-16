import { FC } from "hono/jsx";
import { Layout } from "../layout.tsx";
import { CareerSection } from "./career.tsx";
import { ProfileSection } from "./profile.tsx";

export const AboutPage: FC = () => {
  return (
    <Layout>
      <ProfileSection />
      <CareerSection />
    </Layout>
  );
};
