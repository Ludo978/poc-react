export type AccountDto = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  ordersId: string[];
};

export type AccountsDto = {
  accounts: AccountDto[];
  count?: number;
};
