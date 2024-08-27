
describe('PUT /task/:id/done', () => {
    beforeEach(function () {
        cy.fixture('tasks/put').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('update task to done', function () {
        const { user, tasks } = this.tasks.update
        cy.task('removeTask', tasks.name, user.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user).then(respUser => {

            cy.postTask(tasks, respUser.body.token).then(taskResp => {

                cy.putTaskDone(taskResp.body._id, respUser.body.token).then(response => {
                    expect(response.status).to.eq(204)
                })
                cy.getUniqueTask(taskResp.body._id, respUser.body.token).then(response => {
                    expect(response.body.is_done).to.be.true
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
                cy.putTaskDone(taskResp.body._id, respUser.body.token).then(response => {
                    expect(response.status).to.eq(404)
                })

            })

        })
    });
})

