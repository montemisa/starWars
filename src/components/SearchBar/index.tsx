import React, { useMemo } from 'react';
import { useAppDispatch } from '../../hooks'
import _ from 'lodash';
import { searchPeopleAsync, clearSearchResults } from './SearchSlice';
import './SearchBar.css';

export default function SearchBar() {
    const dispatch = useAppDispatch()

    const onChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        if (e.target.value.length < 1) {
            dispatch(clearSearchResults());
        } else {
            dispatch(searchPeopleAsync(e.target.value));
        }
    };

    const debouncedResults = useMemo(() => {
        return _.debounce(onChange, 300);
        }, []);
      
    return (
        <div className={'search-bar-container'}>
            <input 
                className='search-bar-input' 
                type='text' 
                placeholder='Search your favorite character' 
                onChange={debouncedResults}
            />
        </div>
    );
}