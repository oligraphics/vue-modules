import { describe, it, expect } from "vitest";
import { AppModule } from "../src/examples/app.module";
import { ICompiledStartupModule } from "../src";

describe("compile startup module", () => {
  it("compiles", () => {
    const app = {};
    const startupModule = AppModule as ICompiledStartupModule;
    const performColdStart = startupModule.compiledPerformColdStart;
    const performHotStart = startupModule.compiledPerformHotStart;
    const performShutdown = startupModule.compiledPerformShutdown;
    expect(performColdStart).toBeTruthy();
    expect(performHotStart).toBeTruthy();
    expect(performShutdown).toBeTruthy();
    const onProgress = (progress: number) => console.log(progress);
    if (performColdStart) {
      performColdStart(AppModule, app, onProgress);
    }
    if (performHotStart) {
      performHotStart(AppModule, onProgress);
    }
    if (performShutdown) {
      performShutdown();
    }
  });
});
