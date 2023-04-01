beforeEach(() => {
  // cy.visit('/login');
  // cy.get('#email').type('test101@gmail.com');
  // cy.get('#password').type('1234567');
  // cy.get('#submit-btn').click();

  // cy.get('.card').eq(0).click();
  // cy.contains('MILK').click();
  // cy.get('.plus').click();
  // cy.contains('ADD TO LIST').click();
  // cy.contains(' Order List').click();
  // cy.get('.card-container').should('have.length', 1);
  // cy.get('.order-btn').click();
  // cy.wait(3000);
  // cy.url().should('contain', '/order');
  // cy.get('#room').type('Room 505');
  // cy.get('.select-section').select(1).invoke('val').should('eq', 'CLIENT');
  // cy.get('#submit-btn').click();
  // cy.get('#yes-btn').click();
  // cy.url().should('contain', '/home');

  // cy.get('.sidebar-close').click();
  // cy.get('.logout').click();

  cy.visit('/login');
  cy.get('#email').type('jdoe@gmail.com');
  cy.get('#password').type('asdfqwer');
  cy.get('#submit-btn').click();
});

describe('starting e2e for ordering', () => {
  // it('Admin can view the latest order', () => {
  //   cy.get('.orders-list')
  //     .get('div')
  //     .eq(0)
  //     .get('.example-card')
  //     .get('.card-header')
  //     .get('mat-card-title-group')
  //     .get('mat-card-title')
  //     .should('include.text', 'Nafiz Rafsan');
  //   cy.get(
  //     ':nth-child(2) > .mat-mdc-card > .mat-mdc-card-header > .mat-mdc-card-title-group > div > .mat-mdc-card-subtitle'
  //   ).should('contain', 'Room 505');
  //   cy.get(
  //     ':nth-child(2) > .mat-mdc-card > .mat-mdc-card-content > .mat-mdc-list > .mat-mdc-list-item > .mdc-list-item__content > .mat-mdc-list-item-title'
  //   ).should('contain', 'MILK');
  // });

  it('Admin can drag the latest order to In progress and then to Ready', () => {
    // cy.get('.cdk-drag').eq(0).drag('.in-progress-list');
    // const dataTransfer = new DataTransfer();
    // cy.get('.orders-list')
    //   .get('.cdk-drag')
    //   .eq(0)
    //   .trigger('dragstart', { dataTransfer });
    // cy.get('.in-progress-list').trigger('drop', {
    //   dataTransfer,
    // });

    cy.get('.orders-list').get('.cdk-drag').eq(0).get(0).getBounding;
  });
});
