/// <reference types="Cypress" />

  describe('Central de Atendimento ao Cliente TAT', () => {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function () {//primeira coisa que o cod vai fazer é visitar o endereço que passamos
      // beforeEach -> antes de cada teste, faça o comando que está aqui dentro
      cy.visit('src/index.html')/// está acessando um arquivo do computador: dentro de "scr" -> "index.html"
    })
    it('checks the title of the application', () => { 
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 

    })

    it('Fills in the required fields and submits the form', () => { // preenche os campos obrigatórios e envia o formulário
      const longText = 'brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação, brincando de automação,'
      /// variavel que criamos

      cy.clock()

      cy.get('#firstName').type('Lívia')
      cy.get('#lastName').type('Rosa')
      cy.get('#email').type('livia.rosa@gmail.com')// o # na frente significa que é um ID
      cy.get('#open-text-area').type(longText, {delay: 2})
      ///utilizamos a variavel que criamos "longText" e o "delay:2" para controlar o tempo de resultado; podemos colocar qualquer valor ali 
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible') // "." CLASSE

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.success').should('not.be.visible')
    })

    it('Displays an error message when submitting the form with an improperly formatted email', () => { // exibe uma mensagem de erro ao enviar o formulário com um e-mail formatado incorretamente
      cy.clock()
      
      cy.get('#firstName').type('Lívia')
      cy.get('#lastName').type('Rosa')
      cy.get('#email').type('livia.fofa@gmail')
      cy.get('#open-text-area').type('teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.error').should('not.be.visible')
    })

    it('The phone field remains empty when filled with a non-numeric value', () => {//Campo telefonico continua vazio quando preenchido com valor não-númerico
      cy.get('#phone')/// pegar um elemento que tenha o id phone
        .type('abcdefghij') /// tenta digitar no campo um valor não-númerico
        .should('have.value','') /// está verificando se o campo de telefone ainda está vazio ('') após tentar digitar letras nele.
    })

    it('Displays an error message when the phone field becomes mandatory but is not filled before submitting the form', () => { //Exibe mensagem de erro quando o campo telefone se torna obrigatório mas não é preenchido antes do envio do formulário
      cy.get('#firstName').type('Lívia')
      cy.get('#lastName').type('Rosa')
      cy.get('#email').type('livia.rosa@gmail.com')
      cy.get('#open-text-area').type('teste')
      cy.get('#phone-checkbox').check()
      cy.contains('button', 'Enviar').click()
      
      cy.get('.error').should('be.visible') 
    })

    it('Fills and clears the first name, last name, email, and phone fields', () => {//Preenche e limpa os campos nome, sobrenome, e-mail e telefone
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
        .type('livia.rosa@gmail.com')
        .should('have.value', 'livia.rosa@gmail.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('11983288771')
        .should('have.value', '11983288771')
        .clear()
        .should('have.value', '')
    })

    it('Displays an error message when submitting the form without filling in the required fields', () => {//Exibe mensagem de erro ao enviar o formulário sem preencher os campos obrigatórios
      cy.clock()
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible') 

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.error').should('not.be.visible')
    })

    it('Submits the form successfully using a custom command', () => {//Envia o formulário com sucesso usando um comando personalizado
      cy.clock(0)
      cy.fillMandatoryFieldsAndSubmit()// comando costumizados que criamos para preencher os campos obrigatórios e submeter ao formulário 
      cy.get('.success').should('be.visible')// verificar a mensagem de sucesso 

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.success').should('not.be.visible')
    })

    it('Select a product (YouTube) based on its text', () => {//Seleciona um produto (YouTube) por seu texto
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    })

    it('Select a product (Mentoria) based on its value', () => {//Seleciona um produto (Mentoria) por seu valor (value)
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })
      
    it('Select a product (Blog) based on its index', () => {//Seleciona um produto (Blog) por seu índice
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    })

    it('Mark the service type as "Feedback"', () => {//Marca o tipo de atendimento "Feedback"
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')

    })

    it('Mark each type of atendimento', () => {//Marca cada tipo de atendimento
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })

    })

    it('Mark both checkboxes, then uncheck the last one.', () => {//Marca ambos checkboxes, depois desmarca o último
      cy.get('input[type= "checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
      })

    it('Select a file from the fixtures folder',  () => {//Seleciona um arquivo da pasta fixtures
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })

    })

    it('Select a file simulating a drag-and-drop action', () => {// - arrastar o arquivo
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action:'drag-drop'} )
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })

    })

    it('Select a file using a fixture that has been given an alias.', () => {//seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('Verify that the privacy policy opens in another tab without the need for a click', () => {//Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Access the privacy policy page by removing the target and then clicking the link', () => {//Acessa a página da política de privacidade removendo o target e então clicando no link
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')

    })
    
    it('Displays and hides success and error messages using .invoke.', () => {//exibe e esconde as mensagens de sucesso e erro usando o .invoke
      cy.get('.success')///inspecionar 
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')

    })
  
    it('Fill the text area using the invoke command.', () => { ///preencha a área de texto usando o comando invoke
      const longText = Cypress._.repeat('0123456789', 20)// vai repetir esse número por 20x; repeat -> string

      cy.get('#open-text-area')
      .invoke('val', longText)// invoca o valor da área de texto e seta nesse valor o longText
      .should('have.value', longText)
    })

    it.only('Make an HTTP request.', () => {//make an HTTP request
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should((response) => {
            const { status, statusText, body} = response //desestruturou o statusText e o body 
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')// no body inclui o CAC TAT
        })
      })

    it('Find the hidden cat', () => {
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')
      cy.get('#title')
        .invoke('text', 'CAT TAT')
      cy.get('#subtitle')
        .invoke('text', 'Eu adoro gatos')
        .should('be.visible')
    })
  })


  
