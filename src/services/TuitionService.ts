import Tuition from "../entities/Tuition";
import { TuitionRepository } from "../repository/TuitionRepository";
import { TuitionServiceException } from "../exceptions/TuitionServiceException";

/**
 * Tuition service
 */
export class TuitionService {

    private tuitionRepository: TuitionRepository;

    public constructor() {
        this.tuitionRepository = new TuitionRepository();
    }

    /**
     * This method is used to create a new tuition in DB
     * 
     * @param tuition Tuition
     */
    public async createTuition(tuition: Tuition): Promise<void> {
        try {
            await this.tuitionRepository.save(tuition);
        } catch(e) {
            throw new TuitionServiceException("Error occurred when saving tuition to DB");
        }
    }

    /**
     * This method is used to get all tuitions from DB
     * 
     * @returns Array of Tuition Promise
     */
    public async getAllTuitions(): Promise<Tuition[]> {
        try {
            return await this.tuitionRepository.findAll();
        } catch (e) {
            throw new TuitionServiceException("Error occurred when getting all tuitions");
        }
    }
}