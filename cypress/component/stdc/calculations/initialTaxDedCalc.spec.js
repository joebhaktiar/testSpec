import initialTaxDedCalc from '../../../../calculations/stdc/initialTaxDedCalc.js'

describe("Test initialTaxDeduction calculation", ()=> {
    it("local category 4", ()=> {
        const localCategory = 4
        const pctOfYear = 1
        const localTax = 144
        const localTaxRate = 0.04 
        const stateTax = 606
        const stateTaxRate = 0.04
        expect(initialTaxDedCalc(localCategory, pctOfYear, localTax, localTaxRate, stateTax, stateTaxRate))
            .to.eql(1182)
        
    }),
    it("local category 3", ()=> {
        const localCategory = 3
        const pctOfYear = 1
        const localTax = null
        const localTaxRate = 0.02 
        const stateTax = 1011
        const stateTaxRate = 0.0625
        expect(initialTaxDedCalc(localCategory, pctOfYear, localTax, localTaxRate, stateTax, stateTaxRate))
            .to.eql(1334.52)
    }),
    it("local category 1", ()=> {
        const localCategory = 1
        const pctOfYear = 1
        const localTax = null
        const localTaxRate = 0
        const stateTax = 789
        const stateTaxRate = 0.0625
        expect(initialTaxDedCalc(localCategory, pctOfYear, localTax, localTaxRate, stateTax, stateTaxRate))
            .to.eql(789)

    })
 })
