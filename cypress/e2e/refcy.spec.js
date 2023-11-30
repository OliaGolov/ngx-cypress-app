/// <reference types="cypress"/>

describe('First test suite', () => {

    it('first test', () => {
       //attr
       cy.get('[attr]')
       // attr and value
       cy.get('[attr="value"]')
       //entire class value
       cy.get('[class="col-md-12 col-lg-12 col-xxxl-12"]')
       //teo attr
       cy.get('[attr1][attr2]')
       //tag, attr, id, class - chain
       cy.get('indut[attr="value"]#inputEmail.input-full-width')

       //get() find element by locator on ENTIRE page
       //find() - find child by locator
       //contains() - find html text, text and locator
    })

    it('first test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts'). click()
        cy.get('#inputEmail3')
         .parents('form')
         .find('nb-checkbox')
         .click()
     })
 
     it('second test', () => {
         cy.visit('/')
         cy.contains('Forms').click()
         cy.contains('Form Layouts'). click()
         // 1 Cypress Alias, (cannot assing values to variables)
         cy.contains('nb-card', 'Using the Grid').as('usingGrid')
         cy.get('@usingGrid').find('[for="inputEmail1"]').should('contain', 'Email')

         // 2 Cypress then() method
         cy.contains('nb-card', 'Using the Grid').then( usingGridFrom => {
            cy.wrap(usingGridFrom).find('[for="inputEmail1"]').should('contain', 'Email')
         })

     })

     it.only('extract text values', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts'). click()
         //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
         //2
         cy.get('[for="exampleInputEmail1"]').then( label => {
           const labelText = label.text()
           expect(labelText).to.equal('Email address')
        //using cypress
        cy.wrap(labelText).should('contain', 'Email address')
         })
        //3 invoke
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })
        //OR
        cy.get('[for="exampleInputEmail1"]')
        .invoke('text')
        .as('labelText')
        .should('contain', 'Email address')
        //4 invoke attr
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
            expect(classValue).to.equal('label')
        })
        //5 invoke property
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com')
            .then(property => {
                // use that property
                console.log(property);
                        })
    })

})

