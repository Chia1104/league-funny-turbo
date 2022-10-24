export type OdataResult<T = any> = {
  "@context": string;
  value: T;
  "@count"?: number;
  "@nextLink"?: string;
};
