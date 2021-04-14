describe('Favored edit', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', pathname: '/favored' },
      { fixture: 'list' },
    ).as('favored-list');
    cy.intercept({ method: 'POST', pathname: '/favored' }, { body: '' }).as(
      'favored-edit',
    );
    cy.intercept('bank', { fixture: 'banks' });
    cy.intercept('bank/account-types', { fixture: 'account-types' });
    cy.visit('/');
  });

  it('should edit non draft item', () => {
    cy.wait('@favored-list');

    cy.contains('Mrs. Salvatore Keebler').click();

    cy.get('#favored-edit-modal')
      .should('exist')
      .should('contain.text', 'Mrs. Salvatore Keebler')
      .should('contain.text', 'Validado')
      .should('contain.text', '052.961.628-74')
      .should('contain.text', 'Bradesco')
      .should('contain.text', '2150-4')
      .should('contain.text', 'CONTA_POUPANCA')
      .should('contain.text', '404343-4');

    cy.get('#favored-email').clear().type('user@email.com');

    cy.contains('Salvar').click();

    cy.wait('@favored-edit')
      .its('request.body')
      .should('include', { email: 'user@email.com' });

    cy.get('#favored-edit-modal').should('not.exist');

    cy.contains('Favorecido salvo').should('exist');

    cy.wait('@favored-list');
  });

  it('should edit draft item', () => {
    cy.wait('@favored-list');

    cy.contains('Gordon Jaskolski').click();

    cy.get('#favored-edit-modal').should('exist');

    cy.get('#favored-name').clear().type('Some name');
    cy.get('#favored-cpf').clear().type('000.00');
    cy.get('#favored-email').clear().type('user@email.com');
    cy.get('#favored-bank').clear().type('Sicoob').type('{enter}');
    cy.contains('Sicoob').click();
    cy.get('#favored-agency').clear().type('0000');
    cy.get('#favored-agency-digit').clear().type('0');
    cy.get('#favored-account-type').clear().type('Poupança');
    cy.contains('Conta Poupanca').click();
    cy.get('#favored-account').clear().type('000000');
    cy.get('#favored-account-digit').clear().type('0');

    cy.contains('Salvar').click();

    cy.wait('@favored-edit')
      .its('request.body')
      .should('deep.include', {
        id: '1258792a-1b68-4e40-800c-f07e4ec053cc',
        name: 'Some name',
        cpf_cnpj: '000.00',
        email: 'user@email.com',
        bank: {
          code: '756',
          name: 'Sicoob',
          icon:
            'https://pbs.twimg.com/profile_images/1096046807824646144/JKE5Mlhu.png',
        },
        agency: '0000',
        agencyDigit: '0',
        bankAccountType: 'CONTA_POUPANCA',
        bankAccount: '000000',
        bankAccountDigit: '0',
      });

    cy.get('#favored-edit-modal').should('not.exist');

    cy.contains('Favorecido salvo').should('exist');

    cy.wait('@favored-list');
  });
});
