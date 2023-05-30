import mongoose from "mongoose";
import app from "./app";
import config from "../config";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("MongoDB Database Connected Successfully!")

        app.listen(config.port, () => {
            console.log(`Application listening on prot ${config.port}`);
        })

    } catch (error) {
        console.log("MongoDB Database Connection Error:", error);
    }
}

main().catch(err => console.log("MongoDB Connection Error: ",err));