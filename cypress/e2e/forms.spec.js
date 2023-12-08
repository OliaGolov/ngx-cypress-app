/// <reference types="cypress"/>

describe('Main menu', () => {

     it('dropdown list', () => {
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

    it('Tooltip tests', () => {
        cy.visit("/")
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();
        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only('Smart table confirmation box when deleting an item', () => {
        cy.visit("/")
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();
        //cy.get('tbody tr').first().find('.nb-trash').click()
        //cy.on('window:confirm', (confirm) => {
        //      expect(confirm).to.equal('Are you sure you want to delete?');
        // })
        // or usning stub
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
        //cancel confirm
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
    })
})
