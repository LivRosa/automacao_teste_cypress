/// <reference types="Cypress" />

  describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {//primeira coisa que o cod vai fazer é visitar o endereço que passamos
      // beforeEach -> antes de cada teste, faça o comando que está aqui dentro
      cy.visit('src/index.html')/// está acessando um arquivo do computador: dentro de "scr" -> "index.html"
    })
    it('checks the title of the application', function() { /// caso de teste; "verifica o título da aplicação
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
// cy.title -> para buscar o título da aplicação(aba do navegador);.should -> verifica se um valor atender a uma condição específica 
// 'be.equal' -> verifica se o valor que estamos testando é igual ao valor esperado 
    })

    it('Fills in the required fields and submits the form', function () { // it.only -> para executar somente esse teste; "preenche os campos obrigatórios e envia o formulário"
      const longText = 'brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação,'
      /// variavel que criamos
      cy.get('#firstName').type('Lívia')
      cy.get('#lastName').type('Rosa')
      cy.get('#email').type('livia.rosaraujo2@gmail.com')// o # na frente significa que é um ID
      cy.get('#open-text-area').type(longText, {delay: 2})
      ///utilizamos a varial que criamos "longText" e o "delay:2" para controlar o tempo de resultado; podemos colocar qualquer valor ali 
      cy.contains('button', 'Enviar').click()// encontrou um botão que tenha o texto "enviar" e clicou nele 
      cy.get('.success').should('be.visible') // AQUI COLOCOU UM "." NA FRENTE POIS É UMA CLASSE
    })

    it('Displays an error message when submitting the form with an improperly formatted email', function () { // exibe uma mensagem de erro ao enviar o formulário com um e-mail formatado incorretamente
      cy.get('#firstName').type('Lívia')
      cy.get('#lastName').type('Rosa')
      cy.get('#email').type('livia.fofa@gmail')
      cy.get('#open-text-area').type('teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    it('The phone field remains empty when filled with a non-numeric value', function () {//Campo telefonico continua vazio quando preenchido com valor não-númerico
      cy.get('#phone')/// pegar um elemento que tenha o id phone
        .type('abcdefghij') /// tenta digitar no campo um valor não-númerico
        .should('have.value','') /// está verificando se o campo de telefone ainda está vazio ('') após tentar digitar letras nele.
    })

    it('Displays an error message when the phone field becomes mandatory but is not filled before submitting the form', function () { //Exibe mensagem de erro quando o campo telefone se torna obrigatório mas não é preenchido antes do envio do formulário
      cy.get('#firstName').type('Lívia')
      cy.get('#lastName').type('Rosa')
      cy.get('#email').type('livia.rosaraujo@gmail.com')
      cy.get('#open-text-area').type('teste')
      cy.get('#phone-checkbox').check()
      cy.contains('button', 'Enviar').click()
      
      cy.get('.error').should('be.visible') 
    })

    it('Fills and clears the first name, last name, email, and phone fields', function () {//Preenche e limpa os campos nome, sobrenome, e-mail e telefone
      cy.get('#firstName')
        .type('Lívia')
        .should('have.value', 'Lívia')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('Rosa')
        .should('have.value', 'Rosa')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('livia.rosaraujo@gmail.com')
        .should('have.value', 'livia.rosaraujo@gmail.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('11983288771')
        .should('have.value', '11983288771')
        .clear()
        .should('have.value', '')
    })

    it('Displays an error message when submitting the form without filling in the required fields', function () {//Exibe mensagem de erro ao enviar o formulário sem preencher os campos obrigatórios
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible') 
    })

    it('Submits the form successfully using a custom command', function() {//Envia o formulário com sucesso usando um comando personalizado
      cy.fillMandatoryFieldsAndSubmit()// comando costumizados que criamos para preencher os campos obrigatórios e submeter ao formulário 
      cy.get('.success').should('be.visible')// verificar a mensagem de sucesso 
    })

    it('Select a product (YouTube) based on its text', function () {//Seleciona um produto (YouTube) por seu texto
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    })

    it('Select a product (Mentoria) based on its value', function () {//Seleciona um produto (Mentoria) por seu valor (value)
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })
      
    it('Select a product (Blog) based on its index', function () {//Seleciona um produto (Blog) por seu índice
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    })

    it('Mark the service type as "Feedback"', function () {//Marca o tipo de atendimento "Feedback"
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')

    })

    it('Mark each type of atendimento', function() {//Marca cada tipo de atendimento
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })

    })

    it('Mark both checkboxes, then uncheck the last one.', function () {//Marca ambos checkboxes, depois desmarca o último
      cy.get('input[type= "checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
      })

    it('Select a file from the fixtures folder',  function (){//Seleciona um arquivo da pasta fixtures
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })

    })

    it('Select a file simulating a drag-and-drop action', function (){//Select a file simulating a drag-and-drop action. - arrastar o arquivo
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action:'drag-drop'} )
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })

    })

    it('Select a file using a fixture that has been given an alias.', function (){//seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('Verify that the privacy policy opens in another tab without the need for a click', function() {//Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Access the privacy policy page by removing the target and then clicking the link', function () {//Acessa a página da política de privacidade removendo o target e então clicando no link
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')

    })
    
  

  })


  
