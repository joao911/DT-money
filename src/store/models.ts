import { Models } from "@rematch/core";
import { transactions } from "./modules/transactions";

export interface RootModel extends Models<RootModel> {
  transactions: typeof transactions;
}

export const models: RootModel = {
  transactions,
};
