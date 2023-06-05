import { Application, Request, Response } from "express";
import { TuitionService } from "../services/TuitionService";
import { ErrorResponseStatusType } from "../enums/ErrorResponseStatusType";
import { ResponseStatusTypeProperty } from "../enums/ResponseStatusTypeProperty";
import { getErrorResponseWrapper, getSuccessResponseWrapper } from "./Controller";
import { SuccessResponseStatusType } from "../enums/SuccessResponseStatusType";
import TuitionListResponseDto from "../dto/response/TuitionListResponseDto";
import { Logger } from "tslog";
import { TuitionCreateRequestDto } from "../dto/request/TuitionCreateRequestDto";
import { plainToClass } from "class-transformer";
import Tuition from "../entities/Tuition";
import TuitionResponseDto from "../dto/response/TuitionResponseDto";

/**
 * Tuition controller
 */
module.exports = (app: Application) => {
    
    const tuitionService = new TuitionService();
    const logger = new Logger();

    /**
     * This API is used to create a new Tuition
     * 
     * @param RequestBody TuitionCreateRequestDto
     * @returns success/error response
     */
    app.post("/api/v1/tuitions", async (req: Request<{}, {}, TuitionCreateRequestDto>, res: Response): Promise<void> => {
        try {
            const requestDto = plainToClass(TuitionCreateRequestDto, req.body);
            if (!requestDto.isRequiredAvailable()) {
                logger.error("Required fields missing in tuition create request DTO for creating tuition");
                res.status(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS.getProperty(ResponseStatusTypeProperty.CODE))
                .send(getErrorResponseWrapper(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS));
            }
            const tuition = new Tuition(requestDto);
            await tuitionService.createTuition(tuition);
            const tuitionResponseDto = new TuitionResponseDto(tuition);

            logger.info("Successfully created the tuition, responseDto: ", tuitionResponseDto.toJson());
            res.status(SuccessResponseStatusType.CREATE_TUITON.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getSuccessResponseWrapper(SuccessResponseStatusType.CREATE_TUITON, tuitionResponseDto));
        } catch (TuitionServiceException) {
            logger.error("Failed to create a new tuition", TuitionServiceException);
            res.status(ErrorResponseStatusType.INTERNAL_SERVER_ERROR.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.INTERNAL_SERVER_ERROR));
        }
    });

    /**
     * This API is used to get all tuitions
     * 
     * @returns success/error response
     */
    app.get("/api/v1/tuitions/get/all", async (req: Request, res: Response): Promise<void> => {
        try {
            const tuitionList = await tuitionService.getAllTuitions();
            const tuitionListResponseDto = new TuitionListResponseDto(tuitionList);

            logger.info("Successfully returned all tuitions, responseDto: ", tuitionListResponseDto.toJson());
            res.status(SuccessResponseStatusType.GET_TUITION.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getSuccessResponseWrapper(SuccessResponseStatusType.GET_TUITION, tuitionListResponseDto));
        } catch (TuitionServiceException) {
            logger.error("Failed to retrive all tuitions", TuitionServiceException);
            res.status(ErrorResponseStatusType.INTERNAL_SERVER_ERROR.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.INTERNAL_SERVER_ERROR));
        }
    });

    // set public endpoint for testing
    app.get("/", (req: Request, res: Response): void => {
        res.status(200).send("Hello from public typescript test endpoint");
    });
}