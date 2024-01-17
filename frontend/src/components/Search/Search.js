import React , {useEffect, useState} from 'react'
import classes from './search.module.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function Search() {
    // eslint-disable-next-line no-undef
    const [term,setTerm] = useState('');
    const navigate = useNavigate(); // to change our routes.
    const {searchTerm} = useParams();

  useEffect(() =>{
setTerm(searchTerm ?? ''); // when teres is no searchterm set it to empty string
  },[searchTerm])


    const search = async () =>{
        term? navigate('/search/' + term) : navigate('/');
    };

  return <div className={classes.container}>
<input
type='text'
placeholder='Search Food Mine!'
onChange={e => setTerm(e.target.value)}
onKeyUp={e => e.key === 'Enter' && search()}// this function will check if the enter key is pressed and search function is invoked
value={term}
/>
<button onClick={search}>Search</button>
  </div>
}
