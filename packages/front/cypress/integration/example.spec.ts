describe('Example', () => {
  it('show initial page', () => {
    cy.visit('/');

    cy.contains('Learn React');
  });
});
