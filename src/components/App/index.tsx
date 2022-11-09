import People from '../People';
import SearchBar from '../SearchBar'
import './App.css';

export default function App() {
  return (
    <div className={'app-container'}>
      <img className='app-banner' src={'/starwarsbanner.jpeg'} alt="star wars banner" />
      <SearchBar />
      <People />

    </div>
  );
}