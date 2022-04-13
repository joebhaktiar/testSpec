import XLSX from 'xlsx'

describe('Testing Dummy test', () => {
    it('Default', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
        })
    })

    it('Write to a text file test1.txt using writeFile', () => {
        cy.writeFile('cypress/fixtures/test1.txt', 'aldo')
    })

    it('Write to a JSON file test2.json using writeFile', () => {
        cy.writeFile('cypress/fixtures/test2.json', { firstname: 'Alapan', lastname: 'Das' })
    })

    it('Validate the content of both text and JSON file using readFile', () => {
        cy.readFile('cypress/fixtures/test1.txt').should('contain', 'Testersdock')
        cy.readFile('cypress/fixtures/test2.json').its('firstname').should('eq', 'Alapan')
    })

    it('excel test', () => {
          const workbook = ('cypress/fixtures/text1.xlsx')
          const worksheet = workbook.addWorksheet('TestAldo');
        worksheet.columns = [
         { header: 'Id', key: 'id', width: 10 },
         { header: 'Name', key: 'name', width: 32 },
         { header: 'D.O.B.', key: 'dob', width: 15, }
        ];

        worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
        worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

        console.log('File is written');
    })

    it('excel test2 ', () => {
        const workbook = ('cypress/fixtures/text1.xlsx')
        const worksheet = workbook.addWorksheet('TestAldo');
        worksheet.columns = [
       { header: 'Id', key: 'id', width: 10 },
       { header: 'Name', key: 'name', width: 32 },
       { header: 'D.O.B.', key: 'dob', width: 15, }
      ];

      worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
      worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

      console.log('File is written');
  })

  it('excel test3 ', () => {
    cy.aboutYouPage('single')
    cy.incomePage('salary', 'allYear', 'monthly', '6000', '60000', '1000', '10000')
    cy.get('[data-testid=backButton]').click()
    cy.get('form').find('[name="jobs[0].contributionsAndBonuses.bonusFuture.checked]').check()
    // cy.get('[data-testid=contributionsAndBonuses]').eq(0).click()
    // cy.get('[data-testid=contributionsAndBonuses]').click({ multiple: true })

    // cy.writeAldo()
    // cy.task('writexLSX', 'cypress/fixtures/text1.xlsx')
    // cy.task('writexLSX' { file: 'cypress/fixtures/text1.xlsx'})
    // cy.check()
  })
  it('testing clock ', () => {
    cy.clock().invoke('restore')
    cy.clock(Date.UTC(2021, 2, 5), ['Date'])
    cy.get('[data-testid=filingStatus-single] > .text').click()
    cy.get('[data-testid=jobOrPension-input-yes]').click()
    cy.get('[data-testid=nextButton]').click()
    cy.get('[data-testid=incomeType0-input-salary]').click()
    cy.get('[data-testid=timePeriodOfJob0-input-allYear]').click()
    cy.get('[data-testid=payFrequency0-input-weekly]').click()
    cy.get('[data-testid=payFrequency0-input-weekly]').click()
    cy.get('[data-testid="jobs[0].dateLastPayPeriodCalenderButton"]').click()
    const todayDate = new Date().toISOString().slice(0, 10);
    cy.log(todayDate);
  })

  it('slider stack overflow ', () => {
    cy.get('[data-testid=stepIndicatorStep6]').click()
    cy.get('.MuiSlider-thumb')
    //         cy.get('[data-testid="fileLink"] + div').invoke('attr', 'style', 'visibility: visible;opacity: 0;')

    const currentValue = 20000;
    const targetValue = 35000;
    const increment = 500;
    const steps = (targetValue - currentValue) / increment;
    const arrows = '{leftarrow}'.repeat(steps)

    cy.get('MuiSlider-thumb')
      .should('have.attr', 'aria-valuenow', '0')
      .type(arrows)
  })
// Testing excel Testing excel Testing excel Testing excel Testing excel Testing excel Testing excel Testing excel
  it('excel testing ', () => {
    cy.fixture('Results.json').as('ResultsJSON')
    cy.get('@ResultsJSON').then((Results) => {
    const data = [
      { 'name': 'John', 'city': 'Seattle' },
      { 'name': 'Mike', 'city': 'Los Angeles' },
      { 'name': 'Zach', 'city': 'New York' }
  ];

  /* make the worksheet */
  const ws = XLSX.utils.json_to_sheet(Results);

  /* add to workbook */
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Results');

  /* generate an XLSX file */
  XLSX.writeFile(wb, '.downloads/sheetjs.xlsx');
  })
})
// does not work
it('excel modify ', () => {
  cy.fixture('Results.json').as('ResultsJSON')
  cy.get('@ResultsJSON').then((Results) => {
  
/* make the worksheet */
const ws = XLSX.utils.json_to_sheet(Results);

/* add to workbook */
const wb = XLSX.readFile({ filename: 'cypress/fixtures/TestScenariosInputData.xlsm', sheet: 'Results' })
// const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Results');

/* generate an XLSX file */
XLSX.writeFile(wb, 'sheetjs.xlsx');
})
})

  it('testing loop ', () => {
    const checkAndReload = () => {
      // get the element's text, convert into a number
      cy.get('#result')
        .should('not.be.empty')
        .invoke('text')
        .then(parseInt)
        .then((number) => {
          // if the expected number is found
          // stop adding any more commands
          if (number === 7) {
            cy.log('lucky **7**')

            return
          }

          // otherwise insert more Cypress commands
          // by calling the function after reload
          cy.wait(500, { log: false })
          cy.reload()
          checkAndReload()
        })
    }

    checkAndReload()
  })
  it.only('testing loop ', () => {
    cy.clock(Date.UTC(2021, 11, 21), ['Date'])
  })
})
