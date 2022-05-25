export enum StatusEnum {
  'Rejected',
  'Undefined',
  'Accepted',
  'Preparing' ,
  'Ready'
}

export interface Order  {
    name: string;
    id: number;
    order_name: string;
    restaurant: string;
    status: StatusEnum;
}
