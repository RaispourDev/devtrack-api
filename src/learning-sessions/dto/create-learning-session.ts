import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateLearningSessionDto {
  @IsInt()
  @Min(1)
  durationMinutes!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  note?: string;
}
