export interface IState {
  transactions: ITransactionPros[];
}

export interface ITransactionPros {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}
