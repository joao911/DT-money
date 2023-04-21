import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  Content,
  Title,
  Overlay,
  CloseButton,
  ButtonSubmit,
  TransactionType,
  Button,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

const Modal: React.FC = () => {
  const [isIncome, setIsIncome] = useState("");
  const [isOutcome, setIsOutcome] = useState("");

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
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  useEffect(() => {
    console.log("isOutcome: ", isOutcome);
  }, [isOutcome]);
  return (
    <Dialog.Portal>
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

          <TransactionType>
            <Button value="income" variant="income">
              <ArrowCircleUp size={24} />
              Entrada
            </Button>
            <Button value="outcome" variant="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </Button>
          </TransactionType>
          <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
        </form>
      </Content>
    </Dialog.Portal>
  );
};

export default Modal;
