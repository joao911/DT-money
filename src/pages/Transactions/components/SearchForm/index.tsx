import React from "react";
import { MagnifyingGlass } from "phosphor-react";

import { Search } from "./styles";

const SearchForm: React.FC = () => {
  return (
    <Search>
      <input type="text" placeholder="Buscar por transações" />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </Search>
  );
};

export default SearchForm;
