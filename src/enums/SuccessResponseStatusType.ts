import { ResponseStatusTypeProperty } from "./ResponseStatusTypeProperty";

/**
 * Success response status type
 */
export class SuccessResponseStatusType {

    static CREATE_TUITON = new SuccessResponseStatusType(201, "Successfully created the tuition");
    static GET_TUITION = new SuccessResponseStatusType(200, "Successfully returned the tuition");

    private code: number;
    private message: string;

    public constructor(code: number, message: string) {
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