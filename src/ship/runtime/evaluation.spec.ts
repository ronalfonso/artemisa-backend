import { Expression } from '../lang/Expressions';
import { ExpressionType } from '../lang/ExpressionType';
import { evaluate } from './evaluation';
import { cases } from '../samples';

describe('evaluate cases', () => {
  test('if should return false', () => {
    const $if: Expression = {
      type: ExpressionType.If,
      payload: {
        test_expression: {
          type: ExpressionType.Const,
          payload: {
            value: false,
          },
        },
        if_true: {
          type: ExpressionType.Const,
          payload: {
            value: 'test expression is true',
          },
        },
        if_false: {
          type: ExpressionType.Const,
          payload: {
            value: 'test expression is false',
          },
        },
      },
    };
    expect(evaluate($if)).toStrictEqual('test expression is false');
  });

  test.each(cases)('evaluate($name) -> $output', ({ input, output }) => {
    expect(evaluate(input)).toStrictEqual(output);
  });
});
