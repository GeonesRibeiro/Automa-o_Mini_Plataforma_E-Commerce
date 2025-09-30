describe('Finalizar uma compra com cupom de desconto fixo', () => {
    it('Finalizando a compra com desconto aplicado', () => {
        //arrange
        cy.visit('http://localhost:3001/')
        cy.get('#email').type('user@test.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()
        cy.get(':nth-child(1) > .product-actions > button').click()
        cy.get(':nth-child(2) > .product-actions > button').click()
        cy.get(':nth-child(3) > .product-actions > button').click()
        cy.get('#coupon-code').type('FIXED50')
        cy.get('#apply-coupon-btn').click()

        //act
        cy.get('#checkout-btn').click()

        //assert
        cy.get('#result').should('be.visible')
        cy.screenshot('Finalizando a compra com cupom de desconto fixo')
    })

    it('validando a restrição do botão quando o estoque for zerado', () => {
        //arrange
        cy.visit('http://localhost:3001/')
        cy.get('#email').type('user@test.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()
        //act

        cy.get(':nth-child(3)> .product-actions > button').click()

        //assert
        cy.get(':atribute="disabled"]').should('be.disabled')
        .and('have.text','Sem estoque')

        cy.screenshot('Botão desabilitado quando o estoque for zerado')
    })
})