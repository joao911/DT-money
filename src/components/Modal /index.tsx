import React, { ChangeEvent, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../store";
import CurrencyInputField from "react-currency-input-field";

import {
  Content,
  Title,
  Overlay,
  CloseButton,
  ButtonSubmit,
  TransactionType,
  Button,
} from "./styles";
import { api } from "../../api/axios";
import { Portal } from "@radix-ui/react-dialog";

interface IModalProps {
  handleTransactionModalOpenChange: (value: boolean) => void;
}

const Modal: React.FC<IModalProps> = ({ handleTransactionModalOpenChange }) => {
  const dispatch = useDispatch<Dispatch>();
  const schema = yup
    .object({
      description: yup.string().required("Descrição é obrigatória"),
      price: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .positive("O preço não pode ser negativo")
        .required("Preço é obrigatório"),
      category: yup.string().required("Categoria é obrigatória"),
      type: yup
        .string()
        .oneOf(["income", "outcome"])
        .required("Tipo da transação é obrigatória"),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  function formatCurrency(value: any) {
    const options = { style: "currency", currency: "BRL" };
    return new Intl.NumberFormat("pt-BR", options).format(value);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/\D/g, ""));

    register("price").onChange({
      target: { value: numericValue },
      type: "change",
    });
  };

  const {
    control,
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    handleTransactionModalOpenChange(false);

    const { description, price, category, type } = data;
    await api.post("transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });
    reset();
    await dispatch.transactions.getAll("");
  };

  return (
    <Portal>
      <Overlay />

      <Content>
        <CloseButton>
          <X />
        </CloseButton>
        <Title>Nova transação</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("description")}
            placeholder="Descrição"
          />
          <p>{errors.description?.message}</p>

          <input type="number" {...register("price")} placeholder="Preço" />

          <p>{errors.price?.message}</p>

          <input
            type="text"
            {...register("category")}
            placeholder="Categoria"
          />
          <p>{errors.category?.message}</p>

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <div>
                  <TransactionType onValueChange={field.onChange}>
                    <Button value="income" variant="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </Button>
                    <Button value="outcome" variant="outcome">
                      <ArrowCircleDown size={24} />
                      Saída
                    </Button>
                  </TransactionType>
                  <p>{errors.type?.message}</p>
                </div>
              );
            }}
          />

          <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
        </form>
      </Content>
    </Portal>
  );
};

export default Modal;
