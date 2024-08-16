import { AboutPage } from "./components/about/page.tsx";
import { IndexPage } from "./components/index/page.tsx";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.html(<IndexPage />));

app.get("/about", (c) => c.html(<AboutPage />));

export default app;
