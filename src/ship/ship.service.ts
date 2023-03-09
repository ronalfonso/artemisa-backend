import { Injectable } from '@nestjs/common';
import { evaluate } from './runtime/evaluation';
import { Expression } from './lang/Expressions';

@Injectable()
export class ShipService {
  evaluate(data: Expression) {
    return evaluate(data);
  }
}
