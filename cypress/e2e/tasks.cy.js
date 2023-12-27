/// <reference types="cypress" />

describe('tarefas', () => {

    context('cadastro', ()=>{

        it('Cadastrar nova tarefa', () => {
        
            const taskName = 'Comprar Pão'
    
            cy.removerTarefa(taskName)
            cy.criarTarefa(taskName)
    
            cy.contains('main div p', taskName)
                .should('be.visible')
        })
    
        it('Validar cadastro de tarefa duplicado', () =>{
    
            const task = {
                name: 'Tarefa duplicada',
                is_done: false
            }
    
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

            const task = {
                name: 'Comprar Pão',
                is_done: false
            }

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

            const task = {
                name: 'Comprar Pão',
                is_done: false
            }

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