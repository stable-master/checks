import {
  Check,
  CheckResult,
  CheckFunction,
  isValidCheck,
  runChecks,
  runChecksFromCommandLine,
} from ".";

describe("index", () => {
  describe("type exports", () => {
    it("should export Check", () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const validCheck: Check = {
        name: "test",
        description: "a test",
        onlyForReposWithLabels: ["backend"],
        skip: true,
        checkFunction: async ({ projectPath }) => projectPath === "hello",
      }
    });

    it("should export CheckResult", () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const validCheckResult: CheckResult = {
        name: "test",
        result: "pass",
        error: undefined,
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const erroredCheckResult: CheckResult = {
        name: "test",
        result: "fail",
        error: new Error("Uh oh"),
      }
    });

    it("should export CheckFunction", () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const validCheckResult: CheckFunction = async ({ projectPath }) => false;
    });
  });

  describe("function exports", () => {
    it("should export isValidCheck", () => {
      expect(isValidCheck).toBeInstanceOf(Function);
    });

    it("should export runChecks", () => {
      expect(runChecks).toBeInstanceOf(Function);
    });

    it("should export runChecksFromCommandLine", () => {
      expect(runChecksFromCommandLine).toBeInstanceOf(Function);
    });
  });
});
