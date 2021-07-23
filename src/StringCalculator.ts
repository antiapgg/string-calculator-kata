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
        //console.log('\tSPLITTTTTT: ', splittedNumber);
        return splittedNumber
            .filter((splittedNumber) => parseInt(splittedNumber) < 1000)
            .map((splittedNumber) => parseInt(splittedNumber))
            .reduce((splittedNumber1, splittedNumber2) => splittedNumber1 + splittedNumber2);
    }

    private findDelimiters(numbers: string): number {
        let delimiters = [StringCalculator.newLine];
        
        if(numbers.startsWith('//')){
            let delimiter = '';

            for (let i = 2; i < numbers.indexOf(StringCalculator.newLine); i++) {
                if(numbers[i] !== '[' && numbers[i] !== ']'){
                    if(numbers[i].toUpperCase().charCodeAt(0) >= 65 && numbers[i].toUpperCase().charCodeAt(0) <= 90){
                        delimiter += numbers[i];
                    }
                    else{ 
                        delimiter += '\\' + numbers[i];
                    }
                }
                if (numbers[i] === ']') {
                    delimiter += '';
                    delimiters.push(delimiter);
                    delimiter = '';
                }
            }
            if(delimiters.length > 0 && delimiters.includes(delimiter) === false){
                if(delimiter !== '')
                    delimiters.push(delimiter);
            }
            numbers = numbers.slice(numbers.indexOf(StringCalculator.newLine) + 1);
            //console.log('NEW NUMBERS: ', numbers);
        }
        //console.log('DELIMITERSSS: ',delimiters);
        for(let i = 0; i < delimiters.length; i++){
            //console.log('DELIM: ', delimiters[i]);
            let exp = new RegExp(delimiters[i], 'g');
            //console.log('EXP: ', exp);
            numbers = numbers.replace(exp, StringCalculator.comma);
            //console.log('NUMBERS 2: ', numbers);
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