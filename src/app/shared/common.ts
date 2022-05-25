export enum StatusEnum {
  Undefined,
  Accepted,
  Preparing ,
  Ready
}

export interface Status {
  id: number;
  state: StatusEnum;
}
