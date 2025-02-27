<?php
use MyApp\Math\AdvancedOperations;
use PHPUnit\Framework\TestCase;

class AdvancedOperationsTest extends TestCase {
    public function testSqrt() {
        $adv = new AdvancedOperations();
        $this->assertEquals(5, $adv->sqrt(25));
    }

    public function testPower() {
        $adv = new AdvancedOperations();
        $this->assertEquals(16, $adv->power(2, 4));
    }

    public function testFactorialPositiveNumber() {
        $adv = new AdvancedOperations();
        $this->assertEquals(120, $adv->factorial(5));
    }


    public function testFactorialNegativeNumber() {
        $adv = new AdvancedOperations();
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage("No factorial for negative numbers");
        $adv->factorial(-5);
    }


    public function testFactorialZero() {
        $adv = new AdvancedOperations();
        $this->assertEquals(1, $adv->factorial(0));
    }


    public function testSqrtNegativeNumber() {
        $adv = new AdvancedOperations();
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage("Cannot take sqrt of negative number");
        $adv->sqrt(-4);
    }


    // We do not test factorial() on purpose, so coverage will not be 100%.
}