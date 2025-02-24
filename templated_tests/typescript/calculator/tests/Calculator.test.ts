import Calculator from '../src/modules/Calculator';
import { expect } from 'chai';
import 'mocha';
import sinon, { SinonSpy } from 'sinon';

describe('basic', () => {
  it('Can be instantiated', () => {
    const calc = new Calculator();
    expect(calc).is.instanceOf(Calculator);
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

  it('clears display and resets state', () => {
    const calc = new Calculator();
    calc.pressButtons([
      { type: 'number', value: '9' },
      { type: 'operator', value: '+' },
      { type: 'number', value: '1' },
      { type: 'operator', value: 'clear' },
    ]);
    expect(calc.onDisplay).to.be.null;
    expect(calc.currentTotal).to.be.null;
    expect(calc.currentOperator).to.be.null;
    expect(calc.lastOperator).to.be.null;
  });


  it('switches polarity correctly', () => {
    const calc = new Calculator();
    calc.pressButtons([
      { type: 'number', value: '5' },
      { type: 'operator', value: 'switchPolarity' },
    ]);
    expect(calc.onDisplay).to.equal('-5');
  
    calc.pressButtons([
      { type: 'operator', value: 'switchPolarity' },
    ]);
    expect(calc.onDisplay).to.equal('5');
  });


  it('evaluates basic addition', () => {
    const calc = new Calculator();
    calc.pressButtons([
      { type: 'number', value: '2' },
      { type: 'operator', value: '+' },
      { type: 'number', value: '3' },
      { type: 'operator', value: 'evaluate' },
    ]);
    expect(calc.onDisplay).to.equal('5');
  });

});
