export type OrderDto = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  accountId: string;
  productsId: string[];
};

export type OrdersDto = {
  orders: OrderDto[];
  count?: number;
};
