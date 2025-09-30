describe('login page', () => {
    beforeEach(() => {
        //arrange
        cy.visit('http://localhost:3001/')
    })

    it('Realizar login Regular User', () => {

        //act
        cy.get('#email').type('user@test.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()

        //assert
        cy.get('#user-name').should('contain.text','Regular User')
        cy.screenshot('Login realizado com sucesso')
    })

    
    it('Realizar login Admin User', () => {

        //act
        cy.get('#email').type('admin@test.com')
        cy.get('#password').type('admin123')
        cy.get('#login-btn').click()

        //assert
        cy.get('#user-name').should('contain.text','Admin User')
        cy.screenshot('Login realizado com sucesso')
    })

    it('Realizar login Invalid User', () => {

        //act
        cy.get('#email').type('invalid@test.com')
        cy.get('#password').type('invalid123')
        cy.get('#login-btn').click()

        //assert
        cy.screenshot('Credenciais inválidas')
    })
})
