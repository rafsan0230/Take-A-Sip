describe('Starting e2e', () => {
  beforeEach(() => {
    cy.visit('/register');
  });
  it('has the correct title', () => {
    cy.title().should('equal', 'TakeASip');
  });

  //success scenario
  it('Should register and add basic info form', () => {
    cy.get('#firstName').type('Nafiz');
    cy.get('#lastName').type('Rafsan');
    cy.get('#designation').type('Junior Software Engineer');

    cy.get('#email').type('test101@gmail.com');
    cy.get('#password').type('1234567');
    cy.get('#confirmPassword').type('1234567');
    cy.get('#submit-btn').click();
    cy.url().should('contain', '/home');
    cy.wait(2000);
    cy.get('#logout').click();
  });

  // failure scenario
  it('Should give error if the user is already registered', () => {
    cy.get;
    cy.get('#firstName').type('Nafiz');
    cy.get('#lastName').type('Rafsan');
    cy.get('#designation').type('Junior Software Engineer');

    cy.get('#email').type('test101@gmail.com');
    cy.get('#password').type('1234567');
    cy.get('#confirmPassword').type('1234567');
    cy.get('#submit-btn').click();
    cy.get('.form-err-msg').should(
      'contain',
      'Account with given email exists.'
    );
  });
});
