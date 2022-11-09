import { GetPeopleResponse, SpeciesType, SearchPeopleResponse, FilmType } from '../types'

const BASE_URL = 'https://swapi.dev/api';
const fetchJson = async <Response = any>(url: string, init?: RequestInit): Promise<Response> => {
  const response = await fetch(
    url,
    {
      ...init ?? {},
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });

  return response.json();
}

export const  getAllPeople = async (pageNum: string = '1') => {
  return fetchJson<GetPeopleResponse>(`${BASE_URL}/people/?page=${pageNum}`)
};

export const getSpecies = async (url: string) => {
  return fetchJson<SpeciesType>(url);
};

export const searchPeople = async (searchTerm: string) => {
  return fetchJson<SearchPeopleResponse>(`${BASE_URL}/people/?search=${searchTerm}`)
}

export const getNextSearchPage = async (nextPage: string) => {
  return fetchJson<SearchPeopleResponse>(nextPage);
}

export const getFilm = async (url: string) => {
  return fetchJson<FilmType>(url);
}
