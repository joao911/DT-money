import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import Modal from "../Modal ";

const Header: React.FC = () => {
  const [isTransactionModalOpen, setIsTransactionModalOpen] =
    useState<boolean>(false);

  function handleTransactionModalOpenChange(value: boolean) {
    setIsTransactionModalOpen(value);
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root
          open={isTransactionModalOpen}
          onOpenChange={handleTransactionModalOpenChange}
        >
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          {isTransactionModalOpen && (
            <Modal
              handleTransactionModalOpenChange={
                handleTransactionModalOpenChange
              }
            />
          )}
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
