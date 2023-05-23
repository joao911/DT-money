import React from "react";
import { MagnifyingGlass } from "phosphor-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { Search } from "./styles";

const SearchForm: React.FC = () => {
  const schema = yup.object({
    query: yup.string().required("Digite o nome da transação"),
  });

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <Search onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("query")}
          type="text"
          placeholder="Buscar por transações"
        />

        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          Buscar
        </button>
      </div>
      <p>{errors.query?.message}</p>
    </Search>
  );
};

export default SearchForm;
