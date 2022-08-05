import { FC } from "react";
import styled from "styled-components";

// interfaces
import { IPokemon } from "../../../../../../interfaces";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid #242424;
  border-radius: 5px;
  flex-wrap: wrap;
  width: 100%;
  height: 300px;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  img {
    flex: 1 1 100%;
    object-fit: contain;
  }
  h4 {
    flex: 1 1 100%;
    text-transform: capitalize;
    margin: 0;
  }
  button {
    cursor: pointer;
    color: #000;
    background-color: yellow;
    border-radius: 10px;
    min-width: 90px;
    border: 1px solid;
  }
`;

const ExperienceContainer = styled.div`
  flex: 1 1 100%;
  justify-content: center;
  display: flex;
  gap: 5px;
`;

interface ICard {
  pokemon: IPokemon;
  buttonFunction?: () => void;
}

export const Card: FC<ICard> = ({ pokemon, buttonFunction }) => {
  return (
    <CardContainer>
      {pokemon.sprites.front_default && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
      <h4>{pokemon.name}</h4>
      <ExperienceContainer>
        <strong>Experience price: </strong>
        <span>{pokemon.base_experience}</span>
      </ExperienceContainer>
      <button onClick={buttonFunction}>Capturar</button>
    </CardContainer>
  );
};
