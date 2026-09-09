import { describe, it, expect } from "vitest";
import { AppModule } from "../src/examples/app.module";
import { compileRouterFromModule } from "../src";
import { createMemoryHistory, createRouter } from "vue-router";

describe("compile router module", () => {
  it("compiles", () => {
    expect(typeof window === "undefined").toBeTruthy();
    const router = compileRouterFromModule(AppModule, (routes) =>
      createRouter({
        history: createMemoryHistory(),
        routes,
      }),
    );
    expect(router.getRoutes().length).toBe(1);
  });
});
