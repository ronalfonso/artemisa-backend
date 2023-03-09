import { Expression } from '../lang/Expressions';

export interface PayloadIf {
  test_expression: Expression;
  if_true: Expression;
  if_false: Expression;
}
