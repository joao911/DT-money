import React from "react";
import Header from "../../components/Header";
import Summary from "../../components/Summary";
import { Price, Table, TransactionsContainer } from "./styles";
import SearchForm from "./components/SearchForm";

// import { Container } from './styles';

const Transactions: React.FC = () => {
  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <Table>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <Price variant="income">R$ 1.200,00</Price>
              </td>
              <td>Venda</td>
              <td>21/04/2023</td>
            </tr>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <Price variant="outcome">R$ 1.200,00</Price>
              </td>
              <td>Venda</td>
              <td>21/04/2023</td>
            </tr>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>-R$ 1.200,00</td>
              <td>Venda</td>
              <td>21/04/2023</td>
            </tr>
          </tbody>
        </Table>
      </TransactionsContainer>
    </>
  );
};

export default Transactions;
