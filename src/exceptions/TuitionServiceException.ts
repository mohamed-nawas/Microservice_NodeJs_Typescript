/**
 * This is the base exception for tuition microservice
 */
export class TuitionServiceException extends Error {
    
    public constructor(errorMessage: string) {
        super(errorMessage);
    }
}