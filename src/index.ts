import "reflect-metadata";
import express, { Application } from "express";
const expressApp = require('./express-app');

const StartServer = async() => {

    // initialize the application server
    const app: Application = express();
    const PORT = process.env.PORT || 8000;
    
    await expressApp(app);

    // listen to the application server on PORT
    app.listen(PORT, (): void => {
        console.log(`Express application server running on address=> http://localhost:${PORT}`);
    });
}

StartServer();