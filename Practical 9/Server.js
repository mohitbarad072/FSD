import express from "express";
import homeRoutes from "./Home.js";

const app = express();


app.use(express.json());


app.use("/", homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
