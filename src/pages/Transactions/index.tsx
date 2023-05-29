import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../store";

import Header from "../../components/Header";
import Summary from "../../components/Summary";
import { Price, Table, TransactionsContainer } from "./styles";
import SearchForm from "./components/SearchForm";
import { ITransactionPros } from "../../store/modules/transactions/types";
import { dateFormatter, priceFormatter } from "../../ultis/fomartter";

const Transactions: React.FC = () => {
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );
  const dispatch = useDispatch<Dispatch>();

  const getAllTransaction = async () => {
    await dispatch.transactions.getAll();
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <Table>
          <tbody>
            {map(transactions, (item) => (
              <tr key={item.id}>
                <td width="50%">{item.description}</td>
                <td>
                  <Price variant={item.type}>
                    {item.type === "outcome" ? "- " : ""}
                    {priceFormatter.format(item.price)}
                  </Price>
                </td>
                <td>{item.category}</td>
                <td>{dateFormatter.format(new Date(item.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TransactionsContainer>
    </>
  );
};

export default Transactions;
