import express, { Application } from "express";
import router from "./app/routes";
import cors from "cors";
import globlaErrorHandler from "./middleware/globalError";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://e-commerce-frontend-beryl-nu.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("server is listenting");
});

app.use(globlaErrorHandler);

export default app;
