export interface Check {
  name: string;
  description: string;
  skip?: boolean;
  checkFunction: (projectName: string) => Promise<boolean>;
}
