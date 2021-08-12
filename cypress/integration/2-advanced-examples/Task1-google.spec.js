
import * as helpers from '../../support/helpers'

context('Action', () => {

    before(()=>{
        cy.visit('https://www.google.com/')
    })

    it('verify google opened', () => {
        cy.get('.gNO89b').should('be.visible').should('have.value','חיפוש ב-Google')
    })

    it.only('Type a text to search',() => {
        //cy.get('.gLFyf').type('exalt technologies')
helpers.enterVal('.gLFyf', 'exalt technologies')

        cy.get('.erkvQe').find('li').then(($els) => {
            const texts = Array.from($els, el => el.innerText);
            for(let i=0;i<texts.length;i++)
            cy.log(texts[i])
        })
        
        cy.get('form').submit()
    })
    

    it('verify of result', () => {
        cy.get('.LC20lb').first().should('contain','EXALT Technologies')
        cy.get('.IsZvec').first().find('span').should('contain','Established in 1997, EXALT spearheaded the software development services industry to meet global market needs for innovative technologies')
        
    }) 

    it('Press English Btn', () => {
        cy.visit('https://www.google.com/')
        
        cy.get('[dir="rtl"]')
        cy.contains('English')
        cy.get('#SIvCob').find('a').first().next().click()

    })
    /*
    it('Press Image Btn', () => {
        cy.visit('https://www.google.com/')
        cy.get('.gb_f').within( ()=> {
            cy.contains('חיפוש תמונות').click()
        })
        
    })
    */

    // it.only('press Sign in', () => {
    //     // Cypress.config({chromeWebSecurity: false})
    //     // cy.visit('https://www.google.com/')
    //     cy.visit('https://accounts.google.com/')
    //     cy.get('#SIvCob').find('a').first().next().click()
    //     cy.get('.gb_Se>.gb_3c').click()


    // })
})