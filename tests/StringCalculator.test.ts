import { StringCalculator } from '../src/StringCalculator';

describe('String Calculator', (): void => {
    let sut: StringCalculator;

    beforeEach(() => {
        sut = new StringCalculator();
    });

    it('should return 0 when string is empty', (): void =>{
        expect(sut.add('')).toBe(0);
    });

    it('should return a value of the sum when string only have a number', (): void =>{
        expect(sut.add('0')).toBe(0);
        expect(sut.add('1')).toBe(1);
        expect(sut.add('2')).toBe(2);
    })

    it('should return the value of the sum when string contains two numbers splitted by a comma', (): void => {
        expect(sut.add('0,4')).toBe(4);
        expect(sut.add('1,6')).toBe(7);
        expect(sut.add('2,8')).toBe(10);
        expect(sut.add('12,18')).toBe(30);
    });

    it('should return the value of the sum when string contains an unknown amount of numbers splitted by a comma', (): void => {
        expect(sut.add('0,4,8')).toBe(12);
        expect(sut.add('1,6,7,6')).toBe(20);
        expect(sut.add('2,8,4,12,6')).toBe(32);
        expect(sut.add('12,18,7,3,5,0')).toBe(45);
    });

    it('should return the value of the sum when the string contains an input splitted by new lines', (): void => {
        expect(sut.add('1\n2,3')).toBe(6);
        expect(sut.add('2\n4\n6')).toBe(12);
        expect(sut.add('2\n4\n6,8,2\n2')).toBe(24);
    });

    it('should return the value of the sum when the string contains an input separated by a defined separator', (): void => {
        expect(sut.add('//;\n1;2')).toBe(3);
        expect(sut.add('//;\n1;2,3\n4')).toBe(10);
    });

    it('should throw the error "negatives not allowed" when a numbers are negative, and should return the number', (): void => {
        expect(sut.add('-4')).toThrowError('negatives not allowed');
    })

})