import { describe, it, expect } from "vitest";
import { AppModule } from "../src/examples/app.module";
import { compileRouterFromModule, ICompiledVueDirectivesModule } from "../src";

describe("compile router module", () => {
  it("compiles", () => {
    const vueDirectivesModule = AppModule as ICompiledVueDirectivesModule;
    expect(vueDirectivesModule.compiledDirectives.length).toBe(1);
  });
});
