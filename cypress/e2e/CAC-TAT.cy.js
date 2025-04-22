describe('Central de Atendimento ao Cliente TAT', () => {


  beforeEach(() => {
    cy.visit("./src/index.html");
  })


  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })

  it('preenche os campos obrigatórios e envia o formulário.', ()=>{
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    cy.get('#firstName').type('João');
    cy.get('#lastName').type('Castro');
    cy.get('#email').type('joaocastro@email.com');
    cy.get('#open-text-area').type(longText,{delay : 0} );
    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('João');
    cy.get('#lastName').type('Castro');
    cy.get('#email').type('joaocastroemail.com');
    cy.get('#open-text-area').type('Texto texto Texto texto Texto texto Texto texto Texto texto Texto texto ');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
  })

  it('se um valor não-numérico for digitado, seu valor continuará vazio.', () => {
    cy.get('#phone')
        .type('teste')
          .should('have.value', '')

    cy.get('button[type="submit"]').click();
  })


  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#firstName').type('João');
    cy.get('#lastName').type('Castro');
    cy.get('#email').type('joaocastro@email.com');
    cy.get('#phone-checkbox').check();
    cy.get('#open-text-area').type('Texto texto Texto texto Texto texto Texto texto Texto texto Texto texto ');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
  })


  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Castro')
      .should('have.value', 'Castro')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('joaocastro@email.com')
      .should('have.value', 'joaocastro@email.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('4817728833')
      .should('have.value', '4817728833')
      .clear()
      .should('have.value', '')
      
  })


  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', ()=>{
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
  })

  it('envia o formuário com sucesso usando um comando customizado', ()=>{

    cy.fillMandatoryFieldsAndSubmit();


    cy.get('.success').should('be.visible');
  })
  
it('identificando elementos com contain', ()=>{
  cy.get('#firstName').type('João');
  cy.get('#lastName').type('Castro');
  cy.get('#email').type('joaocastro@email.com');
  cy.get('#open-text-area').type('oioioioioioioioi');
  cy.contains('button', 'Enviar').click();
  cy.get('.success').should('be.visible');
})


it('seleciona um produto (Mentoria) por seu valor (value)', ()=>{
  cy.get('#product').select('mentoria');
  cy.get('#product').should('have.value', 'mentoria')
})

it('seleciona um produto (Blog) por seu índice', ()=>{
  cy.get('#product').select(1);
  cy.get('#product').should('have.value', 'blog')
})

//////////////// Marcando inputs do tipo radio

it('marca o tipo de atendimento "Feedback"', ()=>{
  cy.get('input[type="radio"][value="feedback"]')
    .check()
      .should('be.checked');
})

it('marca cada tipo de atendimento', ()=>{
  cy.get('input[type="radio"]')
    .each((typeOfService)=>{
      cy.wrap(typeOfService)
        .check()
          .should('be.checked')
    })
})



//////////////// Marcando inputs do tipo checkbox

it('marca ambos checkboxes, depois desmarca o último', ()=>{
  cy.get('input[type="checkbox"]')
      .as('checks')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')   
})


//////////////// Fazendo upload de arquivos com Cypress

it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
  .should( input =>{
      expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo simulando um drag-and-drop', () => {
  cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
      .should(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('example.json').as('simpleFile')
  cy.get('#file-upload').selectFile('@simpleFile')
  .should( input =>{
      expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=> {
  cy.contains('a','Política de Privacidade')
    .should('have.attr', 'target', '_blank')
})


})