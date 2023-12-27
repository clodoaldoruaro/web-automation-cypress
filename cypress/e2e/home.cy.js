/// <reference types="cypress" />

describe('empty spec', () => {
  it('App deve estar on', () => {
    cy.visit('/')
    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
})