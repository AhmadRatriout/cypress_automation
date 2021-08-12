/// <reference types="cypress" />

import * as helpers from '../../support/helpers'
let user ={

}
let menu = {
    women :'Women',
    dresses : 'Dresses',
    tshirts : 'T-shirts',
}
let categ = {
    t_shirts : 'T-shirts',
    blouses : 'Blouses',
    casual : 'Casual Dresses',
    evdress : 'Evening Dresses',
    sumdress : 'Summer Dresses',
}
let checksteps = {
    summury : 'Summary',
    signin : ' Sign in',
    address : ' Address',
    shipping : ' Shipping',
    payment : ' Payment',

}
const WEBSITE = 'http://automationpractice.com/'

context('Action',() => {
    beforeEach(() => {
        cy.visit(WEBSITE)
    })

    it.skip('Choose Specific Category', () => {
        helpers.chooseCateg(menu.dresses,categ.sumdress)
    })

    it.skip('Verify No item in cart', () => {
        cy.get('.shopping_cart a').find('span').first().then(function($el){
            helpers.verifyNumInCart($el.text(),'0')
        })
    })

    it.skip('choose product to add list', () => {
        helpers.chooseCateg(menu.dresses,categ.sumdress)
        helpers.chooseProd('Printed Chiffon Dress')
    })

    it('Buy without login', () => {
        helpers.chooseCateg(menu.dresses,categ.sumdress)
        helpers.chooseProd('Printed Chiffon Dress')
        helpers.addToCart()
        cy.get('#layer_cart').find('a').contains('Proceed to checkout').click()
        cy.get(helpers.LOCATORS.numcart).find('span').first().then(function($el){
            helpers.verifyNumInCart($el.text(),'1')
        })
        helpers.verifyCurrStep(checksteps.summury)
        helpers.nextBuyStep()
        helpers.verifyCurrStep(checksteps.signin)
        user = {
            email : 'ahmadrt976@gmail.com',
            pass : 'ahmad123'
        }
        helpers.login(user)
        helpers.verifyCurrStep(checksteps.address)
        helpers.nextBuyStep()
        helpers.verifyCurrStep(checksteps.shipping)
        helpers.cerifyPrevStep(checksteps.address)
        cy.get('#cgv').check()
        helpers.nextBuyStep()
        helpers.wayToPay(helpers.LOCATORS.bankwire)
        helpers.nextBuyStep()
        helpers.confirmPayment()
        helpers.cerifyPrevStep(checksteps.shipping)
    })

    it('Buy with logged in account', () => {
        cy.get(helpers.LOCATORS.login).click()
        user = {
            email : 'ahmadrt976@gmail.com',
            pass : 'ahmad123'
        }
        helpers.login(user)
        helpers.chooseCateg(menu.tshirts,categ.sumdress)
        helpers.chooseProd('Faded Short Sleeve T-shirts')
        helpers.addToCart()
        cy.get('#layer_cart').find('a').contains('Proceed to checkout').click()
        cy.get(helpers.LOCATORS.numcart).find('span').first().then(function($el){
            helpers.verifyNumInCart($el.text(),'1')
        })
        helpers.nextBuyStep()
        helpers.cerifyPrevStep(checksteps.signin)
        helpers.nextBuyStep()
        cy.get('#cgv').check()
        helpers.nextBuyStep()
        helpers.wayToPay(helpers.LOCATORS.checkqueue)
        helpers.nextBuyStep()
        helpers.confirmPayment()
    })



})