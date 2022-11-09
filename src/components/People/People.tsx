import React, { useEffect, useState } from 'react'

import { LoadState, PersonType } from '../../types'
import Person from '../Person'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { fetchPeopleAsync } from '../People/PeopleSlice'
import './People.css';
import { fetchSpeciesAsync } from '../Species/SpeciesSlices'
import Modal from 'react-modal';
import PersonDetails from '../Person/PersonDetails'
import { loadNextSearchPageAsync } from '../SearchBar/SearchSlice';
import { fetchFilmAsync } from '../Film/FilmSlice'

interface PeopleProps {

}

export default function People(props: PeopleProps) {
  const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(null);
  const dispatch = useAppDispatch()
  const peopleState = useAppSelector((state) => state.peopleState);
  const speciesState = useAppSelector((state) => state.speciesState);
  const searchState = useAppSelector((state) => state.searchState);
  const filmsState = useAppSelector((state) => state.filmsState);
  useEffect(() => {
    if (peopleState.loadState === LoadState.INIT) {
      dispatch(fetchPeopleAsync())
    }
  }, [peopleState.loadState, dispatch])

  const onLoadMorePeople = () => {
    dispatch(fetchPeopleAsync(peopleState.nextPage!));
  }

  const onLoadMoreSearchResults = () => {
    dispatch(loadNextSearchPageAsync(searchState.nextPage!))
  }

  const closeModal = () => {
    setSelectedPerson(null);
    console.log('closing');
  }

  const onPersonSelected = (url: string) => {
    const person = peopleState.people.find(p => p.url === url) || searchState.searchResults.find(p => p.url === url);
    if (person === undefined) {
      console.log("No person with url " + url);
      return;
    }
    setSelectedPerson(person);

    person.species.forEach((speciesUrl) => {
      if (speciesState.species.find((p) => p.url === speciesUrl) === undefined) {
        dispatch(fetchSpeciesAsync(speciesUrl));
      }
    });

    person.films.forEach((filmUrl) => {
      if (filmsState.films.find((f) => f.url === filmUrl) === undefined) {
        dispatch(fetchFilmAsync(filmUrl));
      }
    });
  }

  const showAllPeople = () => {
    return <>
       {peopleState.people.map(p => <Person key={p.url} person={p} onPersonSelected={onPersonSelected} />)}
       {
        peopleState.nextPage !== null && peopleState.loadState !== LoadState.LOADING && 
        <button className='people-load-more' onClick={() => onLoadMorePeople()}>Load more</button>
       }
       {peopleState.loadState === LoadState.LOADING && <div>Loading...</div>}
    </>
  }

  const showSearchResults = () => {
    return <>
       {searchState.searchResults.map(p => <Person key={p.url} person={p} onPersonSelected={onPersonSelected} />)}
       {
        searchState.nextPage !== null && searchState.loadState !== LoadState.LOADING && 
        <button className='people-load-more' onClick={() => onLoadMoreSearchResults()}>Load more</button>
       }
       {searchState.loadState === LoadState.LOADING && <div>Loading...</div>}
       {searchState.loadState === LoadState.LOADED && searchState.searchResults.length < 1 && <div>No people found</div>}
    </>
  }

  return (
     <div className='people-container'>
       {searchState.loadState !== LoadState.INIT ? showSearchResults() : showAllPeople()}
    
       {selectedPerson !== null && <Modal
        isOpen={selectedPerson !== null}
        onRequestClose={closeModal}
        contentLabel="Person details"
      >
        <PersonDetails 
          person={selectedPerson!} 
          species={speciesState.species?.filter((s) => selectedPerson?.species?.find(pUrl => pUrl === s?.url))}
          films={filmsState.films.filter((f) => selectedPerson?.films?.find(fUrl => fUrl === f?.url))}
          onClose={closeModal}
        />
      </Modal>}
      </div>
  )
}

