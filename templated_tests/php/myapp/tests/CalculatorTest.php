<?php
use MyApp\Calculator;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase {
    public function testAdd() {
        $calc = new Calculator();
        $this->assertEquals(4, $calc->add(2, 2));
    }

    public function testMultiply() {
        $calc = new Calculator();
        $this->assertEquals(6, $calc->multiply(2, 3));
    }

    public function testSubtract() {
        $calc = new Calculator();
        $this->assertEquals(1, $calc->subtract(3, 2));
    }

    public function testSquareRoot() {
        $calc = new Calculator();
        $this->assertEquals(3, $calc->squareRoot(9));
    }

    public function testPower() {
        $calc = new Calculator();
        $this->assertEquals(8, $calc->power(2, 3));
    }

    public function testFactorialPositive() {
        $calc = new Calculator();
        $this->assertEquals(120, $calc->factorial(5));
    }

}