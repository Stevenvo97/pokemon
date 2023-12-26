import { useEffect, useState } from "react";
import "./App.css";
import { getPokemonList, getPokemonListByTypes, getTypes } from "./services";
import { Type, TypeFilter } from "./components/TypesFilter";
import { PokemonCard } from "./components/PokemonCard";
import { Pagination, Text } from "@mantine/core";

function App() {
  const [typeSelected, setTypeSelected] = useState<string[]>([]);
  const [types, setTypes] = useState<Type[]>();
  const [pokemonListGroupByType, setPokemonListGroupByType] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [result, setResult] = useState([]);
  const [activePage, setPage] = useState(1);
  const [PokemonListInActivePage, setPokemonListInActivePage] = useState([]);

  const handleGetTypeList = async () => {
    const res = await getTypes();
    if (res.data.results) setTypes(res.data.results);
  };

  const handleGetPokemonList = async () => {
    const res = await getPokemonList();
    if (res.data.results) setPokemonList(res.data.results);
  };

  const getPokemonByType = async (url: string) => {
    if (url) {
      const res = await getPokemonListByTypes(url);
      if (res.data.pokemon)
        return {
          name: res.data?.name,
          pokemonList: res.data.pokemon.length
            ? res.data.pokemon.map((item: any) => ({
                name: item.pokemon?.name,
                url: item.pokemon?.url,
              }))
            : [],
        };
    }
  };

  const getPokemonListByType = async () => {
    const pokemonListByType: any = [];
    if (types)
      for (let i = 0; i <= types?.length; i++) {
        const res = await getPokemonByType(types[i]?.url);
        if (res) await pokemonListByType.push(res);
      }
    setPokemonListGroupByType(pokemonListByType);
  };

  useEffect(() => {
    handleGetTypeList();
    handleGetPokemonList();
  }, []);

  useEffect(() => {
    // filter list pokemon by type with selected type
    const dataPokemonByTypeSelectedGroup: any = pokemonListGroupByType.filter(
      (item: any) => typeSelected.includes(item.name)
    );

    // flat array
    let pokemonListBySelectedType: any = [];
    for (let i = 0; i <= dataPokemonByTypeSelectedGroup.length; i++) {
      if (dataPokemonByTypeSelectedGroup[i]?.pokemonList.length <= 0)
        pokemonListBySelectedType = [];
      else
        for (
          let x = 0;
          x <= dataPokemonByTypeSelectedGroup[i]?.pokemonList.length;
          x++
        )
          pokemonListBySelectedType.push(
            dataPokemonByTypeSelectedGroup[i]?.pokemonList[x]
          );
    }

    // find duplicate and remove undefined
    let resultListByType: any = [];
    if (typeSelected?.length === 1) resultListByType = pokemonListBySelectedType;
    else if (typeSelected?.length > 2) resultListByType = [];
    else if (pokemonListBySelectedType.length > 0) {
      resultListByType = pokemonListBySelectedType.filter(
        (obj: any, index: number) => (obj !== undefined &&
          pokemonListBySelectedType.findIndex(
            (item: any) => item?.name === obj?.name
          ) !== index
      ));
    }
    if (typeSelected.length > 0) setResult(resultListByType);
    else setResult(pokemonList);
  }, [typeSelected, pokemonList]);

  useEffect(() => {
    getPokemonListByType();
  }, [types, pokemonList]);

  useEffect(() => {
    const newPokemonList = result.filter(
      (value: any, index) =>
        value?.url !== "" &&
        index < (activePage + 1) * 12 &&
        index >= (activePage - 1) * 12
    );
    setPokemonListInActivePage(newPokemonList);
  }, [activePage, result]);

  return (
    <div className="App">
      <TypeFilter
        types={types}
        valueType={typeSelected}
        setValue={setTypeSelected}
      />
      <Text fw={700}>
        {result?.length === 0 ? "0 result" : `${result?.length} results`}{" "}
        found
      </Text>
      <PokemonCard pokemonList={PokemonListInActivePage} />
      <Pagination
        value={activePage}
        onChange={setPage}
        total={result?.length / 24}
        boundaries={1}
        defaultValue={20}
      />
    </div>
  );
}

export default App;
