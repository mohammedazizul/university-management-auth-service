import mongoose from "mongoose";
import config from "../config";
import app from "./app";
import { errorLogger, logger } from "./shared/logger";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        // console.log("MongoDB Database Connected Successfully!")
        logger.info("MongoDB Database Connected Successfully!");

        app.listen(config.port, () => {
            // console.log(`Application listening on prot ${config.port}`);
            logger.info(`Application listening on prot ${config.port}`);
        })

    } catch (error) {
        // console.log("MongoDB Database Connection Error:", error);
        errorLogger.error("MongoDB Database Connection Error:", error);
    }
}

main().catch(err => errorLogger.error("MongoDB Connection Error: ",err))