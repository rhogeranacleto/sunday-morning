describe('Favored delete', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', pathname: '/favored' },
      { fixture: 'list' },
    ).as('favored-list');

    cy.intercept({ method: 'DELETE', pathname: '/favored' }).as(
      'delete-favored',
    );

    cy.visit('/');
  });

  context('when select item at list', () => {
    it('show delete dialog when click at delete button', () => {
      cy.wait('@favored-list');

      cy.contains('Excluir selecionados').should('be.disabled');

      cy.get('.data-container [role="row"]').within(() => {
        cy.root().eq(0).find('input[type="checkbox"]').check();
        cy.root().eq(3).find('input[type="checkbox"]').check();
      });

      cy.contains('Excluir selecionados').should('be.enabled').click();

      cy.get('[role="dialog"]').should('exist');

      cy.contains('Confirmar exclusão').click();

      cy.wait('@delete-favored')
        .its('request.body')
        .should('deep.equal', {
          ids: [
            '2f1908a0-1da9-46ab-b470-00695c6097cd',
            '4b3e454c-01f4-4560-8020-a2c93e5fd530',
          ],
        });

      cy.wait('@favored-list');

      cy.contains('Favorecido removido!').should('exist');
    });
  });

  context('when click at draf item', () => {
    it('show delete dialog when click at delete button', () => {
      cy.wait('@favored-list');

      cy.contains("Pat O'Connell").click();

      cy.get('#favored-remove').click();

      cy.get('[role="dialog"]').should('exist');

      cy.contains('Confirmar exclusão').click();

      cy.wait('@delete-favored')
        .its('request.body')
        .should('deep.equal', {
          ids: ['2f1908a0-1da9-46ab-b470-00695c6097cd'],
        });

      cy.wait('@favored-list');

      cy.contains('Favorecido excluído!').should('exist');
    });
  });

  context('when click at non draft item', () => {
    it('show delete dialog when click at delete button', () => {
      cy.wait('@favored-list');

      cy.contains('Mrs. Salvatore Keebler').click();

      cy.get('#favored-remove').click();

      cy.get('[role="dialog"]').should('exist');

      cy.contains('Confirmar exclusão').click();

      cy.wait('@delete-favored')
        .its('request.body')
        .should('deep.equal', {
          ids: ['1c9a365a-4d40-42ed-854e-1cbb92a9cbbe'],
        });

      cy.wait('@favored-list');

      cy.contains('Favorecido excluído!').should('exist');
    });
  });
});
