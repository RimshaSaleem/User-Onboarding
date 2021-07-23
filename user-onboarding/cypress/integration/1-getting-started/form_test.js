describe("Testing Form Inputs", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
    it("Inputs values", function () {
      cy.get("[data-cy=name]")
        .type("Rimsha Saleem")
        .should("have.value", "Rimsha Saleem");
    
    
      cy.get("[data-cy=email]")
        .type("rimsha@gmail.com")
        .should("have.value", "rimsha@gmail.com");
    
      cy.get("[data-cy=password]")
        .type("mypassword")
        .should("have.value", "mypassword");
      cy.get("[data-cy=checkbox]").check().should("be.checked");
      cy.get("[data-cy=submit]").click();
    });
    it("Inputs", function () {
      cy.get("[data-cy=name]")
        .type("Rimsha Saleem")
        .should("have.value", "Rimsha Saleem");
      cy.get("[data-cy=email]")
        .type("rimsha@gmail.com")
        .should("have.value", "rimsha@gmail.com");
      cy.get("[data-cy=password]")
        .type("mypassword")
        .should("have.value", "mypassword");
      cy.get("[data-cy=checkbox]").check().should("be.checked");
      cy.get("[data-cy=submit]").click();
    });
   });