import { ResponseStatusTypeProperty } from "./ResponseStatusTypeProperty";

/**
 * Error response status type
 */
export class ErrorResponseStatusType {

    static MISSING_REQUIRED_FIELDS = new ErrorResponseStatusType(400, "Missing required fields");
    static INTERNAL_SERVER_ERROR = new ErrorResponseStatusType(500, "Internal server error");

    private code: number;
    private message: string;

    private constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    public getProperty(property: ResponseStatusTypeProperty): any {
        if (property === ResponseStatusTypeProperty.CODE) {
            return this.code;
        }
        return this.message;
    }
}