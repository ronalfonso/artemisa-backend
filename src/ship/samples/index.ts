import { ExpressionType } from '../lang/ExpressionType';
import { complexIf } from './complex-if';
import { Expression } from '../lang/Expressions';

export const cases: Array<{ name: string; input: Expression; output: any }> = [
  {
    name: 'const string value',
    input: {
      type: ExpressionType.Const,
      payload: {
        value: 'hello world!',
      },
    },
    output: 'hello world!',
  },
  {
    name: 'const bool value',
    input: {
      type: ExpressionType.Const,
      payload: {
        value: false,
      },
    },
    output: false,
  },
  {
    name: 'and should be false',
    input: {
      type: ExpressionType.And,
      payload: {
        expressions: [
          {
            type: ExpressionType.Const,
            payload: {
              value: true,
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
    output: false,
  },
  {
    name: 'and should be true',
    input: {
      type: ExpressionType.And,
      payload: {
        expressions: [
          {
            type: ExpressionType.Const,
            payload: {
              value: true,
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
    output: true,
  },
  {
    name: 'or should be true on all true',
    input: {
      type: ExpressionType.Or,
      payload: {
        expressions: [
          {
            type: ExpressionType.Const,
            payload: {
              value: true,
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
    output: true,
  },
  {
    name: 'or should be true on at least one true',
    input: {
      type: ExpressionType.Or,
      payload: {
        expressions: [
          {
            type: ExpressionType.Const,
            payload: {
              value: false,
            },
          },
          {
            type: ExpressionType.Const,
            payload: {
              value: false,
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
    output: true,
  },
  {
    name: 'or should be false with only one false',
    input: {
      type: ExpressionType.Or,
      payload: {
        expressions: [
          {
            type: ExpressionType.Const,
            payload: {
              value: true,
            },
          },
          {
            type: ExpressionType.Const,
            payload: {
              value: false,
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
    output: true,
  },
  {
    name: 'if combined with not',
    input: {
      type: ExpressionType.If,
      payload: {
        test_expression: {
          type: ExpressionType.Not,
          payload: {
            expression: {
              type: ExpressionType.Const,
              payload: {
                value: true,
              },
            },
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
    },
    output: 'test expression is false',
  },
  {
    name: 'string to lower',
    input: {
      type: ExpressionType.StringToLower,
      payload: {
        value: {
          type: ExpressionType.Const,
          payload: {
            value: 'HI!',
          },
        },
      },
    },
    output: 'hi!',
  },
  {
    name: 'equal on same values',
    input: {
      type: ExpressionType.Eq,
      payload: {
        left: {
          type: ExpressionType.Const,
          payload: {
            value: 'hi',
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
    output: true,
  },
  {
    name: 'equal on different values',
    input: {
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
    output: false,
  },
  {
    name: 'complex if',
    input: complexIf,
    output: 'inside first if true, and next if false',
  },
  {
    name: 'string to upper',
    input: {
      type: ExpressionType.StringToUpper,
      payload: {
        value: {
          type: ExpressionType.Const,
          payload: {
            value: 'hi!',
          },
        },
      },
    },
    output: 'HI!',
  },
  {
    name: 'if when test expression is false',
    input: {
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
    },
    output: 'test expression is false',
  },
  {
    name: 'if when test expression is true',
    input: {
      type: ExpressionType.If,
      payload: {
        test_expression: {
          type: ExpressionType.Const,
          payload: {
            value: true,
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
    },
    output: 'test expression is true',
  },
];
