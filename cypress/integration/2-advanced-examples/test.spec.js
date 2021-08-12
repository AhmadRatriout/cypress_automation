/// <reference types="cypress" />
context('Action',()=>{

    beforeEach(()=>{
        cy.visit('https://example.cypress.io/commands/actions');
    })

    it.skip('type into a DOM element',()=>{
        cy.get("#email1").type('ahmadrt976@gmil.com',{delay:100}).should('have.value','ahmadrt976@gmil.com')

        .type('{selectall}{del}')
        cy.get('.action-disabled').type('unableBox',{force : true}).should('have.value','unableBox')
    })

    it.skip('focus on a DOM element',()=>{
        cy.get('#password1').focus().should('have.class','focus')
        .prev().should('have.attr', 'style', 'color: orange;')
    })

    it.skip('blur off a DOM element',()=>{
        cy.get('.action-blur').type('bluring').blur()
        .prev().should('have.attr','for','fullName1')
        .should('have.attr','style','color: red;')
        
    })

    it.skip('clears an input or textarea element',()=> {
        cy.get('#description').type('cleared text').should('have.value','cleared text').clear().should('have.value','')
        .prev().should('have.attr','for','description')
    })
    
    it.skip('submit a form',()=>{
        cy.get('.action-form').find('[class="form-control"]').type('Ahmad')
        cy.get('.action-form').submit()
        .next().should('contain','Your form has been submitted!')
        
    })

    it.skip('Click()', () => {
        cy.get('#action-canvas').click('left')
        .click('right')
        .click('bottom')
        .click('top')

        cy.get('.action-labels>.label')
        .click({ multiple: true })

        cy.get('.action-opacity>.btn').click({force: true})
    })

    it.skip('doubleclick', () => {
        cy.get('.action-div').dblclick().should('not.be.visible')
        cy.get('.action-input-hidden').should('be.visible')
    })

    it.skip('check', () => {
        cy.get('.action-checkboxes').find('[type="checkbox"]').check(['checkbox1','checkbox3'])

        cy.get('.action-checkboxes').find('[type="checkbox"]').check('checkbox2',{force:true})

        cy.get('.action-radios').find('[type="radio"]').check('radio1')

        cy.get('.action-radios').find('[type="radio"]').check('radio3',{force:true})

    })

    it.skip('Uncheck', () => {
        cy.get('.action-check').find('[type="checkbox"]').uncheck({force:true})
    })

    it.skip('Select from single or multiple selection LIST', () => {
        cy.get('.action-select').should('have.value','--Select a fruit--')

        cy.get('.action-select').select('apples').should('have.value','fr-apples')

        // what is the usage of invoke
        cy.get('.action-select-multiple').select(['apples','bananas']).invoke('val').should('deep.equal',['fr-apples','fr-bananas'])

        cy.get('.action-select-multiple').select(['fr-apples','fr-bananas','fr-oranges'])
        .invoke('val').should('contain', 'fr-oranges')

        cy.get('.action-select-multiple').select(['fr-apples','fr-bananas','fr-oranges'])
        .invoke('val').should('include', 'fr-oranges')

    })

    it.skip('Horizantle scrollbar& Vertical',() => {
        cy.get('#scroll-horizontal button').should('not.be.visible')

        cy.get('#scroll-horizontal button').scrollIntoView().should('be.visible')

        cy.get('#scroll-vertical button').should('not.be.visible')

        cy.get('#scroll-vertical button').scrollIntoView().should('be.visible')

        cy.get('#scroll-both button').should('not.be.visible').scrollIntoView().should('be.visible')

    })

    it.skip('trigger' , () => {
        cy.get('.trigger-input-range')
        .invoke('val', 25)
        .trigger('change')
        .next()
        .should('have.text', '25')

        // OR

        cy.get('.trigger-input-range')
        .invoke('val', 25)
        .trigger('change')
        .get('input[type=range]').siblings('p')
        .should('have.text', '25')
    })

    it.skip('scrollTo() , Scroll to specific position', () => {
        cy.scrollTo('bottom')

        cy.get('#scrollable-horizontal').scrollTo('right')

        .scrollTo('left')
        cy.get('#scrollable-vertical').scrollTo(500,500)

        cy.get('#scrollable-vertical').scrollTo('center',{ easing: 'linear' })
        
        cy.get('#scrollable-both').scrollTo('center', {duration:2000})
    })


})