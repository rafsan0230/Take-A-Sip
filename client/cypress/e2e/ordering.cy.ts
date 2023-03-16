beforeEach(() => {
  cy.visit('/login');
  cy.get('#email').type('test101@gmail.com');
  cy.get('#password').type('1234567');
  cy.get('#submit-btn').click();
});

describe('starting e2e for ordering', () => {
  it('User can place order', () => {
    cy.get('.card').eq(0).click();
    cy.contains('MILK').click();
    cy.get('.plus').click();
    cy.contains('ADD TO LIST').click();
    cy.contains(' Order List').click();
    cy.get('.card-container').should('have.length', 1);
    cy.get('.order-btn').click();
    cy.wait(3000);
    cy.url().should('contain', '/order');
    cy.get('#room').type('Room 505');
    cy.get('.select-section').select(1).invoke('val').should('eq', 'CLIENT');
    cy.get('#submit-btn').click();
    cy.get('#yes-btn').click();
    cy.url().should('contain', '/home');
  });
});
