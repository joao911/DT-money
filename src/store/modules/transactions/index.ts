import { createModel } from "@rematch/core";
import { RootModel } from "../../models";

import { IState, ITransactionPros } from "./types";

export const transactions = createModel<RootModel>()({
  state: {
    transactions: [],
  } as IState,
  reducers: {
    setTransaction(state, payload: []) {
      return { ...state, transactions: payload };
    },
  },
  effects: (dispatch) => ({}),
});
