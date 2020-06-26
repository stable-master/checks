export type CheckResultString = "pass" | "fail" | "skipped" | "error";

export interface CheckResult {
  name: string;
  result: CheckResultString;
  error?: Error,
}
