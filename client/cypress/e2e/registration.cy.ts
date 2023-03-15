describe('Starting e2e', () => {
  beforeEach(() => {
    cy.visit('/register');
  });
  it('has the correct title', () => {
    cy.title().should('equal', 'TakeASip');
  });

  it('Should register and add basic info form', () => {
    cy.get('#firstName').type('Nafiz');
    cy.get('#lastName').type('Rafsan');
    cy.get('#designation').type('Junior Software Engineer');

    cy.get('#email').type('test101@gmail.com');
    cy.get('#password').type('1234567');
    cy.get('#confirmPassword').type('1234567');
    cy.get('#submit-btn').click();
    // cy.visit('/home');
  });
});
