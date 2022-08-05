import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

// Home components
import { SearchHeader, CardContainer, Cart, FinishModal } from "./components";

// services
import { getAllPokemon } from "../../services";
import { IPokemon } from "../../interfaces";
import { GetCart, AddPokemonToCart, RemovePokemonFromCart, ClearCart } from "../../utils";

// img

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;


export const Home = () => {
  const [cart, setCart] = useState<IPokemon[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [allPokemon, setAllPokemon] = useState<IPokemon[]>([]);
  const [userInputValue, setUserInputValue] = useState<string>("");
  const [finishModalIsOpen, setFinishModalIsOpen] = useState<boolean>(false)
  const allPokemonFilteredByInput = allPokemon.filter((pokemon) => pokemon.name.includes(userInputValue))

  const updateAllPokemon = useCallback(async () => {
    const caughtAllPokemon = await getAllPokemon();
    setAllPokemon(caughtAllPokemon);
  }, [setAllPokemon])

  const searchFunction = (inputValue: string) => {
    setUserInputValue(inputValue);
  };

  const addPokemonToCartFunction = (pokemon: IPokemon) => {
    AddPokemonToCart(pokemon, setCart);
    setCartIsOpen(true);
  }

  const removePokemonToCartFunction = (pokemon: IPokemon) => {
    RemovePokemonFromCart(pokemon, setCart);
    setCartIsOpen(true);
  }
  const createTeamButtonFunction = () => {
    setFinishModalIsOpen(true)
    setCartIsOpen(false)
    ClearCart(setCart)
  }
  useEffect(() => {
    updateAllPokemon();
  }, [updateAllPokemon]);

  useEffect(() => {
    GetCart(setCart);
  }, []);


  return (
    <>
      {
        (<div>
          <SearchHeader searchFunction={searchFunction} buttonFunction={() => setCartIsOpen(true)} />
          <CardContainer
            allPokemon={allPokemonFilteredByInput}
            addToCartFunction={addPokemonToCartFunction}
          />
          <Cart
            addPokemon={addPokemonToCartFunction}
            removePokemon={removePokemonToCartFunction}
            useCart={{ cartIsOpen, setCartIsOpen }}
            pokemonCartList={cart}
            createTeamButtonFunction={createTeamButtonFunction}
          />
          <FinishModal useModal={{ finishModalIsOpen, setFinishModalIsOpen }} />
        </div>)
      }
    </>
  );
};
