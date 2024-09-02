describe('create account', () =>{
    
    beforeEach(()=>{
        cy.fixture('users').then( function(users) {
            this.users = users
        })
    })

    it('successfully created', function() {
        const login = this.users.login
        cy.task('removeUser', login.email)
        cy.create(login.name, login.email, login.password)
        cy.login(login.email, login.password)
    });
})