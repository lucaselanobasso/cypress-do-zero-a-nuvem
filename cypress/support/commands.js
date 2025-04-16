Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user = {
    firstName: 'Lucas',
    lastName: 'Souza',
    email: 'lucas@gmail.com',
    text: 'cwnionwindfnw'

})=>{

    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#email').type(user.email);
    cy.get('#open-text-area').type(user.text);

    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible');
})