import { PersonType } from '../../types';
import './Person.css';

interface PersonProps {
  person: PersonType,
  onPersonSelected: (id: string) => void,
}

function Person({ person, onPersonSelected }: PersonProps) {
  return <div className='person-container' onClick = {() => onPersonSelected(person.url)}>
    <img className='person-image' src='./defaultImage.jpeg' alt='person'/>
    <div className='person-main-details'>
      <div className='person-main-details-name'>{person.name}</div>
      <div className='person-main-details-sub'>
        <div>Gender: {person.gender}</div>
        <div>Height: {person.height} cm</div>
        <div>Mass: {person.mass} kg</div>
      </div>
    </div>
    
  </div>
}

export default Person
