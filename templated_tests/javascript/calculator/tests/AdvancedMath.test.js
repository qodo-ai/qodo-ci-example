import { expect } from 'chai';
import 'mocha';
import { factorial, sqrt, sin, cos, tan } from '../src/modules/AdvancedMath.js';
import { round } from '../src/modules/AdvancedMath.js';
import { log } from '../src/modules/AdvancedMath.js';
import { ln } from '../src/modules/AdvancedMath.js';

describe('AdvancedMath Functions', () => {
    describe('factorial', () => {
        it('should return 1 for 0!', () => {
            expect(factorial(0)).to.equal(1);
        });

        it('should correctly compute factorial of a positive number', () => {
            expect(factorial(5)).to.equal(120);
        });

        it('should throw error for negative input', () => {
            expect(() => factorial(-1)).to.throw('Cannot compute factorial of a negative number');
        });

    it('should throw error for non-integer decimals', () => {
        expect(() => round(3.14159, 2.5)).to.throw('Invalid input: x must be a number and decimals must be an integer');
    });


    it('should throw error for base 0', () => {
        expect(() => log(10, 0)).to.throw('Invalid logarithm base');
    });


    it('should throw error for negative input', () => {
        expect(() => ln(-1)).to.throw('Cannot compute natural logarithm of a non-positive number');
    });


    it('should throw error for non-number input', () => {
        expect(() => sqrt('string')).to.throw('Input must be a number');
    });


    it('should throw error for negative input', () => {
        expect(() => sqrt(-4)).to.throw('Cannot compute square root of a negative number in real domain');
    });


    it('should throw error for non-integer input', () => {
        expect(() => factorial(5.5)).to.throw('Factorial is only defined for integers');
    });

    });


});