describe('Favored new', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', pathname: '/favored' },
      { fixture: 'list' },
    ).as('favored-list');

    cy.visit('/new');
  });

  it('should save items', () => {
    cy.intercept({ method: 'POST', pathname: '/favored' }, { body: '' }).as(
      'favored-edit',
    );

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

    cy.location('pathname').should('eq', '/');

    cy.wait('@favored-list');
  });

  it('should show errors', () => {
    cy.intercept(
      { method: 'POST', pathname: '/favored' },
      {
        statusCode: 422,
        body: {
          statusCode: 422,
          message: [
            'name should not be empty',
            'cpf_cnpj should not be empty',
            'email should not be empty',
            'agency should not be empty',
            'agency must match /^(?:^0*)[1-9][0-9]{0,3}$/ regular expression',
            'bankAccount should not be empty',
            'bankAccountDigit should not be empty',
          ],
          error: 'Unprocessable Entity',
        },
      },
    ).as('favored-edit');

    cy.contains('Salvar').click();

    cy.wait('@favored-edit');

    cy.contains('name should not be empty').should('exist');
    cy.contains('cpf_cnpj should not be empty').should('exist');
    cy.contains('email should not be empty').should('exist');
    cy.contains('agency should not be empty').should('exist');
    cy.contains('bankAccount should not be empty').should('exist');
    cy.contains('bankAccountDigit should not be empty').should('exist');
  });
});
