import { PartialType } from '@nestjs/mapped-types';
import { RecordsFileDto } from './records-file.dto';

export class UpdateFileDto extends PartialType(RecordsFileDto) {}
