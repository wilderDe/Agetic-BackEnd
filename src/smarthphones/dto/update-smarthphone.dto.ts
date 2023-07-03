import { PartialType } from '@nestjs/mapped-types';
import { CreateSmarthphoneDto } from './create-smarthphone.dto';

export class UpdateSmarthphoneDto extends PartialType(CreateSmarthphoneDto) {}
