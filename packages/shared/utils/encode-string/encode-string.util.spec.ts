import { describe, expect, it } from "vitest";
import encodeString from "./encode-string.util";

describe("encodeString", () => {
  it("should encode a string", () => {
    expect(encodeString("test")).toEqual("test");
  });
  it("should return example%20post%202", function () {
    expect(encodeString("example post 2")).toEqual("example%20post%202");
  });
  it("should return Example", function () {
    expect(encodeString("Example")).toEqual("Example");
  });
});
