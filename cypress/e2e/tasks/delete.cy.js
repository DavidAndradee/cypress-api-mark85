describe('DELETE /task/:id', () => {
    beforeEach(function () {
        cy.fixture('tasks/delete').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('remove a task', function () {
        const { user, tasks } = this.tasks.remove // puxando os dados do json com o cy.fixture
        cy.task('removeTask', tasks.name, user.email) //chamada de delete de task no mongoDB  
        cy.task('removeUser', user.email) // chcamda para delete do usuário no mongoDB
        cy.postUser(user) // criação de um novo usuário

        cy.postSession(user).then(respUser => { // loign do usuário 
            //criação de uma nova task passando os dados do json
            cy.postTask(tasks, respUser.body.token).then(taskResp => {
                // delete da task , limpando massa de testes
                cy.deleteTask(taskResp.body._id, respUser.body.token).then(response => {
                    expect(response.status).to.eq(204)
                })
            })
        })
    });

    // verificação de tentar deletar task não existente
    it('task not found', function () {
        const { user, tasks } = this.tasks.not_found
        cy.task('removeTask', tasks.name, user.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user).then(respUser => {
            cy.postTask(tasks, respUser.body.token).then(taskResp => {

                cy.deleteTask(taskResp.body._id, respUser.body.token).then(response => {
                    expect(response.status).to.eq(204)
                })
                cy.deleteTask(taskResp.body._id, respUser.body.token).then(response => {
                    expect(response.status).to.eq(404)
                })
            })
        })
    });
})

