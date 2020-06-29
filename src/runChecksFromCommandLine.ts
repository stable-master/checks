import { runChecks } from "./runCheck";
import prettyjson from "prettyjson";
import { argv } from "yargs";

export async function runChecksFromCommandLine(): Promise<void> {
  const checksPattern = argv.checksPattern as string;
  const projectPath = argv.projectPath as string;

  const results = await runChecks({
    checksPattern: checksPattern || "./src/checks/*.check.ts",
    projectPath: projectPath || ".",
  });
  console.log(prettyjson.render(results));
}
