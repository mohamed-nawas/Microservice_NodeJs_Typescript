import Tuition from "../../entities/Tuition";
import { EntityProperty } from "../../enums/EntityProperty";
import { ResponseDto } from "./ResponseDto";

/**
 * Response dto for a tuition
 */
class TuitionResponseDto extends ResponseDto {
    
    private tuitionId: string;
    private name: string;
    private location: string;
    private studentIds: Set<string>;

    public constructor(tuition: Tuition) {
        super();
        this.tuitionId = tuition.getProperty(EntityProperty.ID);
        this.name = tuition.getProperty(EntityProperty.NAME);
        this.location = tuition.getProperty(EntityProperty.LOCATION);
        this.studentIds = tuition.getProperty(EntityProperty.STUDENTIDS);
    }
}

export default TuitionResponseDto;