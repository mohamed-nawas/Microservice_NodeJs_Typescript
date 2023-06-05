import { DtoProperty } from "../../enums/DtoProperty";
import { RequestDto } from "./RequestDto";

/**
 * DTO for Tuition creation request
 */
export class TuitionCreateRequestDto extends RequestDto {

    private name: string;
    private location: string;

    public constructor(name: string, location: string) {
        super();
        this.name = name;
        this.location = location;
    }

    public getProperty(property: DtoProperty): string {
        if (property === DtoProperty.NAME) {
            return this.name;
        }
        return this.location;
    }

    public isRequiredAvailable(): boolean {
        return this.isNonEmpty(this.name) && this.isNonEmpty(this.location);
    }
}