import { Dispatch, FC, SetStateAction, useMemo } from "react";
import styled from "styled-components";
import { IPokemon } from "../../../../interfaces";
import { AiOutlineCloseCircle } from "react-icons/ai";

// Cart components
import { CartItem } from "./components";

interface ICartContainer {
  cartIsOpen: boolean;
}

const CartContainer = styled.div<ICartContainer>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 65vh;
  visibility: ${({ cartIsOpen }) => (cartIsOpen ? "visible" : "hidden")};
  animation-delay: 0.5s;
`;
const CartBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const CartCard = styled.div<ICartContainer>`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  background: white;
  transform: ${({ cartIsOpen }) =>
    cartIsOpen ? "translateX(0)" : "translateX(100%)"};
  transition: 0.3s;
  .close-cart {
    display: flex;
    position: absolute;
    right: inherit;
    padding-right: 5px;
    margin-top: 10px
    cursor: pointer;
  }
  border: 1px solid #dcdcdc;
  `;

const PokemonCartListContainer = styled.div`
  flex: 1 1 80%;
  width: 100%;
  overflow-y: auto;
  border-bottom: 5px double black;
  padding-left: 10px;
  padding-right: 10px;
`

const CheckoutContainer = styled.div`
  background-color: #0021F0;
  padding: 10px;
  .total-value {
    display: flex;
    justify-content: space-between;
  }
  h3 {
    color: #fff
  }
  flex: 1 1 20%;
  button{
    font-size: 20px;
    background-color: yellow;
    min-width: 120px;
    border-radius: 10px;
    border: 1px solid;
    min-height: 40px
  }
`

interface ICart {
  useCart: {
    cartIsOpen: boolean;
    setCartIsOpen: Dispatch<SetStateAction<boolean>>;
  };
  pokemonCartList: IPokemon[];
  addPokemon: (pokemon: IPokemon) => void;
  removePokemon: (pokemon: IPokemon) => void;
  createTeamButtonFunction: () => void
}

export const Cart: FC<ICart> = ({
  useCart,
  pokemonCartList,
  addPokemon,
  removePokemon,
  createTeamButtonFunction
}) => {
  const { cartIsOpen, setCartIsOpen } = useCart;
  const cartTotalXp = useMemo(() => pokemonCartList.reduce<number>((totalXp, currenPokemon) => {
    if (currenPokemon?.quantity) {
      const total = totalXp + (currenPokemon.base_experience * currenPokemon.quantity)
      return total
    }
    return 0
  }, 0), [pokemonCartList])

  const closeCart = () => {
    setCartIsOpen(false);
  };

  return (
    <CartContainer cartIsOpen={cartIsOpen}>
      <CartBg onClick={closeCart} />
      <CartCard cartIsOpen={cartIsOpen}>
      <div className="close-cart" onClick={closeCart}>
        <AiOutlineCloseCircle size="25px" onClick={closeCart} />
      </div>
        <h2>Carrinho</h2>
        <PokemonCartListContainer>
          {pokemonCartList.map((pokemon) => (
            <CartItem
              key={pokemon.name}
              pokemon={pokemon}
              decreasePokemonFunction={() => removePokemon(pokemon)}
              plusPokemonFunction={() => addPokemon(pokemon)}
            />
          ))}
        </PokemonCartListContainer>
        <CheckoutContainer>
          <div className="total-value">
            <h3>Experience:</h3>
            <h3>{cartTotalXp}</h3>
          </div>
          <button onClick={createTeamButtonFunction}>Comprar</button>
        </CheckoutContainer>
      </CartCard>
    </CartContainer>
  );
};
