import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const useSummary = () => {
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      }
      if (transaction.type === "outcome") {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  );

  return summary;
};
