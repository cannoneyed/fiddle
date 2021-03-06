import { Envelope, Point } from 'core/models/envelope';
import { AddOperator } from 'core/models/operator';
import { TimelineVector } from 'core/primitives/timeline-vector';

import * as envelopeFactory from 'test/utils/factories/envelope';

describe('Add Envelope Operator Test', () => {
  it('returns null when no inputs are operated on', () => {
    const operator = new AddOperator();
    const inputs: Envelope[] = [];
    const result = operator.operate(inputs);
    expect(result).toBe(null);
  });

  it('returns the input envelope when one input is operated on', () => {
    const operator = new AddOperator();
    const envelopeA = envelopeFactory.makeSimpleRampDownEnvelope();
    const inputs: Envelope[] = [envelopeA];
    const result = operator.operate(inputs);
    expect(result).toBe(envelopeA);
  });

  it('returns the sum of two flat envelopes', () => {
    const operator = new AddOperator();
    const length = new TimelineVector(2);
    const value = 0.5;
    const envelopeA = envelopeFactory.makeSimpleFlatEnvelope(length, value);
    const envelopeB = envelopeFactory.makeSimpleFlatEnvelope(length, value);
    const inputs: Envelope[] = [envelopeA, envelopeB];
    const result = operator.operate(inputs)!;

    // Test the result of the operation.
    expect(result.length).toEqual(envelopeA.length);
    const points = result.points;
    expect(points.length).toBe(2);
    expect(points[0].position).toEqual(result.start);
    expect(points[0].value).toEqual(1);
    expect(points[1].position).toEqual(result.end);
    expect(points[1].value).toEqual(1);
  });

  it('returns the sum of two ramp down envelopes', () => {
    const operator = new AddOperator();
    const length = new TimelineVector(2);
    const value = 0.5;
    const envelopeA = envelopeFactory.makeSimpleRampDownEnvelope(length, value);
    const envelopeB = envelopeFactory.makeSimpleRampDownEnvelope(length, value);
    const inputs: Envelope[] = [envelopeA, envelopeB];
    const result = operator.operate(inputs)!;

    // Test the result of the operation.
    expect(result.length).toEqual(envelopeA.length);
    const points = result.points;
    expect(points.length).toBe(2);
    expect(points[0].position).toEqual(result.start);
    expect(points[0].value).toEqual(1);
    expect(points[1].position).toEqual(result.end);
    expect(points[1].value).toEqual(0);
  });

  it('returns the sum of a sawtooth and a flat envelope', () => {
    const operator = new AddOperator();
    const length = new TimelineVector(2);
    const value = 0.5;
    const envelopeA = envelopeFactory.makeSimpleSawtoothEnvelope(length, value);
    const envelopeB = envelopeFactory.makeSimpleFlatEnvelope(length, value);
    const inputs: Envelope[] = [envelopeA, envelopeB];
    const result = operator.operate(inputs)!;

    // Test the result of the operation.
    expect(result.length).toEqual(envelopeA.length);
    const points = result.points;
    expect(points.length).toBe(4);
    expect(points[0].position).toEqual(result.start);
    expect(points[0].value).toEqual(1);
    expect(points[1].position).toEqual(new TimelineVector(1));
    expect(points[1].value).toEqual(0.5);
    expect(points[2].position).toEqual(new TimelineVector(1));
    expect(points[2].value).toEqual(1);
    expect(points[3].position).toEqual(result.end);
    expect(points[3].value).toEqual(0.5);
  });

  it('returns the sum of a sawtooth and a ramp down', () => {
    const operator = new AddOperator();
    const length = new TimelineVector(2);
    const value = 0.5;
    const envelopeA = envelopeFactory.makeSimpleSawtoothEnvelope(length, value);
    const envelopeB = envelopeFactory.makeSimpleRampDownEnvelope(length, value);
    const inputs: Envelope[] = [envelopeA, envelopeB];
    const result = operator.operate(inputs)!;

    // Test the result of the operation.
    expect(result.length).toEqual(envelopeA.length);
    const points = result.points;
    expect(points.length).toBe(4);
    expect(points[0].position).toEqual(result.start);
    expect(points[0].value).toEqual(1);
    expect(points[1].position).toEqual(new TimelineVector(1));
    expect(points[1].value).toEqual(0.25);
    expect(points[2].position).toEqual(new TimelineVector(1));
    expect(points[2].value).toEqual(0.75);
    expect(points[3].position).toEqual(result.end);
    expect(points[3].value).toEqual(0);
  });

  it('returns the sum of a sawtooth and a sawtooth', () => {
    const operator = new AddOperator();
    const length = new TimelineVector(2);
    const value = 0.5;
    const envelopeA = envelopeFactory.makeSimpleSawtoothEnvelope(length, value);
    const envelopeB = envelopeFactory.makeSimpleSawtoothEnvelope(length, value);
    const inputs: Envelope[] = [envelopeA, envelopeB];
    const result = operator.operate(inputs)!;

    // Test the result of the operation.
    expect(result.length).toEqual(envelopeA.length);
    const points = result.points;
    expect(points.length).toBe(4);
    expect(points[0].position).toEqual(result.start);
    expect(points[0].value).toEqual(1);
    expect(points[1].position).toEqual(new TimelineVector(1));
    expect(points[1].value).toEqual(0);
    expect(points[2].position).toEqual(new TimelineVector(1));
    expect(points[2].value).toEqual(1);
    expect(points[3].position).toEqual(result.end);
    expect(points[3].value).toEqual(0);
  });

  it('returns the sum of a square and a sawtooth', () => {
    const operator = new AddOperator();
    const length = new TimelineVector(2);
    const value = 0.5;
    const envelopeA = envelopeFactory.makeSimpleSquareEnvelope(length, value);
    const envelopeB = envelopeFactory.makeSimpleSawtoothEnvelope(length, value);
    const inputs: Envelope[] = [envelopeA, envelopeB];
    const result = operator.operate(inputs)!;

    // Test the result of the operation.
    expect(result.length).toEqual(envelopeA.length);
    const points = result.points;
    expect(points.length).toBe(4);
    expect(points[0].position).toEqual(result.start);
    expect(points[0].value).toEqual(1);
    expect(points[1].position).toEqual(new TimelineVector(1));
    expect(points[1].value).toEqual(0.5);
    expect(points[2].position).toEqual(new TimelineVector(1));
    expect(points[2].value).toEqual(0.5);
    expect(points[3].position).toEqual(result.end);
    expect(points[3].value).toEqual(0);
  });

  it('returns the sum of a sawtooth and a three-point envelope', () => {
    const operator = new AddOperator();
    const length = new TimelineVector(2);
    const value = 0.5;
    const envelopeA = envelopeFactory.makeSimpleSawtoothEnvelope(length, value);
    const pointsB = [
      new Point(new TimelineVector(0), 0),
      new Point(new TimelineVector(1), 0.25),
      new Point(new TimelineVector(2), 0.5),
    ];
    const envelopeB = new Envelope(length, pointsB);
    const inputs: Envelope[] = [envelopeA, envelopeB];
    const result = operator.operate(inputs)!;

    // Test the result of the operation.
    expect(result.length).toEqual(envelopeA.length);
    const points = result.points;
    expect(points.length).toBe(4);
    expect(points[0].position).toEqual(result.start);
    expect(points[0].value).toEqual(0.5);
    expect(points[1].position).toEqual(new TimelineVector(1));
    expect(points[1].value).toEqual(0.25);
    expect(points[2].position).toEqual(new TimelineVector(1));
    expect(points[2].value).toEqual(0.75);
    expect(points[3].position).toEqual(result.end);
    expect(points[3].value).toEqual(0.5);
  });
});
