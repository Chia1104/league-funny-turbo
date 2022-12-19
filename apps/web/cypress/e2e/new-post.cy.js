describe("New Post page spec", () => {
  beforeEach(() => {
    cy.visit("/new-post");
  });
  it("New Post should return 200", () => {
    cy.request("/new-post").then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it("Make sure redirect to LoginPage when user is not logged in", () => {
    cy.location("pathname").should("eq", "/login");
  });
});
