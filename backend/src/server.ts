import app from "./app";
import { connectDatabase } from "./database/connect";
import { config } from "./config/env";

const PORT = config.port;

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
