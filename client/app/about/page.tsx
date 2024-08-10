import Link from "next/link";
import { ProfileSection } from "./ProfileSection";
import { pageRoutes } from "../config/pageRoutes";

const AboutPage: React.FC = () => {
  return (
    <>
      <header className="container">
        <nav aria-label="breadcrumb">
          <ul>
            <li>
              <Link href={pageRoutes.index}>horiy.me</Link>
            </li>
            <li>
              <Link href={pageRoutes.about}>About</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container">
        <h1>About Me</h1>

        <ProfileSection />
      </main>
    </>
  );
};

export default AboutPage;
