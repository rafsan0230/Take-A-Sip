beforeEach(() => {
  cy.visit('/login');
  cy.get('#email').type('test101@gmail.com');
  cy.get('#password').type('1234567');
  cy.get('#submit-btn').click();
});

describe('starting e2e for Login', () => {
  it('User can place order', () => {
    cy.get('.card').eq(0).click();
    cy.contains('MILK').click();
    cy.get('.plus').click();
    cy.contains('ADD TO LIST').click();
    cy.contains(' Order List').click();
    cy.get('.card-container').should('have.length', 1);
    cy.wait(5000);
  });

  it('should place order', () => {});

  // it('Should select the card properly', () => {
  //   cy.wait(5000);
  //   cy.get('.card').click();
  // });
});
