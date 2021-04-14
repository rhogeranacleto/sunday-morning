describe('Favored list', () => {
  beforeEach(() => {
    cy.intercept({ pathname: '/favored' }, { fixture: 'list' }).as(
      'favored-list',
    );

    cy.visit('/');
  });

  it('should show initial list', () => {
    cy.wait('@favored-list')
      .its('request.url')
      .should(
        'contains',
        new URLSearchParams({
          skip: '0',
          take: '10',
          search: '',
        }).toString(),
      );

    cy.get('.data-container [role="row"]')
      .should('have.length', 10)
      .eq(0)
      .children()
      .within(() => {
        cy.root().eq(1).should('have.text', "Pat O'Connell");
        cy.root().eq(2).should('have.text', '103.730.691-08');
        cy.root().eq(4).should('have.text', '9577');
        cy.root().eq(5).should('have.text', '881919-7');
        cy.root().eq(6).should('contain.text', 'Rascunho');
      });

    cy.get('.data-container [role="row"]')
      .should('have.length', 10)
      .eq(2)
      .children()
      .eq(6)
      .should('contain.text', 'Validado');

    cy.get('[title="Next page"]').click();

    cy.wait('@favored-list')
      .its('request.url')
      .should(
        'contains',
        new URLSearchParams({
          skip: '10',
          take: '10',
          search: '',
        }).toString(),
      );
  });

  it('should search change query params', () => {
    cy.wait('@favored-list');

    cy.get('#favored-search').type('9577');

    cy.wait('@favored-list')
      .its('request.url')
      .should(
        'contains',
        new URLSearchParams({
          search: '9577',
        }).toString(),
      );
  });

  it('should add button redirect to /new', () => {
    cy.get('[href="/new"]').click();

    cy.location('pathname').should('eq', '/new');
  });
});
