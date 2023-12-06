/// <reference types="cypress"/>

import { DateGenerator } from "../helpers/dateGenertator";

 
describe("Login page test suite", () => {
  it("first test", () => {
    //attr
    cy.get("[attr]");
    // attr and value
    cy.get('[attr="value"]');
    //entire class value
    cy.get('[class="col-md-12 col-lg-12 col-xxxl-12"]');
    //teo attr
    cy.get("[attr1][attr2]");
    //tag, attr, id, class - chain
    cy.get('indut[attr="value"]#inputEmail.input-full-width');

    //get() find element by locator on ENTIRE page
    //find() - find child by locator
    //contains() - find html text, text and locator
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    cy.get("#inputEmail3").parents("form").find("nb-checkbox").click();
  });

  it("login page has email and password labels", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    // 1 Cypress Alias, (cannot assing values to variables)
    cy.contains("nb-card", "Using the Grid").as("usingGrid");
    cy.get("@usingGrid").find('[for="inputEmail1"]').should("contain", "Email");

    // 2 Cypress then() method
    cy.contains("nb-card", "Using the Grid").then((usingGridFrom) => {
      cy.wrap(usingGridFrom)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
    });
  });

  it('input fileds have text "Email address" and "Password"', () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");
    //2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      //using cypress
      cy.wrap(labelText).should("contain", "Email address");
    });
    //3 invoke
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });
    //OR
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .as("labelText")
      .should("contain", "Email address");
    //4 invoke attr
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });
    //5 invoke property
    cy.get("#exampleInputEmail1").type("test@test.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@test.com")
      .then((property) => {
        // use that property
        console.log(property);
      });
  });

  it("check radio buttons", () => {
    //check for input type with radio or checkbox
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    cy.getByData("imputEmail1")
      .parents("form")
      .find('[type="radio"]')
      .then((radioButtons) => {
        // {force: true} make element visible
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(1).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("check checkboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').uncheck({ force: true });
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
  });

  it("date picker", () => {

    function selectDayFronCurrent(futureDay) {
        let date = new Date();
        date.setDate(date.getDate() + futureDay);
        let month = date.toLocaleString("default", { month: "short" });
        let day = date.getDate()
        let year = date.getFullYear();
        let dateToAssert = `${month} ${day}, ${year}`
        cy.get('nb-calendar-navigation').invoke("attr", "ng-reflect-date").then( dateArrtibute => {
            if(!dateArrtibute.includes(month) || !dateArrtibute.includes(year)){
                cy.get('[data-name="chevron-right"]').click()
                selectDayFronCurrent(futureDay)
            } else {
                cy.get(".day-cell").not(".bounding-month").contains(day).click();
            }
        })
        return dateToAssert
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
    cy.contains("nb-card", "Common Datepicker").find("input").then((input) => {
        cy.wrap(input).click();
        const dateToAssert = selectDayFronCurrent(40)
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        //OR
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });
});
