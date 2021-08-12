/// <reference types="cypress" />

context('Action', () => {

    beforeEach( () => {
        cy.visit('https://example.cypress.io/commands/aliasing')
    })

    it('as() Command', () => {
        cy.get('.as-table').find('tbody>tr').first()
        .find('td').first()
        .find('button').as('firstBtn')

        cy.get('@firstBtn').click().should('have.class','btn-success').and('contain','Changed')
        cy.log('test')
        

    })

})