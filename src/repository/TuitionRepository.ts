import Tuition from "../entities/Tuition";
import { TuitionServiceException } from "../exceptions/TuitionServiceException";
import { Repository } from "typeorm";
import { getRepository } from "./Repository";

/**
 * Tuition repository
 */
export class TuitionRepository {

    private repository: Repository<Tuition>;

    public constructor() {
        this.repository = getRepository(Tuition);
    }

    public async save(tuition: Tuition): Promise<void> {
        try {
            await this.repository.save(tuition);
        } catch (e) {
            throw new TuitionServiceException("Error occurred when saving a tuition to DB");
        }
    }

    public async findAll(): Promise<Tuition[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            throw new TuitionServiceException("Error occurred when finding all repositories from DB");
        }
    }
}