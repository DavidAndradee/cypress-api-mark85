//limpar as mensagens na fila
Cypress.Commands.add('purgeQueueMessages', () => {
    cy.api({
        url: Cypress.env('amqpHost') + '/tasks/contents',
        method: 'DELETE',
        body: {
            vhost: 'ffwcjtyy',
            name: Cypress.env('amqpQueue'),
            mode: 'purge'
        },
        headers: {
            authorization: Cypress.env('amqpToken')
        },
        failOnStatusCode: false
    }).then(response => { return response })
})
//acessar fila de mansagens
Cypress.Commands.add('getMessageQueue', ()=>{
    cy.api({
        url: Cypress.env('amqpHost') + '/tasks/contents'+'/tasks/get',
        method: 'POST',
        body: {
            vhost: 'ffwcjtyy',
            name: Cypress.env('amqpQueue'),
            truncate: '50000',
            ackmode: 'ack_requeue_true',
            encoding: 'auto',
            count: '1'
        },
        headers: {
            authorization: Cypress.env('amqpToken')
        },
        failOnStatusCode: false
    }).then(response => { return response })
})