import { describe, expect, it } from "vitest";
import slugFormat from "./slug-format.util";

describe("slugFormat", () => {
  it("should return a slugified string", () => {
    expect(slugFormat("Hello World")).toEqual("hello-world");
  });
});
