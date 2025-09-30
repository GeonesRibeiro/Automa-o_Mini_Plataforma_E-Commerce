
describe('Funcionalidade: Carrinho de compras atualização de valor total', () => {
    it('Colocar item no carrinho e validar o valor total', () => {

        //arrange
        cy.visit('http://localhost:3001/')
        cy.get('#email').type('user@test.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click() 

        //act
        cy.get(':nth-child(1) > .product-actions > button').click()
        cy.get(':nth-child(2) > .product-actions > button').click()
        cy.get(':nth-child(3)  > .product-actions > button').click()

        //assert
        //cy.get('#cart-count').should('have.text', '3')
        cy.get('[data-layer="Content"]').should('be.visible')
        cy.get('#cart-total').should('have.text', '598,40')

        cy.screenshot('Adicionando produto no carrinho e validando o valor do carrinho')
    })

    it('Adicionando cupom fixo de desconto itens do carrinho', () => {
        //arrange
        cy.visit('http://localhost:3001/')
        cy.get('#email').type('user@test.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()

        cy.get(':nth-child(1) > .product-actions > button').click()
        cy.get(':nth-child(2) > .product-actions > button').click()
        cy.get(':nth-child(3) > .product-actions > button').click()

        //act
        cy.get('#coupon-code').type('FIXED50')
        cy.get('#apply-coupon-btn').click()

        //assert
        cy.get('#coupon-message').should('have.text', 'Cupom aplicado: FIXED50')
        cy.get('#discount').should('have.text', '50,00')
        cy.get('#final-total').should('have.text', '548,40')
        cy.get

        cy.screenshot('Produtos adicionados ao carrinho')
    })
    after(() => {
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
    })

})
