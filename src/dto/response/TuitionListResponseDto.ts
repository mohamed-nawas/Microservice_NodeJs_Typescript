import Tuition from "../../entities/Tuition";
import { ResponseDto } from "./ResponseDto";
import TuitionResponseDto from "./TuitionResponseDto";

/**
 * Response dto for list of tuitions
 */
class TuitionListResponseDto extends ResponseDto {
    
    private tuitionList: Array<TuitionResponseDto> = new Array();

    public constructor(tuitionList: Array<Tuition>) {
        super();
        tuitionList.forEach(tuition => {
            this.tuitionList.push(new TuitionResponseDto(tuition));
        });
    }
}

export default TuitionListResponseDto;