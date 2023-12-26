import { Text, Image } from "@mantine/core";
import { StyledCardWrapper, StyledImageWrapper } from "./index.styled";
import { useEffect, useState } from "react";
import { getPokemonDetail } from "../../services";

export type CardProps = {
  name: string;
  url: string;
};

const Card = ({ name, url }: CardProps) => {
  const [pokemonImg, setPokemonImg] = useState("");
  const getPokemonByUrl = async () => {
    const res = await getPokemonDetail(url);
    if (res?.data?.sprites?.other?.["official-artwork"]?.["front_default"])
      setPokemonImg(
        res?.data?.sprites?.other?.["official-artwork"]?.["front_default"]
      );
  };
  useEffect(() => {
    getPokemonByUrl();
  }, [url]);

  return (
    <StyledCardWrapper>
      <>
        <StyledImageWrapper>
          <Image
            src={pokemonImg}
            h={150}
            w={150}
            fit="contain"
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </StyledImageWrapper>
        <Text size="md">{pokemonImg ? name : "Loading..."}</Text>
      </>
    </StyledCardWrapper>
  );
};

export { Card };
