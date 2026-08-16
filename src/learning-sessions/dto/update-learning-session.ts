import { PartialType } from '@nestjs/mapped-types';
import { CreateLearningSessionDto } from './create-learning-session';

export class UpdateLearningSessionDto extends PartialType(
  CreateLearningSessionDto,
) {}
