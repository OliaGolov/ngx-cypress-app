/// <reference types="cypress"/>

describe('Main menu', () => {
     it.only('dropdown list', () => {
        cy.visit("/");
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        //
        cy.get('nav nb-select').then( dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each( listItem => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                cy.wrap(dropDown).click()
            })
            })
        })

    it.only('Table tests')
})
