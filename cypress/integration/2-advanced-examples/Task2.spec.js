/// <reference types="cypress" />


import * as helpers from '../../support/helpers'
var user = {

}
const WEBSITE = 'http://automationpractice.com/index.php'
context('Action', () => {

    beforeEach(() => {
        cy.visit(WEBSITE, { timeout: 100000 })
    })

    it('Visit Page and click on Sign in page', () => {

        helpers.clickBtn(helpers.LOCATORS.login)
        cy.wait(2000)
        cy.url().then(function (url) {
            helpers.verifyPageUrl(url, 'http://automationpractice.com/index.php?controller=authentication&back=my-account')
        })
    })

    it('Enter empty email', () => {
        helpers.login(user)
        cy.get(helpers.LOCATORS.loginerrmesg).find('li').then(function ($el) {
            helpers.verifyLoginCreateerr($el.text(), helpers.MSG.emailreq)
        })
    })

    it('Enter empty Password,and valid email', () => {
        user.email = 'ahmadrt976@gmail.com'
        user.pass = ' '
        helpers.login(user)
        cy.get(helpers.LOCATORS.loginerrmesg).find('ol > li').then(function ($el) {
            helpers.verifyLoginCreateerr($el.text(), helpers.MSG.passwdreq)
        })
    })

    it.only('Enter invalid Email ,and verify', () => {
        user = {
            email: 'ahmad',
            pass: '123'
        }
        helpers.login(user)
        cy.get(helpers.LOCATORS.loginerrmesg).find('li').then(function ($el) {
            helpers.verifyLoginCreateerr($el.text(), helpers.MSG.invemail)
        })
    })

    it('Enter valid email&invalid password', () => {
        user.email = 'ahmadrt976@gmail.com'
        user.pass = '123'
        helpers.login(user)
        cy.get(helpers.LOCATORS.loginerrmesg).find('li').then(function ($el) {
            helpers.verifyLoginCreateerr($el.text(), helpers.MSG.invpasswd)
        })
    })

    it('Enter with exist account', () => {
        user.email = 'ahmadrt976@gmail.com'
        user.pass = 'ahmad123'
        helpers.login(user)
        cy.get(helpers.LOCATORS.username).should('contain', 'Ahmad Ratrout')
    })

    it('Create account withot mail', () => {
        user.email = ' '
        helpers.creatacc(user)
        cy.get(helpers.LOCATORS.createerr).find('li').then(function ($el) {
            helpers.verifyLoginCreateerr($el.text(), helpers.MSG.invemail)
        })
    })

    it('Register with exist account', () => {
        user.email = 'ahmadrt976@gmail.com'
        helpers.creatacc(user)
        cy.get(helpers.LOCATORS.createerr).find('ol > li').then(function ($el, index, $li) {
            helpers.verifyLoginCreateerr($el.text(), helpers.MSG.existmail)
        })
    })
    it('Enter Mail to create & Verify creat page', () => {
        user.email = 'ahmadrtt@gmail.com'
        helpers.creatacc(user)
        cy.get(helpers.LOCATORS.head).should('contain', 'Create an account')
    })

    it('Register Empty req. field', () => {
        user.email = 'ahmadrtt@gmail.com'
        user.fName = ' '
        user.lName = ' '
        user.pass = ' '
        user.day = ' '
        user.month = ' '
        user.year = ' '
        user.address = ' '
        user.city = ' '
        user.state = ' '
        user.postCode = ' '
        user.phone = ' '

        helpers.creatacc('ahmadrt@gmail.com')
        helpers.signup(user)
        cy.get('.alert-danger li').should('have.length', 2).each(($el, index, $list) => {

            helpers.verifyListCreateAccount($el.text(), index, 2)
        })
    })

    it('base info', () => {
        user.email = 'ahmadrt97@gmail.com'
        user.fName = 'Ahmad'
        user.lName = 'Rat'
        user.pass = 'ahmad123'
        user.day = '26'
        user.month = '4'
        user.year = '1999'
        user.address = ' '
        user.city = ' '
        user.state = ' '
        user.postCode = ' '
        user.phone = ' '

        helpers.creatacc(user)
        helpers.signup(user)
        cy.get('.alert-danger li').should('have.length', 1).each(($el, index, $list) => {

            helpers.verifyListCreateAccount($el.text(), index, 1)
        })

    })

    it('fill wrong postcode', () => {
        user.email = 'ahmadrt97@gmail.com'
        user.fName = 'Ahmad'
        user.lName = 'Rat'
        user.pass = 'ahmad123'
        user.day = '26'
        user.month = '4'
        user.year = '1999'
        user.address = "Mo'ta street"
        user.city = 'Nablus'
        user.state = '4'
        user.postCode = 'P450'
        user.phone = '0598414377'

        helpers.creatacc(user)
        helpers.signup(user)
        cy.get('.alert-danger li').should('have.length', 1).each(($el, index, $list) => {

            helpers.verifyListCreateAccount($el.text(), index, 1)
        })
    })

    it.skip('fill full req.& register,& verify login', () => {
        user.email = 'ahmadrt97@gmail.com'
        user.fName = 'Ahmad'
        user.lName = 'Rat'
        user.pass = 'ahmad123'
        user.day = '26'
        user.month = '4'
        user.year = '1999'
        user.address = "Mo'ta street"
        user.city = 'Nablus'
        user.state = '4'
        user.postCode = 'P450'
        user.phone = '0598414377'


        helpers.creatacc(user)
        helpers.signup(user)
        cy.get(helpers.LOCATORS.username).should('contain', 'Ahmad Ra')

    })





})
