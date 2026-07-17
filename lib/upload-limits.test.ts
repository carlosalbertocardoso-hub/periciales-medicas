import { describe, it, expect } from "vitest";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  MAX_TOTAL_RAW_ATTACHMENT_BYTES,
  isTotalUploadWithinLimit,
} from "./upload-limits";

describe("upload-limits", () => {
  it("total por debajo del límite -> true", () => {
    const sizes = [1 * 1024 * 1024, 2 * 1024 * 1024, 3 * 1024 * 1024]; // 6 MB total
    expect(isTotalUploadWithinLimit(sizes)).toBe(true);
  });

  it("total EXACTAMENTE igual al límite -> true", () => {
    const sizes = [MAX_TOTAL_RAW_ATTACHMENT_BYTES];
    expect(isTotalUploadWithinLimit(sizes)).toBe(true);
  });

  it("total un byte por encima -> false", () => {
    const sizes = [MAX_TOTAL_RAW_ATTACHMENT_BYTES + 1];
    expect(isTotalUploadWithinLimit(sizes)).toBe(false);
  });

  it("varios archivos pequeños que SUMAN por encima -> false", () => {
    // 5 archivos de 3.5 MB = 17.5 MB total (supera 15 MB)
    const sizes = [
      3.5 * 1024 * 1024,
      3.5 * 1024 * 1024,
      3.5 * 1024 * 1024,
      3.5 * 1024 * 1024,
      3.5 * 1024 * 1024,
    ];
    expect(isTotalUploadWithinLimit(sizes)).toBe(false);
  });

  it("cero archivos ([]) -> true", () => {
    expect(isTotalUploadWithinLimit([])).toBe(true);
  });

  it("mantiene el límite individual: MAX_FILE_SIZE === 10*1024*1024", () => {
    expect(MAX_FILE_SIZE).toBe(10 * 1024 * 1024);
  });

  it("mantiene el máximo de archivos: MAX_FILES === 5", () => {
    expect(MAX_FILES).toBe(5);
  });

  it("suma sin coerciones incorrectas: ignora NaN y negativos", () => {
    const sizes = [1 * 1024 * 1024, NaN, -5 * 1024 * 1024, 2 * 1024 * 1024];
    // Solo 1 MB + 2 MB = 3 MB (ignora NaN y negativo)
    expect(isTotalUploadWithinLimit(sizes)).toBe(true);
  });
});
