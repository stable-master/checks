import { runChecks } from "./runCheck";
import prettyjson from "prettyjson";
import { argv } from "yargs";

export async function runChecksFromCommandLine(): Promise<void> {
  const testPattern = argv.testPattern as string;
  const projectPath = argv.projectPath as string;

  const results = await runChecks({
    testPattern,
    projectPath,
  });
  console.log(prettyjson.render(results));
}
