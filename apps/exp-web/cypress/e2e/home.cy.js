describe("Home page spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Home page should return 200", () => {
    cy.request("/").then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
