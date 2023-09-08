const {
    mail,
    pass,
    mail2,
    pass2,
  } = require("./libs/users");

const { generateName } = require("./libs/util");

describe('Open main page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('open main page', () => {
        cy.contains('Books list').should('be.visible')
    })

    it('autorization', () => {
        cy.login(mail, pass);
        cy.contains('Добро пожаловать').should('be.visible');
    })

});

describe('Actions with books', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.login(mail, pass);
    })

    it('add new Book', () => {
        const title = generateName(10);
        const description = generateName(20);
        const author = generateName(10);
        cy.addBook(title, description, author);
        cy.get('.card-title').last().should('have.text', title);
    })

})

describe('Actions in Favorites', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.login(mail, pass);
        cy.addBook(generateName(10), generateName(20), generateName(10));
        cy.addBook(generateName(10), generateName(20), generateName(10));

        cy.get('.btn-success').first().click();
        cy.get('.btn-success').last().click();

        cy.get('h4').click();
    })

    it('delete Book from Favorite', () => {
        let text; 
        const id = 0;

        cy.get('.card-title')
        .eq(id)
        .then(($div) => {
            text = $div.text();
        })

        cy.get('.btn-secondary').eq(id).click();
        cy.get('.card-title').each(($el) => {
            expect($el.text()).to.not.equal(text)
        })
    })

    it('open page book', () => {
        let text; 
        const id = 0;

        cy.get('.card-title').eq(id).then(($div) => {
            text = $div.text();
        })

        cy.get('.card-title').eq(id).click();
        cy.get('h2').then(($h2) => {
            expect($h2.text()).to.equal(text)
        })

        cy.contains('Dowload book').should('be.visible');
    })

})