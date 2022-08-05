import { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { ImSearch } from "react-icons/im";
import { MdCatchingPokemon } from "react-icons/md";

// img
// @ts-ignore
import PokemonCenterIcon from "../../../../assets/img/pokemon-center.icns"

const Header = styled.header`
  height: 60px;
  background: #0021F0;
  > .centralizer {
    display: flex;
    height: 100%;
    justify-content: space-between;
  }
`;

const InputContanier = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  .search-icon {
    color: #242424;
  }
`

const Input = styled.input`
  max-width: 50vw;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  outline: none;
  ::placeholder {
    color: black;
    padding-left: 10px;
  }
`;

const PokemonCenterButton = styled.button`
  display: flex;
  padding: 10px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  img{
    height: 100%;
    border-radius: 100%;
    :hover{
      transform: scale(1.05);
    }
  }
`

interface ISearchHeader {
  searchFunction: (inputValue: string) => void;
  buttonFunction?: () => void
}

export const SearchHeader: FC<ISearchHeader> = ({ searchFunction, buttonFunction }) => {
  const userInputTypeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchFunction(value.toLowerCase());
  };
  return (
    <Header>
      <div className="centralizer">
        <InputContanier>
          <ImSearch size="30px" className="search-icon" />
          <Input placeholder="pesquisar" onChange={userInputTypeHandler} />
        </InputContanier>
        <PokemonCenterButton onClick={buttonFunction}>
          <MdCatchingPokemon size="40px" />
        </PokemonCenterButton>
      </div>
    </Header>
  );
};
