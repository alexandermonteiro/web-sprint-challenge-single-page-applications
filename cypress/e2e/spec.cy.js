describe("empty spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });

  it("sanity check", () => {
    expect(7 + 11).to.equal(18);
  });

  describe("Home Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
    it(" can visit the home page and has link to order form", () => {
      cy.contains("Welcome to Lambda Eats!");
      cy.get(`#order-pizza`).click();
    });
  });

  describe("Pizza Form", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/pizza");
    });
    it(" can visit the order-form page", () => {
      cy.contains("Build Your Own Pizza");
    });
    it("makes sure you can add name to text input", () => {
      cy.get("input[name=person]").type("Alex").should("have.value", "Alex");

      // cy.get('input[name=specialInstructions]')
      // .type('testing')
      // .should('have.value', 'testing')
    });
    it(`has validation for #name-input with error message "name must be at least 2 characters"`, () => {
      cy.get("input[name=person]").type("A");
      cy.contains("name must be at least 2 characters");
    });
  });
});
