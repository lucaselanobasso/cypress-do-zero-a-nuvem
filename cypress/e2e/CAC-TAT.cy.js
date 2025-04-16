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
    cy.get('#phone-checkbox').click();
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

it.only('seleciona um produto (Blog) por seu índice', ()=>{
  cy.get('#product').select(1);
  cy.get('#product').should('have.value', 'blog')
})
})