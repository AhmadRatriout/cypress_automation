

export const LOCATORS = {
    login: '.login',
    email : '#email',
    password : '#passwd',
    signin : '#login_form[type=submit]',
    loginerrmesg: '.alert-danger',
    loginform: '#login_form',
    submit : '[type=submit]',
    emailcreate: '#email_create',
    submitcreatebtn: '#SubmitCreate',
    head: '.page-heading',
    mr : '#id_gender1' ,
    mrs : '#id_gender',
    register: '#submitAccount',
    fName : '#customer_firstname',
    lName: '#customer_lastname',
    day : '#days',
    month : '#months',
    year : '#years',
    phoneNumber: '#phone_mobile',
    address : '#address1',
    city : '#city',
    state: '#id_state',
    postcode : '#postcode',
    username: '.account > span',
    createerr: '#create_account_error',
    logout : '.logout',
    bankwire : '.bankwire',
    checkqueue : '.cheque',
    navbar : '#block_top_menu',
    submenue : '.submenu-container',
    numcart : '.shopping_cart a',
    buytstepbtn : '.cart_navigation > .button > span',
    prevstep : '.step_done_last',
    currstep : '.step_current > span',
    products : '.product_list>',
    prodnames : '.product-name',
    confpay : '#center_column',


}

export const MSG = {
    emailreq : 'An email address required.',
    passwdreq : 'Password is required.',
    invemail : 'Invalid email address.',
    invpasswd : 'Invalid password.',
    existmail : "An account using this email address has already been registered. Please enter a valid password or request a new one. ",
    confpay : 'Your order on My Store is complete.',
}



/**
 * Function to click button
 * @param {String} locator
 */

 export const clickBtn = function(locator){
     cy.get(locator).click({timeout:100000})
 }
export const enterVal = function (locator, value) {
    cy.get(locator)
    .clear()
    .type(value)
} 

export const verifyPageUrl = function(actual,real) {
    
    assert.equal(actual,real,"URL's doesn't match")
}

export const verifyListCreateAccount = function(element,index,alert){
    if(alert == 2){ 
        
        if (index==0){assert.equal(element,'passwd is invalid.','passwd is invalid.')}
        if (index==1){assert.equal(element,"The Zip/Postal code you've entered is invalid. It must follow this format: 00000","The Zip/Postal code you've entered is invalid. It must follow this format: 00000")}
        
    }

    if(alert == 5){
        if (index==0){assert.equal(element,'You must register at least one phone number.','You must register at least one phone number.')}
        if (index==1){assert.equal(element,'address1 is required.','address1 is required.')}
        if (index==2){assert.equal(element,'city is required.','city is required.')}
        if (index==3){assert.equal(element,"The Zip/Postal code you've entered is invalid. It must follow this format: 00000","The Zip/Postal code you've entered is invalid. It must follow this format: 00000")}
        if (index==4){assert.equal(element,'This country requires you to choose a State.','This country requires you to choose a State.')}
    }

    if(alert == 1){
        assert.equal(element,"The Zip/Postal code you've entered is invalid. It must follow this format: 00000","The Zip/Postal code you've entered is invalid. It must follow this format: 00000")
    }
}

export const verifyLoginCreateerr = function (act, exp){
    assert.equal(act, exp, "Message shouldn't be like this")
}

export const selectDateofBirth = function(D,M,Y){
    cy.get(LOCATORS.day).select(D)
    cy.get(LOCATORS.month).select(M)
    cy.get(LOCATORS.year).select(Y)
}

export const login = function(user){
    //clickBtn(LOCATORS.login)
    enterVal(LOCATORS.email,user.email)
    enterVal(LOCATORS.password, user.pass)
    cy.get(LOCATORS.loginform).find(LOCATORS.submit).click({timeout:100000})
}

export const signup = function(User){

    
    
    if(cy.get(LOCATORS.head).should('contain','Create an account')){

        enterVal(LOCATORS.fName,User.fName)
        enterVal(LOCATORS.lName,User.lName)
        cy.get(LOCATORS.email).should('have.value','ahmadrt@gmail.com')
        enterVal(LOCATORS.password,User.pass)
        if(d.length ==0){selectDateofBirth(User.day,User.month,User.year)}
        enterVal(LOCATORS.phoneNumber,User.phone)
        enterVal(LOCATORS.address,User.address)
        enterVal(LOCATORS.city,User.city)
        cy.get(LOCATORS.state).select('California')
        enterVal(LOCATORS.postcode,User.postcode)
        clickBtn(LOCATORS.register)

    }
        
}

export const creatacc = function(user){
    clickBtn(LOCATORS.login)
    enterVal(LOCATORS.emailcreate, user.email)
    cy.get(LOCATORS.submitcreatebtn).click({timeout:4000000})
}

/**
 * 
 */
export const chooseCateg = function(menu,categ){
    if(menu != 'T-shirts'){
        if(menu == 'Women'){
            let index='0'
            cy.get(LOCATORS.navbar).find('ul>li').contains(menu).focus()
            cy.get(LOCATORS.navbar).find('ul>li').contains(menu).parent().should('have.class','sfHover')
            cy.get(LOCATORS.navbar).find('ul>li').contains(menu).focus().get(LOCATORS.submenue).eq(index).contains(categ).click()
        } else if (menu == 'Dresses') {
            let index = '1'
            cy.get(LOCATORS.navbar).find('[title=Dresses]').eq('1').focus()
            cy.get(LOCATORS.navbar).find('[title=Dresses]').eq('1').parent().should('have.class','sfHover')
            cy.get(LOCATORS.navbar).find('[title=Dresses]').eq('1').focus().get(LOCATORS.submenue).eq(index).contains(categ).click()
        }
        
    } else {
        cy.get(LOCATORS.navbar).find('ul>li').contains('Women').focus()
        cy.get(LOCATORS.navbar).find('ul>li').contains('Women').parent().should('have.class','sfHover')
        cy.get(LOCATORS.navbar).find('ul>li').contains('Women').focus().get(LOCATORS.submenue).eq('0').contains('T-shirts').click()
    }

}

export const verifyNumInCart = function(act,exp){   
        assert.equal(act,exp,' ')  
}

/**
 * 
 */
export const chooseProd = function(name){
    cy.get(LOCATORS.products).find(LOCATORS.prodnames)
    .contains(name)
    .click()
    cy.get('h1').should('contain',name)
}

/**
 * 
 */
export const addToCart = function (){
    cy.get('button').contains('Add to cart').parent().click()
    cy.wait(10000)
}

/**
 * 
 */
export const verifyCurrStep = function(text) {
    cy.get(LOCATORS.currstep).should('contain',text).should('have.css','color', 'rgb(255, 255, 255)')
}

/**
 * 
 */
export const cerifyPrevStep = function(text) {
    cy.get(LOCATORS.prevstep).should('contain',text).and('have.css','background','rgba(0, 0, 0, 0) linear-gradient(rgb(114, 113, 113) 0%, rgb(102, 102, 102) 100%) repeat scroll 0% 0% / auto padding-box border-box')
}

/**
 * 
 */
export const nextBuyStep= function(){
    cy.get(LOCATORS.buytstepbtn).click()
}

/**
 * 
 */
export const wayToPay = function(way){
    cy.get(way).click({timeout:10000})
}

/**
 * 
 */
export const confirmPayment = function(){
    cy.get(LOCATORS.confpay).should('contain',MSG.confpay)
}