import { Expression } from '../lang/Expressions';
import { ExpressionType } from '../lang/ExpressionType';

export const complexIf: Expression = {
  type: ExpressionType.If,
  payload: {
    test_expression:
      // true
      {
        type: ExpressionType.Not,
        payload: {
          expression:
            // false
            {
              type: ExpressionType.And,
              payload: {
                expressions: [
                  // true
                  {
                    type: ExpressionType.Or,
                    payload: {
                      expressions: [
                        // false
                        {
                          type: ExpressionType.Eq,
                          payload: {
                            left: {
                              type: ExpressionType.Const,
                              payload: {
                                value: 'hi!',
                              },
                            },
                            right: {
                              type: ExpressionType.Const,
                              payload: {
                                value: 'hi',
                              },
                            },
                          },
                        },
                        {
                          type: ExpressionType.Const,
                          payload: {
                            value: true,
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: ExpressionType.Const,
                    payload: {
                      value: false,
                    },
                  },
                ],
              },
            },
        },
      },
    if_true: {
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
            value: 'inside first if true, and next if true',
          },
        },
        if_false: {
          type: ExpressionType.Const,
          payload: {
            value: 'inside first if true, and next if false',
          },
        },
      },
    },
    if_false: {
      type: ExpressionType.Const,
      payload: {
        value: "here can't enter",
      },
    },
  },
};
