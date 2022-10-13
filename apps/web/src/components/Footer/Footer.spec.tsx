import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("renders", () => {
    render(<Footer />);
    expect(screen.getByText(/遊戲大亂鬥/i)).toBeDefined();
  });
});
