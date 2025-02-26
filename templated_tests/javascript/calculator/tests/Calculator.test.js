import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import Calculator from '../src/modules/Calculator.js';

describe('basic', () => {
  it('Can be instantiated', () => {
    const calc = new Calculator();
    expect(calc).to.be.instanceOf(Calculator);
  });

  it('Displays numbers when they are pressed', () => {
    const calc = new Calculator();
    calc.buttonPressed({
      type: 'number',
      value: '1',
    });
    expect(calc.onDisplay).to.equal('1');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('10');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('100');
  });

  it('Displays numbers with a decimal when "." is pressed', () => {
    const calc = new Calculator();
    calc.buttonPressed({
      type: 'number',
      value: '1',
    });
    expect(calc.onDisplay).to.equal('1');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('10');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('100');

    calc.buttonPressed({
      type: 'operator',
      value: '.',
    });

    expect(calc.onDisplay).to.equal('100.');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('100.0');

    calc.buttonPressed({
      type: 'number',
      value: '1',
    });

    expect(calc.onDisplay).to.equal('100.01');
  });

  it('toggles the sign of the display value', () => {
    const calc = new Calculator();
    calc.buttonPressed({ type: 'number', value: '5' });
    calc.buttonPressed({ type: 'operator', value: 'switchPolarity' });
    expect(calc.onDisplay).to.equal('-5');
    calc.buttonPressed({ type: 'operator', value: 'switchPolarity' });
    expect(calc.onDisplay).to.equal('5');
  });


  it('evaluates addition operation', () => {
    const calc = new Calculator();
    calc.buttonPressed({ type: 'number', value: '5' });
    calc.buttonPressed({ type: 'operator', value: '+' });
    calc.buttonPressed({ type: 'number', value: '3' });
    calc.buttonPressed({ type: 'operator', value: 'evaluate' });
    expect(calc.onDisplay).to.equal('8');
  });


  it('fails to remove a nonexistent handler', () => {
    const calc = new Calculator();
    const handler = sinon.spy();
    const result = calc.offDisplayUpdate(handler);
    expect(result).to.be.false;
  });


  it('removes a display update handler', () => {
    const calc = new Calculator();
    const handler = sinon.spy();
    calc.onDisplayUpdate(handler);
    const result = calc.offDisplayUpdate(handler);
    expect(result).to.be.true;
    calc.fireDisplayUpdateHandlers();
    expect(handler.called).to.be.false;
  });

});