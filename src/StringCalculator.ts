export class StringCalculator{
    private static readonly emptyString: string = '';
    private static readonly zero: number = 0;
    private static readonly comma: string = ',';
    private static readonly newLine: string = '\n';

    public add(numbers: string): number{
        if(this.areInputNumbersEmpty(numbers)){
            return StringCalculator.zero;
        }
        if(numbers.includes(StringCalculator.newLine)){
            return this.findDelimiters(numbers);
        }
        if(numbers.includes(StringCalculator.comma)){
            return this.addSplittedNumbers(numbers.split(StringCalculator.comma));
        }
       
        return Number.parseInt(numbers);
    }

    private areInputNumbersEmpty(numbers: string): boolean {
        return numbers === StringCalculator.emptyString;
    }

    private addSplittedNumbers(splittedNumber: string[]): number {
        this.checkNegatives(splittedNumber);
       
        return splittedNumber
            .map((splittedNumber) => parseInt(splittedNumber))
            .reduce((splittedNumber1, splittedNumber2) => splittedNumber1 + splittedNumber2);
    }

    private findDelimiters(numbers: string): number {
        let delimiters = [StringCalculator.newLine];
        
        if(numbers.startsWith('//')){
            let delimiter = '';

            for (let i = 2; i < numbers.indexOf(StringCalculator.newLine); i++) {
                if(numbers[i] !== '[' && numbers[i] !== ']'){
                    delimiter += numbers[i];
                }
                if (numbers[i] === ']') {
                    delimiters.push(delimiter);
                    delimiter = '';
                }
            }
            if(delimiters.length > 0){
                delimiters.push(delimiter);
            }
            numbers = numbers.slice(numbers.indexOf(StringCalculator.newLine) + 1);
        }
        for(let delimiter of delimiters){
            numbers = numbers.replace(new RegExp(delimiter, 'g'), StringCalculator.comma);
        }
        
        return this.addSplittedNumbers(numbers.split(StringCalculator.comma));
    }

    private checkNegatives(splittedNumber: string[]): number[] {
        var negatives = splittedNumber
            .map((splittedNumber) => parseInt(splittedNumber))
            .filter(function(number) { 
                return number < 0;
            })
        if(negatives.length !== 0) {
            throw Error("negatives not allowed: " + negatives);
        }
        return negatives;
    }   
}