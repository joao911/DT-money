import { createModel } from "@rematch/core";
import { RootModel } from "../../models";

import { IState, ITransactionPros } from "./types";

export const transactions = createModel<RootModel>()({
  state: {
    transactions: [],
    teste: 0,
  } as IState,
  reducers: {
    setTransaction(state, payload: []) {
      return { ...state, payload };
    },
    setTeste(state, payload: number) {
      return { ...state, payload };
    },
  },
  effects: (dispatch) => ({}),
});
