import { createModel } from "@rematch/core";
import { RootModel } from "../../models";

import { IState } from "./types";
import { api } from "../../../api/axios";

export const transactions = createModel<RootModel>()({
  state: {
    transactions: [],
  } as IState,
  reducers: {
    setTransaction(state, payload: []) {
      return { ...state, transactions: payload };
    },
  },
  effects: (dispatch) => ({
    getAll: async (query?: string) => {
      const response = api.get("/transactions", {
        params: {
          _sort: "createdAt",
          _order: "desc",
          q: query,
        },
      });
      dispatch.transactions.setTransaction((await response).data);
    },
  }),
});
