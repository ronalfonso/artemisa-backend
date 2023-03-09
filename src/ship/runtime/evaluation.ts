import { Expression } from '../lang/Expressions';
import { ExpressionType } from '../lang/ExpressionType';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { PayloadEq } from '../models/payload-eq';
import { PayloadIf } from '../models/payload-if';

export const evaluate = (expression: Expression): any => {
  if (Object.keys(expression).length === 0) {
    return new BadRequestException({
      status: HttpStatus.BAD_REQUEST,
      error: 'body is required',
    });
  }

  const respType: BadRequestException = evalType(expression);
  if (respType !== undefined) return respType;

  const respDecision = decisionExpression(expression);
  return respDecision.toString();
};

const evalType = (expression: Expression): BadRequestException => {
  console.log(expression);
  if (!Object.values(ExpressionType).includes(expression.type)) {
    return new BadRequestException({
      status: HttpStatus.BAD_REQUEST,
      error: 'type is not correct',
    });
  }
};

const decisionExpression = (expression: Expression) => {
  switch (expression.type) {
    case ExpressionType.If:
      return isIfExpression(expression);
    case ExpressionType.Const:
      return isConstExpression(expression);
    case ExpressionType.And:
      return isLogicalExpression(expression);
    case ExpressionType.Not:
      return isNotExpression(expression);
    case ExpressionType.Or:
      return isLogicalExpression(expression);
    case ExpressionType.Eq:
      return isEqExpression(expression);
    case ExpressionType.StringToUpper:
      return isStringExpression(expression);
    case ExpressionType.StringToLower:
      return isStringExpression(expression);
  }
};

const isConstExpression = (expression: Expression) => {
  return expression.payload['value'];
};

const isNotExpression = (expression: Expression) => {
  const child = expression.payload['expression'];
  if (child.type !== ExpressionType.Const) return exceptionType();
  if (typeof child.payload.value !== 'boolean') return exceptionBoolean();
  return !child.payload.value;
};

const isLogicalExpression = (expression: Expression) => {
  const values = [];
  childrenRes(expression).forEach((expression: Expression) => {
    if (expression.type !== ExpressionType.Const) return exceptionType();

    if (typeof expression.payload.value !== 'boolean')
      return exceptionBoolean();

    values.push(expression.payload.value);
  });
  if (expression.type === ExpressionType.And) {
    return !values.includes(false);
  } else if (expression.type === ExpressionType.Or) {
    return values.includes(true);
  }
};

const isEqExpression = (expression: Expression) => {
  const children: PayloadEq = <PayloadEq>expression.payload;
  const valueRight: string = children.right.payload['value'];
  const valueLeft: string = children.left.payload['value'];
  if (typeof valueRight !== 'string' || typeof valueLeft !== 'string') {
    return new BadRequestException({
      status: HttpStatus.BAD_REQUEST,
      error: 'values must be string',
    });
  }
  return valueLeft.toLowerCase() === valueRight.toLowerCase();
};

const isStringExpression = (expression: Expression) => {
  const value: Expression = expression.payload['value'];
  if (
    expression.type !== ExpressionType.StringToLower &&
    expression.type !== ExpressionType.StringToUpper
  ) {
    return exceptionType();
  }
  if (value.type !== ExpressionType.Const) return exceptionType();
  const stringResult: string = <string>value.payload.value;

  if (expression.type === ExpressionType.StringToLower) {
    return stringResult.toLowerCase();
  } else if (expression.type === ExpressionType.StringToUpper) {
    return stringResult.toUpperCase();
  }
};

const isIfExpression = (expression: Expression) => {
  const children: PayloadIf = <PayloadIf>expression.payload;
  const testExpression: Expression = children.test_expression;
  const ifTrue: Expression = children['is_true'];
  const ifFalse: Expression = children['is_false'];
  const valueIfTrue = ifTrue.payload['value'];
  const valueIfFalse = ifFalse.payload['value'];
  let response;
  if (testExpression.type === ExpressionType.Not) {
    response = decisionExpression(testExpression);
  } else {
    if (testExpression.type !== ExpressionType.Const) return exceptionType();
    response = testExpression.payload['value'];
  }
  if (response === true) {
    return valueIfTrue;
  } else {
    return valueIfFalse;
  }
};

const childrenRes = (expression: Expression) => {
  return expression.payload['expressions'];
};

const exceptionType = () => {
  return new BadRequestException({
    status: HttpStatus.BAD_REQUEST,
    error: 'type is not correct',
  });
};

const exceptionBoolean = () => {
  return new BadRequestException({
    status: HttpStatus.BAD_REQUEST,
    error: 'value must be tru or false',
  });
};
