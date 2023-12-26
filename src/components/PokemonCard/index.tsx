import { StyledContainer } from "./index.styled";
import { Card, CardProps } from "./Card";

export type Props = {
  pokemonList?: CardProps[];
};

const PokemonCard = ({ pokemonList }: Props) => {
  return (
    <StyledContainer>
      {pokemonList?.length
        ? pokemonList.map((pokemon, idx) =>
            pokemon?.name ? (
              <Card
                key={`${pokemon?.name}-${idx}`}
                name={pokemon?.name}
                url={pokemon?.url}
              />
            ) : null
          )
        : null}
    </StyledContainer>
  );
};

export { PokemonCard };
