import { Repository } from "typeorm";
import { TuitionServiceException } from "../exceptions/TuitionServiceException";
const MySQLDataSource = require('../data-source');


export function getRepository(entity: any): Repository<any> {
    try {
        return MySQLDataSource.getRepository(entity);
    } catch (e) {
        throw new TuitionServiceException(`Error occurred when finding ${entity} repository`);
    }
}