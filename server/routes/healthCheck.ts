import { HealthCheckController } from "../controllers/healthCheck.ts";
import { Router } from "../deps.ts";

const router = new Router();
const healthCheckController = HealthCheckController();

router.get("/health_check", healthCheckController.index);

export default router;
