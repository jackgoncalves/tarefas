/// <reference types="Cypress" />
describe('Tarefas', () => { 
    it('Cadastrar uma nova tarefa', () => {
        const nomeTarefa = 'Finalizar Curso'

        cy.deletarTarefaNomeAPI(nomeTarefa)
        cy.criarTarefa(nomeTarefa)

        cy.contains('[data-testid="task-item"]', nomeTarefa)
            .should('be.visible')
    })
    it('Não deve permitir tarefas repetidas', () => {
        const tarefa = {
            name: 'Estudar Cypress',
            is_done: false
        }

        cy.deletarTarefaNomeAPI(tarefa.name)
        cy.criarTarefaAPI(tarefa)
        cy.criarTarefa(tarefa.name)

        cy.get('#swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })
    it('Campo obrigatório', () => {
        cy.criarTarefa()
        cy.validaMensagemCampo('This is a required field') 
    })
    it('Concluir tarefa', () => {
        const nomeTarefa = {
            name: 'Ler um livro',
            is_done: false
        } 

        cy.deletarTarefaNomeAPI(nomeTarefa.name)
        cy.criarTarefaAPI(nomeTarefa)
        cy.visit('/')

        cy.contains('p', nomeTarefa.name)
            .parent()
            .find('button[class*=ItemToggle]')
            .click()

        cy.contains('p', nomeTarefa.name)
            .should('have.css', 'text-decoration-line', 'line-through')
    })
    it('Excluir tarefa', () => {

        const nomeTarefa = {
            name: 'Estudar!',
            is_done: false
        } 

        cy.deletarTarefaNomeAPI(nomeTarefa.name)
        cy.criarTarefaAPI(nomeTarefa)
        cy.visit('/')

        cy.contains('p', nomeTarefa.name)
            .parent()
            .find('button[class*=ItemDelete]')
            .click()

        cy.contains('p', nomeTarefa.name)
            .should('not.exist')
    })
})

