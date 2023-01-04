import { describe, expect, it } from "vitest";
import { getHostName } from "@/utils/get-base-url";

describe("getHostName", () => {
  it("should return url without http", function () {
    expect(getHostName("http://localhost:3000")).toEqual("localhost");
  });
  it('should return "league-funny.com"', function () {
    expect(getHostName("https://league-funny.com")).toEqual("league-funny.com");
  });
});
