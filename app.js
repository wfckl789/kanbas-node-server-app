import express from 'express'
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
const app = express()
import cors from "cors";
import AssignmentRoutes from "./assignments/routes.js";
import "dotenv/config";


app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
app.use(express.json());
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000);
