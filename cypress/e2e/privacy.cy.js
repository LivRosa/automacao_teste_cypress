
Cypress._.times(3, () => {
  it.only('Test the privacy policy page independently', () => {
    cy.visit('src/privacy.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade') 
    cy.contains('Talking About Testing').should('be.visible')
  })

})
