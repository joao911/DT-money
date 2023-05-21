import React, { useEffect, useState } from "react";
import { map } from "lodash";

import Header from "../../components/Header";
import Summary from "../../components/Summary";
import { Price, Table, TransactionsContainer } from "./styles";
import SearchForm from "./components/SearchForm";

interface ITransactionPros {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState([] as ITransactionPros[]);
  const loadTransaction = async () => {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();
    setTransactions(data);
  };
  useEffect(() => {
    loadTransaction();
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
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TransactionsContainer>
    </>
  );
};

export default Transactions;
