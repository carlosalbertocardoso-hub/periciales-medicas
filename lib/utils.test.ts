import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn()", () => {
  it("combines multiple class strings", () => {
    expect(cn("px-2", "py-4")).toContain("px-2");
    expect(cn("px-2", "py-4")).toContain("py-4");
  });

  it("excludes falsy values (null, undefined, false, empty string)", () => {
    const result = cn("px-2", null, undefined, false, "", "py-4");
    expect(result).toContain("px-2");
    expect(result).toContain("py-4");
    expect(result).not.toContain("null");
    expect(result).not.toContain("undefined");
  });

  it("resolves tailwind conflicts via twMerge (last value wins)", () => {
    // p-2 and p-4 conflict — twMerge keeps only p-4
    const result = cn("p-2", "p-4");
    expect(result).toContain("p-4");
    expect(result).not.toContain("p-2");
  });

  it("resolves multiple conflicting properties", () => {
    // px-2 and px-8 conflict (padding), bg-red-500 and bg-blue-500 conflict (color)
    const result = cn("px-2 bg-red-500", "px-8", "bg-blue-500");
    expect(result).toContain("px-8");
    expect(result).toContain("bg-blue-500");
    expect(result).not.toContain("px-2");
    expect(result).not.toContain("bg-red-500");
  });

  it("accepts array format (clsx support)", () => {
    const result = cn(["px-2", "py-4"], "text-sm");
    expect(result).toContain("px-2");
    expect(result).toContain("py-4");
    expect(result).toContain("text-sm");
  });

  it("accepts object format with boolean values (clsx support)", () => {
    const result = cn({ "px-2": true, "py-4": false, "text-sm": true });
    expect(result).toContain("px-2");
    expect(result).toContain("text-sm");
    expect(result).not.toContain("py-4");
  });

  it("handles mixed array and object formats", () => {
    const result = cn(["px-2"], { "py-4": true, "text-sm": false }, "bg-white");
    expect(result).toContain("px-2");
    expect(result).toContain("py-4");
    expect(result).toContain("bg-white");
    expect(result).not.toContain("text-sm");
  });

  it("returns empty string when called without arguments", () => {
    expect(cn()).toBe("");
  });

  it("returns empty string when given only falsy values", () => {
    expect(cn(null, undefined, false, "")).toBe("");
  });

  it("returns empty string when given empty array", () => {
    expect(cn([])).toBe("");
  });

  it("returns empty string when given empty object", () => {
    expect(cn({})).toBe("");
  });

  it("handles nested arrays (clsx flattens)", () => {
    const result = cn([["px-2", "py-4"], "text-sm"]);
    expect(result).toContain("px-2");
    expect(result).toContain("py-4");
    expect(result).toContain("text-sm");
  });

  it("resolves conflicts when mixing formats", () => {
    // p-2 (array) vs p-4 (direct string) — p-4 wins (last in clsx processing)
    const result = cn(["p-2"], "p-4");
    expect(result).toContain("p-4");
    expect(result).not.toContain("p-2");
  });
});
