/// <reference types="cypress" />

describe('tarefas', () => {

    let massas;

    before(()=>{
        cy.fixture('tasks').then(t =>{
            massas = t
        })
    })

    context('cadastro', ()=>{

        it('Cadastrar nova tarefa', () => {
        
            const task = massas.comprar
    
            cy.removerTarefa(task.name)
            cy.criarTarefa(task.name)
    
            cy.contains('main div p', task.name)
                .should('be.visible')
        })
    
        it('Validar cadastro de tarefa duplicado', () =>{
    
            const task = massas.duplicada
    
            cy.removerTarefa(task.name)
            cy.criarTarefaAPI(task)
            cy.criarTarefa(task.name)
    
            cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
        })
    
        it('Campo obrigatorio', () =>{
            cy.criarTarefa()
            cy.campoObrigatorio('This is a required field')
        })
    })

    context('atualização',()=>{

        it('Concluir tarefa', ()=>{

            const task = massas.comprar

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()
            
            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('exclusão',()=>{

        it('Excluir tarefa', ()=>{

            const task = massas.comprar

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()
            
            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})