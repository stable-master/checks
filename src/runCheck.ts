import { CheckResult, CheckResultString, Check } from "./types";
import glob from "glob-promise";
import prettyjson from "prettyjson";
import { isValidCheck } from "./checkCheck";

interface Args {
  testPattern?: string;
  projectPath?: string;
}

interface CheckImport {
  default: any;
}

export async function runChecks({ testPattern, projectPath }: Args) {
  if (!testPattern) {
    testPattern = "./src/checks/*.check.ts";
  }

  let projectPathWithDefault = ".";
  if (projectPath) {
    projectPathWithDefault = projectPath;
  }
  console.log(`Running checks against "${projectPathWithDefault}"`);

  const checks = await glob(testPattern);
  console.log(`Found ${checks.length} check${checks.length !== 1 ? "s" : ""}`);

  const checkResults = await Promise.all(
    checks.map(async (checkFilename: string) => {
      const checkImport = (await import(`../${checkFilename}`)) as CheckImport;
      const check = isValidCheck(checkImport.default);

      const { name, checkFunction, skip } = check;

      let result: CheckResultString = "fail";
      let error: Error | undefined = undefined;
      if (!skip) {
        try {
          const resultBool = await checkFunction({ projectPath: projectPathWithDefault });
          result = resultBool ? "pass" : "fail";
        } catch (err) {
          result = "error";
          error = err;
        }
      }

      const checkResult: CheckResult = {
        name,
        result,
        error,
      };
      return checkResult;
    })
  );
  console.log(prettyjson.render(checkResults));
}
