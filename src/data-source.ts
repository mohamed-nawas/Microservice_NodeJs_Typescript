import "reflect-metadata";
import {DataSource} from 'typeorm';
import Tuition from "./entities/Tuition";

/**
 * Various data source can be configured here
 */
const MySQLDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "ignite_tuition_node_db",
    entities: [Tuition],
    // entities: ["dist/entities/*.js"],
    // migrations: [path.join(__dirname, './migrations/*')],
    logging: true,
    synchronize: true,
    // entitySkipConstructor: true,
});

// initialize mysql datasource
MySQLDataSource.initialize()
.then(() => console.log("MySQL Datasource has been successfully initialized"))
.catch((e) => console.error("Error initializing mysql datasource", e));

module.exports = MySQLDataSource;