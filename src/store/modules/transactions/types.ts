export interface IState {
  transactions: ITransactionPros[];
  teste: number;
}

export interface ITransactionPros {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}
