describe('GET /tasks', () => {
    //utilizar de dados do json ocultando dados no corpo de teste
    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    })
    //acessar tasks de acordo com o usuário
    it('get my task', function () { // utilizando FUNCTION ao invés de callback ou função seta

        const { user, tasks } = this.tasks.list; //criando constantes para acessar os dados de user e tasks no json

        cy.task('removeTasksLike', 'V&r') //chamada de delete nas tasks que possuem a string 'V&r' 

        cy.task('removeUser', user.email) //chamada de delete no usuário de acordo com email da massa de testes, evitando conflito
        cy.postUser(user) // criação de um novo usuário com a massa de teste do json
        cy.postSession(user).then(respUser => { // chamada de login com os dados de usuário do json

            tasks.forEach(function (t) { //lop de repetição para percorrer o array de tasks
                cy.postTask(t, respUser.body.token) // criação das tasks na aplicação com base nos dados do json
            })
            //chamada get na api para acessar as tasks criadas anteriormente
            cy.getTasks(respUser.body.token).then(response => {
                expect(response.status).to.eq(200)
            }).its('body').should('be.an', 'array').and('have.length', tasks.length) //verificação se é de fato um array e seu tamanho
        })

    });
})

describe('GET /task/:id', () => {
    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('get unique task', function () {
        const { user, tasks } = this.tasks.unique
        cy.task('removeTask', tasks.name, user.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user).then(respUser => {

            cy.postTask(tasks, respUser.body.token).then(taskResp => {

                cy.getUniqueTask(taskResp.body._id, respUser.body.token).then(response => {
                    expect(response.status).to.eq(200)
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
                cy.getUniqueTask(taskResp.body._id, respUser.body.token).then(response => {
                    expect(response.status).to.eq(404)
                })

            })

        })
    });
})

