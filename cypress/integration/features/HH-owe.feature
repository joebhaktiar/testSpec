Feature: e2e Scenarios

  I want to make e2e scenarios to test the calculations

    Scenario: Head of Hosehold Owe
      # About You Page
      
      When I click on "head-Of-Household" for "filingStatus" radio question 
      Then I click on "yes" for "jobOrPension" radio question
      Then I select the "willClaimDependents" checkbox
      Then I select the "willClaimDependents" checkbox
      Then I click the "next" button
      # Income & Withholding Page
      Then The "incomeWithholdingSubtitle" field should be visible
      Then I click on "salary" for "incomeType" radio question
      Then I click on "allYear" for "timePeriodOfJob" radio question
      Then I click on "monthly" for "payFrequency" radio question
            
      When  I click on "monthly" for "payFrequency" radio question
      Then I type "08/01/2021" in data field "0" of "dateLastPayPeriod"
      Then I type "500" in the "wagesPerPayPeriod" currency field
      Then I type "100000" in the "wagesYTD" currency field
      Then I click on "yes" for "isIncomeAmountCorrect" radio question
            Then I click on "yes" for "isIncomeAmountCorrect" radio question
      Then I type "50" in the "taxesPerPayPeriod" currency field
      Then I type "5000" in the "taxesYTD" currency field
      Then I click the "next" button
      # Adjustments Page
      Then I open the "studentLoan" checkbox
      Then I type "2000" in currency field "0" of "studentLoan"
      Then I open the "alimony" checkbox
      Then I type "1000" in currency field "0" of "alimony"
      Then The "total" field should display as "Your total Adjustments are: $3,000"
      Then I click the "next" button
      # Deductions Page
      Then I click on "standardDeduction" for "deductions" radio question
      Then I click the "next" button
      # Tax Credits Page
      Then I open the "retirementSavings" accordion
      Then I type "500" in the "retirementSavingsCredit" currency field
      Then I click the "next" button
      # Results Page
      Then The "resultsAccuracyParagraph1" field should display as "If you do not change your withholding, you may owe taxes at the end of the year."