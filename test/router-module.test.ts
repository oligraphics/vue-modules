import { describe, it, expect } from "vitest";
import { AppModule } from "../src/examples/app.module";
import { compileRouterFromModule } from "../src";

describe("compile router module", () => {
  it("compiles", () => {
    expect(typeof window === "undefined").toBeTruthy();
    const router = compileRouterFromModule(AppModule);
    expect(router.getRoutes().length).toBe(1);
  });
});
