// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cria tarefa via tela
Cypress.Commands.add('criarTarefa', (taskName = '')=> {
    
    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')
    
    if (taskName !== ''){
        cy.get('@inputTask').type(taskName)
    }
    
    cy.contains('button', 'Create').click()
})

// Deleta tarefa na base via API
Cypress.Commands.add('removerTarefa', (taskName)=>{
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: {name: taskName}
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

// Cria tarefa na base via API
Cypress.Commands.add('criarTarefaAPI', (task) =>{
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: {name: task.name, is_done: false}
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

// Valida mensagem campo obrigatório
Cypress.Commands.add('campoObrigatorio', (message) =>{
    cy.get('@inputTask')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(message).to.eq(text)
        })
})