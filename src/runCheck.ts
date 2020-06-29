import { CheckResult, CheckResultString } from "./types";
import { resolve } from "path";
import glob from "glob-promise";
import { isValidCheck } from "./checkCheck";

interface Args {
  checksPattern: string;
  projectPath: string;
}

interface CheckImport {
  default: unknown;
}

export async function runChecks({ checksPattern, projectPath }: Args): Promise<CheckResult[]> {
  console.log(`Running checks against "${projectPath}"`);

  const checks = await glob(checksPattern);
  console.log(`Found ${checks.length} check${checks.length !== 1 ? "s" : ""}`);

  const checkResults = await Promise.all(
    checks.map(async (checkFilename: string) => {
      const absPath = resolve(checkFilename);
      const checkImport = (await import(absPath)) as CheckImport;
      const check = isValidCheck(checkImport.default);

      const { name, checkFunction, skip } = check;

      let result: CheckResultString = "fail";
      let error: Error | undefined = undefined;
      if (!skip) {
        try {
          const resultBool = await checkFunction({ projectPath });
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
  return checkResults;
}
