import express, { Application } from "express";
import router from "./routes/superHeroes";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/superheroes/", router);

export default app;
