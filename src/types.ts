// TODO: define interface
export interface PersonType {
  name: string,
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: string,
  films: Array<string>,
  species: Array<string>,
  vehicles: Array<string>,
  starships: Array<string>,
  created: string,
  edited: string,
  url: string
}

export interface SpeciesType {
  name: string,
  classification: string,
  designation: string,
  average_height: string,
  skin_colors: string,
  hair_colors: string,
  eye_colors: string,
  average_lifespan: string,
  homeworld: string,
  language: string,
  people: Array<string>,
  filmns: Array<string>,
  created: string,
  edited: string,
  url: string,
}

export enum LoadState {
  INIT,
  LOADING,
  LOADED,
  ERROR,
}

export interface GetPeopleResponse {
  count: number,
  next: string,
  previous: string | null,
  results: Array<PersonType>,
}

export interface SearchPeopleResponse {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<PersonType>,
}

export interface FilmType {
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: string,
  characters: Array<string>,
  planets: Array<string>,
  starships: Array<string>,
  vehicles: Array<string>,
  species: Array<string>,
  created: string,
  edited: string,
  url: string,
};