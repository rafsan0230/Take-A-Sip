before(() => { 
 cy.visit('/login');
 cy.get('#email').type('test101@gmail.com');
 cy.get('#password').type('1234567');
 cy.get('#submit-btn').click();
})

describe('starting e2e for Login', () => {
  beforeEach(() => {
   
  });
  it('has the correct title', () => {
    cy.title().should('equal', 'TakeASip');
  });

  it('should place order', () => {
   
    
  });

  // it('Should select the card properly', () => {
  //   cy.wait(5000);
  //   cy.get('.card').click();
  // });
});

