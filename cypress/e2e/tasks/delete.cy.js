describe('DELETE /task/:id', () => {
    beforeEach(function () {
        cy.fixture('tasks/delete').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('remove a task', function () {
        const { user, tasks } = this.tasks.remove
        cy.task('removeTask', tasks.name, user.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user).then(respUser => {

            cy.postTask(tasks, respUser.body.token).then(taskResp => {

                cy.deleteTask(taskResp.body._id, respUser.body.token).then(response => {
                    expect(response.status).to.eq(204)
                })

            })

        })
    });


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

