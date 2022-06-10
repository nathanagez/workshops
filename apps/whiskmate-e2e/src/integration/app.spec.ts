describe('whiskmate', () => {
  beforeEach(() => cy.visit('/'));

  it('should add recipe to meals', () => {
    cy.get('input').eq(0).type('eggs');
    cy.get('button').click();
    cy.contains('Meals').click();
    cy.get('body').should('contain', 'Braised eggs');
  });
});
