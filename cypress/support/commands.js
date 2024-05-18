Cypress.Commands.add('criarTarefa', (nomeTarefa = '') => {
    cy.visit('/')

    if (nomeTarefa !== '') {
        cy.get('#newTask').type(nomeTarefa)
    }

    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('validaMensagemCampo', (mensagemCampo) => {
    cy.get('#newTask')
        .invoke('prop', 'validationMessage')
        .should((mensagem) => {
            expect(mensagemCampo).to.eq(mensagem)
        })
})

Cypress.Commands.add('deletarTarefaNomeAPI', (nomeTarefa) => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/helper/tasks`,
    
        body: {
            name: nomeTarefa
        }
    }).then((resposta) => {
        expect(resposta.status).to.eq(204)
    })
})

Cypress.Commands.add('criarTarefaAPI', (tarefa) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/tasks`,
        
        body:
            tarefa

    }).then((resposta) => {
        expect(resposta.status).to.eq(201)
    })
})