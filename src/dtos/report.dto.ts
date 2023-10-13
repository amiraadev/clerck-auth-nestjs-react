/* eslint-disable prettier/prettier */
import { IsNumber, IsPositive, IsString, IsNotEmpty } from "class-validator";

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}
