import { Check, CheckFunction } from "../types";
import { promisify } from "util";
import fs from "fs";

const readFileAsync = promisify(fs.readFile);

export const checkFunction: CheckFunction = async ({ projectPath }) => {
  const packageJson = await readFileAsync(`${projectPath}/package.json`);
  const { scripts } = JSON.parse(packageJson.toString());
  return !!scripts["test"];
}

const output: Check = {
  name: "Check for tests",
  description:
    "This checks the current branch has tests. We want to run them on each branch so we can spot problems before we hit master",
  checkFunction,
};

export default output;
