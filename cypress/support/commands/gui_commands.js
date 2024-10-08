Cypress.Commands.add('login', (email, password) => {
    
    cy.visit("http://localhost:3000/")
    cy.get(':nth-child(3) > [data-testid="input-container"]').type(email)
    cy.get(':nth-child(4) > [data-testid="input-container"]').type(password)
    cy.get('.sc-Axmtr').click()
    cy.get('.top').contains('Minhas tarefas')
})
Cypress.Commands.add('invalidSession', (email, password) => {
    
    cy.visit("http://localhost:3000/")
    cy.get(':nth-child(3) > [data-testid="input-container"]').type(email)
    cy.get(':nth-child(4) > [data-testid="input-container"]').type(password)
    cy.get('.sc-Axmtr').click()
    cy.get('.notice').contains("Ocorreu um erro ao fazer login, verifique suas credenciais.")
})

Cypress.Commands.add('create', (name, email, password) =>{
    cy.visit("http://localhost:3000/")
    cy.get('a').should('have.text','Criar conta').click()
    cy.get(':nth-child(3) > [data-testid="input-container"]').type(name)
    cy.get(':nth-child(4) > [data-testid="input-container"]').type(email)
    cy.get(':nth-child(5) > [data-testid="input-container"]').type(password)
    cy.get('.sc-Axmtr').should('have.text','Cadastrar').click()
    cy.get('.notice').contains('Boas vindas ao Mark85, o seu gerenciador de tarefas.')
    cy.get('a').should('have.text','Voltar para login').click()
})