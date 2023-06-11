import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as Joi from 'joi';

const idParamSchema = Joi.object({
  objectId: Joi.string().hex().length(24).required(),
});

@Injectable()
class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata = { type: 'param' }) {
    const { error } = this.schema.validate({ objectId: value });
    if (error) {
      throw new BadRequestException('Invalid id format');
    }
    return value;
  }
}

export default new JoiValidationPipe(idParamSchema);
