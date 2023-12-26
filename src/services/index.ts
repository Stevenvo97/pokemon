import axios from 'axios';

const path = 'https://pokeapi.co/api/v2/'

// Get List Type
export const getTypes = async() => axios.get(path + 'type');

// Get Pokemon
export const getPokemonList = () => axios.get(path + 'pokemon?limit=1200');

// Get Pokemon detail
export const getPokemonDetail= async(url: string) => axios.get(url);

// Get Pokemon by type
export const getPokemonListByTypes = async(url: string) => axios.get(url);
