describe("New Post page spec", () => {
  beforeEach(() => {
    cy.visit("/new-post");
  });
  it("Make sure redirect to HomePage when user is not logged in", () => {
    cy.location("pathname").should("eq", "/b");
  });
});
