Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () { // preenche os campos obrigatórios e submete 
    cy.get('#firstName').type('Lívia')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('livia.rosa@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

})