import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../store";

import Header from "../../components/Header";
import Summary from "../../components/Summary";
import { Price, Table, TransactionsContainer } from "./styles";
import SearchForm from "./components/SearchForm";
import { ITransactionPros } from "../../store/modules/transactions/types";

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState([] as ITransactionPros[]);
  const { teste } = useSelector((state: RootState) => state.transactions);
  const dispatch = useDispatch<Dispatch>();
  const loadTransaction = async () => {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();
    dispatch.transactions.setTeste(teste + 2);
    setTransactions(data);
  };

  useEffect(() => {
    loadTransaction();
  }, []);

  useEffect(() => {
    console.log("teste: ", teste);
  }, [teste]);
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
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <button
          onClick={() => {
            dispatch.transactions.setTeste(teste + 6);
            console.log("cai aqui");
          }}
        >
          {teste}
        </button>
      </TransactionsContainer>
    </>
  );
};

export default Transactions;
