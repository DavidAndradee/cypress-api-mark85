describe("login", () => {

    beforeEach(()=>{
        cy.fixture('users').then( function(users) {
            this.users = users
        })
    })

    it('sucessfull login', function() {
        const login = this.users.login
        cy.login(login.email,login.password)
    });

    it('invalid login', function() {    
        const login = this.users.inv_pass
        cy.invalidSession(login.email,login.password)
    });
})