beforeEach(() => {
  cy.visit('/login');
  cy.get('#email').type('jdoe@gmail.com');
  cy.get('#password').type('asdfqwer');
  cy.get('#submit-btn').click();
});

describe('starting e2e for ordering', () => { 
  it('Admin can view the latest order', () => {
  })
})