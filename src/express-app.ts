import express, { Application } from "express";
const TuitionController = require('./controllers/TuitionController');

/**
 * Express app
 */
module.exports = async (app: Application) => {
    
    // configuring necessary properties for server
    app.use(express.json());

    // controller configuration
    TuitionController(app);
}