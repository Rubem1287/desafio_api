import express from "express";
import routes from "./routes.js";

const app = express();

app.use(express.json());

app.use("/livro", routes);

app.listen(3000, () => console.log("Servidor online."));
