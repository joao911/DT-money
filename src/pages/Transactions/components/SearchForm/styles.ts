import styled from "styled-components";

export const Search = styled.form`
  display: flex;
  flex-direction: column;
  height: 4.5rem;
  margin-bottom: 0.6rem;

  div {
    display: flex;
    gap: 1rem;
  }

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
  }

  p {
    color: ${(props) => props.theme["red-300"]};
    margin-top: 0.6rem;
    margin-left: 0.6rem;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border: 0;
    padding: 1rem;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme["green-300"]};
    color: ${(props) => props.theme["green-300"]};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    &:not(:disabled):hover {
      background-color: ${(props) => props.theme["green-500"]};
      border-color: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      transition: background-color0.2s, color 0.2s, border-color 0.2s;
    }
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;
