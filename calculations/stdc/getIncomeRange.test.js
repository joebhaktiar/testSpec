import getIncomeRange from './getIncomeRange.js'

describe("Test Income range values", () => {
    test('Test non-number income', () => {
        expect(getIncomeRange(2005,"test")).toBe(0)
        expect(getIncomeRange(2020,[1,2,3])).toBe(0)
        expect(getIncomeRange(2019,{a: 'test'})).toBe(0)

    }),
    test('Test incomer range values for 2005', () => {
        expect(getIncomeRange(2005, 0)).toBe(1)
        expect(getIncomeRange(2005, 1999)).toBe(1)
        expect(getIncomeRange(2005, 20000)).toBe(2)
        expect(getIncomeRange(2005, 29999)).toBe(2)
        expect(getIncomeRange(2005, 30000)).toBe(3)
        expect(getIncomeRange(2005, 39999)).toBe(3)
        expect(getIncomeRange(2005, 40000)).toBe(4)
        expect(getIncomeRange(2005, 49999)).toBe(4)
        expect(getIncomeRange(2005, 50000)).toBe(5)
        expect(getIncomeRange(2005, 59999)).toBe(5)
        expect(getIncomeRange(2005, 60000)).toBe(6)
        expect(getIncomeRange(2005, 69999)).toBe(6)
        expect(getIncomeRange(2005, 70000)).toBe(7)
        expect(getIncomeRange(2005, 79999)).toBe(7)
        expect(getIncomeRange(2005, 80000)).toBe(8)
        expect(getIncomeRange(2005, 89999)).toBe(8)
        expect(getIncomeRange(2005, 90000)).toBe(9)
        expect(getIncomeRange(2005, 99999)).toBe(9)
        expect(getIncomeRange(2005, 100000)).toBe(10)
        expect(getIncomeRange(2005, 119999)).toBe(10)
        expect(getIncomeRange(2005, 120000)).toBe(11)
        expect(getIncomeRange(2005, 139999)).toBe(11)
        expect(getIncomeRange(2005, 140000)).toBe(12)
        expect(getIncomeRange(2005, 159999)).toBe(12)
        expect(getIncomeRange(2005, 160000)).toBe(13)
        expect(getIncomeRange(2005, 179999)).toBe(13)
        expect(getIncomeRange(2005, 180000)).toBe(14)
        expect(getIncomeRange(2005, 199999)).toBe(14)
        expect(getIncomeRange(2005, 200000)).toBe(15)
        expect(getIncomeRange(2005, 300000)).toBe(15)
        expect(getIncomeRange(2005, 400000)).toBe(15)
        expect(getIncomeRange(2005, 500000)).toBe(15)
    }),
    test('Test income range values for 2013', () => {
        expect(getIncomeRange(2013, 0)).toBe(1)
        expect(getIncomeRange(2013, 1999)).toBe(1)
        expect(getIncomeRange(2013, 20000)).toBe(2)
        expect(getIncomeRange(2013, 29999)).toBe(2)
        expect(getIncomeRange(2013, 30000)).toBe(3)
        expect(getIncomeRange(2013, 39999)).toBe(3)
        expect(getIncomeRange(2013, 40000)).toBe(4)
        expect(getIncomeRange(2013, 49999)).toBe(4)
        expect(getIncomeRange(2013, 50000)).toBe(5)
        expect(getIncomeRange(2013, 59999)).toBe(5)
        expect(getIncomeRange(2013, 60000)).toBe(6)
        expect(getIncomeRange(2013, 69999)).toBe(6)
        expect(getIncomeRange(2013, 70000)).toBe(7)
        expect(getIncomeRange(2013, 79999)).toBe(7)
        expect(getIncomeRange(2013, 80000)).toBe(8)
        expect(getIncomeRange(2013, 89999)).toBe(8)
        expect(getIncomeRange(2013, 90000)).toBe(9)
        expect(getIncomeRange(2013, 99999)).toBe(9)
        expect(getIncomeRange(2013, 100000)).toBe(10)
        expect(getIncomeRange(2013, 119999)).toBe(10)
        expect(getIncomeRange(2013, 120000)).toBe(11)
        expect(getIncomeRange(2013, 139999)).toBe(11)
        expect(getIncomeRange(2013, 140000)).toBe(12)
        expect(getIncomeRange(2013, 159999)).toBe(12)
        expect(getIncomeRange(2013, 160000)).toBe(13)
        expect(getIncomeRange(2013, 179999)).toBe(13)
        expect(getIncomeRange(2013, 180000)).toBe(14)
        expect(getIncomeRange(2013, 199999)).toBe(14)
        expect(getIncomeRange(2013, 200000)).toBe(15)
        expect(getIncomeRange(2013, 300000)).toBe(15)
        expect(getIncomeRange(2013, 400000)).toBe(15)
        expect(getIncomeRange(2013, 500000)).toBe(15)
    }),
    test('Test income range values for 2014', () => {
        expect(getIncomeRange(2014, 0)).toBe(1)
        expect(getIncomeRange(2014, 1999)).toBe(1)
        expect(getIncomeRange(2014, 20000)).toBe(2)
        expect(getIncomeRange(2014, 29999)).toBe(2)
        expect(getIncomeRange(2014, 30000)).toBe(3)
        expect(getIncomeRange(2014, 39999)).toBe(3)
        expect(getIncomeRange(2014, 40000)).toBe(4)
        expect(getIncomeRange(2014, 49999)).toBe(4)
        expect(getIncomeRange(2014, 50000)).toBe(5)
        expect(getIncomeRange(2014, 59999)).toBe(5)
        expect(getIncomeRange(2014, 60000)).toBe(6)
        expect(getIncomeRange(2014, 69999)).toBe(6)
        expect(getIncomeRange(2014, 70000)).toBe(7)
        expect(getIncomeRange(2014, 79999)).toBe(7)
        expect(getIncomeRange(2014, 80000)).toBe(8)
        expect(getIncomeRange(2014, 89999)).toBe(8)
        expect(getIncomeRange(2014, 90000)).toBe(9)
        expect(getIncomeRange(2014, 99999)).toBe(9)
        expect(getIncomeRange(2014, 100000)).toBe(10)
        expect(getIncomeRange(2014, 119999)).toBe(10)
        expect(getIncomeRange(2014, 120000)).toBe(11)
        expect(getIncomeRange(2014, 139999)).toBe(11)
        expect(getIncomeRange(2014, 140000)).toBe(12)
        expect(getIncomeRange(2014, 159999)).toBe(12)
        expect(getIncomeRange(2014, 160000)).toBe(13)
        expect(getIncomeRange(2014, 179999)).toBe(13)
        expect(getIncomeRange(2014, 180000)).toBe(14)
        expect(getIncomeRange(2014, 199999)).toBe(14)
        expect(getIncomeRange(2014, 200000)).toBe(15)
        expect(getIncomeRange(2014, 224999)).toBe(15)
        expect(getIncomeRange(2014, 225000)).toBe(16)
        expect(getIncomeRange(2014, 249999)).toBe(16)
        expect(getIncomeRange(2014, 250000)).toBe(17)
        expect(getIncomeRange(2014, 274999)).toBe(17)
        expect(getIncomeRange(2014, 275000)).toBe(18)
        expect(getIncomeRange(2014, 299999)).toBe(18)
        expect(getIncomeRange(2014, 300000)).toBe(19)
        expect(getIncomeRange(2014, 400000)).toBe(19)
        expect(getIncomeRange(2014, 500000)).toBe(19)
        expect(getIncomeRange(2014, 1000000)).toBe(19)
    }),
    test('Test income range values for 2020', () => {
        expect(getIncomeRange(2020, 0)).toBe(1)
        expect(getIncomeRange(2020, 1999)).toBe(1)
        expect(getIncomeRange(2020, 20000)).toBe(2)
        expect(getIncomeRange(2020, 29999)).toBe(2)
        expect(getIncomeRange(2020, 30000)).toBe(3)
        expect(getIncomeRange(2020, 39999)).toBe(3)
        expect(getIncomeRange(2020, 40000)).toBe(4)
        expect(getIncomeRange(2020, 49999)).toBe(4)
        expect(getIncomeRange(2020, 50000)).toBe(5)
        expect(getIncomeRange(2020, 59999)).toBe(5)
        expect(getIncomeRange(2020, 60000)).toBe(6)
        expect(getIncomeRange(2020, 69999)).toBe(6)
        expect(getIncomeRange(2020, 70000)).toBe(7)
        expect(getIncomeRange(2020, 79999)).toBe(7)
        expect(getIncomeRange(2020, 80000)).toBe(8)
        expect(getIncomeRange(2020, 89999)).toBe(8)
        expect(getIncomeRange(2020, 90000)).toBe(9)
        expect(getIncomeRange(2020, 99999)).toBe(9)
        expect(getIncomeRange(2020, 100000)).toBe(10)
        expect(getIncomeRange(2020, 119999)).toBe(10)
        expect(getIncomeRange(2020, 120000)).toBe(11)
        expect(getIncomeRange(2020, 139999)).toBe(11)
        expect(getIncomeRange(2020, 140000)).toBe(12)
        expect(getIncomeRange(2020, 159999)).toBe(12)
        expect(getIncomeRange(2020, 160000)).toBe(13)
        expect(getIncomeRange(2020, 179999)).toBe(13)
        expect(getIncomeRange(2020, 180000)).toBe(14)
        expect(getIncomeRange(2020, 199999)).toBe(14)
        expect(getIncomeRange(2020, 200000)).toBe(15)
        expect(getIncomeRange(2020, 224999)).toBe(15)
        expect(getIncomeRange(2020, 225000)).toBe(16)
        expect(getIncomeRange(2020, 249999)).toBe(16)
        expect(getIncomeRange(2020, 250000)).toBe(17)
        expect(getIncomeRange(2020, 274999)).toBe(17)
        expect(getIncomeRange(2020, 275000)).toBe(18)
        expect(getIncomeRange(2020, 299999)).toBe(18)
        expect(getIncomeRange(2020, 300000)).toBe(19)
        expect(getIncomeRange(2020, 400000)).toBe(19)
        expect(getIncomeRange(2020, 500000)).toBe(19)
        expect(getIncomeRange(2020, 1000000)).toBe(19)
    })
}) 

  