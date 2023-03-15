beforeEach(() => {
  cy.visit('/login');
});

describe('Login page', () => {
  it('Should successfully login', () => {
    cy.get('#email').type('test101@gmail.com');
    cy.get('#password').type('1234567');
    cy.get('#submit-btn').click();
    cy.url().should('contain', '/home');
  });
  it('Should show error message', () => {
    cy.get('#email').type('test101@gmail.com');
    cy.get('#password').type('1234567s');
    cy.get('#submit-btn').click();
    cy.get('.form-err-msg').should('contain', 'Incorrect credentials.');
  });
});
