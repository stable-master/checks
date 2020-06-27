export interface CheckFunctionArgs {
  projectPath: string;
}

export type CheckFunction = (args: CheckFunctionArgs) => Promise<boolean>;

export interface Check {
  name: string;
  description?: string;
  onlyForReposWithLabels?: string[];
  skip?: boolean;
  checkFunction: CheckFunction;
}
