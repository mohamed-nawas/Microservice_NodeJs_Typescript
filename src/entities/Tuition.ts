import { randomUUID } from "crypto";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { TuitionCreateRequestDto } from "../dto/request/TuitionCreateRequestDto";
import { EntityProperty } from "../enums/EntityProperty";
import { DtoProperty } from "../enums/DtoProperty";

/**
 * Tuition entity
 */
@Entity()
class Tuition {

    private TUITION_ID_PREFIX: string = "tid-";

    @PrimaryColumn()
    private id: string;
    @Column({ nullable: false })
    private name: string;
    @Column({ nullable: false })
    private location: string;
    private studentIds: Set<string> = new Set();

    public constructor(...args: any[]) {
        if (args.length === 0)
            return;
        if (args.length === 1) {
            if (args[0] instanceof TuitionCreateRequestDto) {
                let requestDto = args[0];
                this.id = this.TUITION_ID_PREFIX + randomUUID();
                this.name = requestDto.getProperty(DtoProperty.NAME);
                this.location = requestDto.getProperty(DtoProperty.LOCATION);
            }
        }
    }

    public getProperty(property: EntityProperty): any {
        if (property === EntityProperty.ID)
            return this.id;
        if (property === EntityProperty.NAME)
            return this.name;
        if (property === EntityProperty.LOCATION)
            return this.location;
        return this.studentIds;
    }

    private addStudentId(studentId: string): void {
        this.studentIds.add(studentId);
    }

    private removeStudentId(studentId: string): void {
        this.studentIds.delete(studentId);
    }
}

export default Tuition;