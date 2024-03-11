import app from "./app";
import * as fs from "fs";
import * as path from "path";
import initMongoDbConnection from "./drivers/mongodb";

const PORT = process.env.PORT || 3000;

const readConfig = async (configFilePath: string): Promise<any> => {
  const data = await fs.readFileSync(configFilePath, "utf-8");
  return JSON.parse(data);
};

const startServer = async () => {
  try {
    const filePath = path.join(__dirname, "../config/server.cnf");

    const config = await readConfig(filePath);
    const mongoConfig = config.mongo;
    await initMongoDbConnection(
      mongoConfig.host,
      mongoConfig.port,
      mongoConfig.database
    );
    app.listen(config.port || PORT, () => {
      console.log(`SuperHeroes server running on port ${config.port || PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
