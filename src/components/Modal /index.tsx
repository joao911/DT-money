import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
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
import { priceFormatter } from "../../ultis/fomartter";

const Modal: React.FC = () => {
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

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

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
    </Dialog.Portal>
  );
};

export default Modal;
