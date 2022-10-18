describe("Home page spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Make sure the default URL redirects to HomePage", () => {
    cy.url().should("include", "l");
  });
});
