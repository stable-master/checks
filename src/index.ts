import { runChecksLocally } from "./runCheck";
import { argv } from "yargs";

const testPattern = argv.testPattern as string;
const projectPath = argv.projectPath as string;

runChecksLocally({
  testPattern,
  projectPath,
});
