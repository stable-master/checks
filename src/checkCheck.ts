import { Check } from "./types";
import checkTypeInterface from "./types/check-ti";
import { createCheckers } from "ts-interface-checker";

const { Check: checkChecker } = createCheckers(checkTypeInterface);

export function isValidCheck(checkObject: any): Check {
  checkChecker.check(checkObject);
  return checkObject as Check;
}
