import { Check } from "../types";
import fs from "fs";

export async function checkFunction(projectRoot: string) {
  const packageJson = fs.readFileSync(`${projectRoot}/package.json`);
  const { scripts } = JSON.parse(packageJson.toString());
  return !!scripts["test"];
}

const output: Check = {
  name: "Check branches have tests",
  description:
    "This checks that branches have tests. We want to run them on each branch so we can spot problems before we hit master",
  checkFunction,
};

export default output;
