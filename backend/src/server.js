// import express from "express";
// import taskRoute from "./routes/tasksRouters.js";
// import { connectDB } from "./config/db.js";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";

// dotenv.config();

// const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();

// const app = express();

// // middlewares
// app.use(express.json());

// if (process.env.NODE_ENV !== "production") {
//   app.use(cors({ origin: "http://localhost:5173" }));
// }

// app.use("/api/tasks", taskRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

import express from "express";
import taskRoute from "./routes/tasksRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 5001;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
  // Correct path: from backend/src -> ../../frontend/dist
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
