import moment from 'moment'
import { formatMoney} from '../../helpers'

const currentYear = moment().format('YYYY')
const today = moment().format('MM/DD/YYYY')
const currentMonth = moment().month()+1
const nextYear = (parseInt(currentYear)+1).toString()
const priorYear = (parseInt(currentYear)-1).toString()

/* Get current year to replace pattern cYYYY */
const getCurrentYearStringPattern = (text, pattern) =>{
    return text.toString().replace(pattern, currentYear)
}

/* Get current year YYYY */
const getCurrentYearString = () => {
    return currentYear
}

/* Get prior year to replace pattern pYYYY*/
const getPriorYearStringPattern = (text, pattern) =>{
    return text.toString().replace(pattern, priorYear)
}

/* Get prior year YYYY*/
const getPriorYearString = () =>{
    return priorYear
}

const getNextYearString = () => {
    return nextYear
}

const getCurrentDateForCalendar = () => {
    return today
}  

/* The days param for prior dateshould be neg */
const getOffsetDateForCalendar = (days) => {
    return moment().day(days).format('MM/DD/YYYY')
}  

const getNumbersFromDate = (date) =>{
    return date.replace('/', '')
}

const useCurrentYear = (dateStr) => {
    return dateStr.substring(0,6)+currentYea 
}

/* expected income functions */
const convertToDollar = (str) =>{
    return formatMoney(str).toString()
}

const incomeToDateMonthly = (pay) => {
    return currentMonth * pay
}

const incomeToDateTwiceMonthly = (pay) => {
    return (currentMonth * 2) * pay
}

const salaryYearIncome = (text, pay, increment) => {
    return text.replace('aYEAR' , formatMoney(pay * increment).toString()) 
}

/*const getExpectedIncomeSalary = (pay, increment) => {
    switch (increment){
        case 'month' : return currentMonth * pay
        case 'twiceMonthly : return (currentMonth * 2) * pay
        case 'week' : return (currentMonth * 4) * pay
        case 'everyTwoWeeks : need to add the 2 extra pay periods as appropriate
    }
}*/

export {getCurrentYearStringPattern, getCurrentYearString, getPriorYearStringPattern, 
    getNextYearString, getPriorYearString, getCurrentDateForCalendar, getOffsetDateForCalendar, 
    convertToDollar, getNumbersFromDate, useCurrentYear, incomeToDateMonthly, 
    incomeToDateTwiceMonthly, salaryYearIncome}  