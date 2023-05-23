import React from "react";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyCircleDollar,
} from "phosphor-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { Card, Container } from "./styles";
import { map } from "lodash";
import { priceFormatter } from "../../ultis/fomartter";
import { useSummary } from "./hooks/useSummary";

const Summary: React.FC = () => {
  const summary = useSummary();

  return (
    <Container>
      <Card>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </Card>
      <Card>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </Card>
      <Card isTotal="green">
        <header>
          <span>Total</span>
          <CurrencyCircleDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </Card>
    </Container>
  );
};

export default Summary;
