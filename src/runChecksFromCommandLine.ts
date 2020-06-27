import { runChecks } from "./runCheck";
import { argv } from "yargs";

export async function runChecksFromCommandLine(): Promise<void> {
  const testPattern = argv.testPattern as string;
  const projectPath = argv.projectPath as string;

  await runChecks({
    testPattern,
    projectPath,
  });
}
