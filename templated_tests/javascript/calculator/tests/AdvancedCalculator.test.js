import { expect } from 'chai';
import 'mocha';
import AdvancedCalculator from '../src/modules/AdvancedCalculator.js';

describe('AdvancedCalculator', () => {
    let calc;

    beforeEach(() => {
        calc = new AdvancedCalculator();
    });

    it('should compute factorial correctly', () => {
        // Press digits "5"
        calc.buttonPressed({ type: 'number', value: '5' });
        expect(calc.onDisplay).to.equal('5');

        // factorial of 5
        const result = calc.factorial();
        expect(result).to.equal(120);
        expect(calc.onDisplay).to.equal('120');
    });

    it('should throw an error when no number is on display for sqrt', () => {
        expect(() => calc.sqrt()).to.throw('No number on display to compute sqrt');
    });


    it('should compute sqrt correctly', () => {
        // Press digits "16"
        calc.buttonPressed({ type: 'number', value: '16' });
        expect(calc.onDisplay).to.equal('16');
    
        // square root of 16
        const result = calc.sqrt();
        expect(result).to.equal(4);
        expect(calc.onDisplay).to.equal('4');
    });


    it('should throw an error when no number is on display for factorial', () => {
        expect(() => calc.factorial()).to.throw('No number on display to compute factorial');
    });



});