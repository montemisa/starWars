import { FilmType, PersonType, SpeciesType } from '../../types';
import './PersonDetails.css';

interface PersonDetailsProps {
  person: PersonType,
  species: Array<SpeciesType>,
  films: Array<FilmType>,
  onClose: () => void,
}

function PersonDetails({ person, species, onClose, films}: PersonDetailsProps) {
  return <div className='person-details-container'>
    <button onClick={() => onClose()}>close</button>
    <h2>{person.name}</h2>
    <img className='person-image' src='./defaultImage.jpeg' alt='person' />
    <div className='person-main-details'>
      <div className='person-details-metadata'>
        <div>
            Species: {species === undefined ? <span>N/A</span> : 
                species.map(s => <span>{s.name}</span>)
            }
        </div>
        <div>Gender: {person.gender}</div>
        <div>Height: {person.height} cm</div>
        <div>Weight: {person.mass} kg</div>
        <div>
            Films: 
            <ul>
                {films.map((f) => <li>{f.title}</li>)}
            </ul>
        </div>
      </div>
    </div>
    
  </div>
}

export default PersonDetails
