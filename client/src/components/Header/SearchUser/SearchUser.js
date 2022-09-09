import React,{useState ,useEffect} from 'react'
import { Search,Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { SEARCH } from '../../../gql/user'
import { useQuery } from '@apollo/client'
import {size} from 'lodash'
import ImageNoFound from '../../../assets/png/avatar.png'
import './SearchUser.scss'

export default function SearchUser() {

  const [search,setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const {data,loading} = useQuery(SEARCH,{
    variables:{search}
  });

  console.log(results)

  useEffect(()=>{
    if(size(data?.search)){
      const users = [];
      data.search.forEach((user,index) => {
        users.push({
          key:index,
          title:user.name,
          username:user.username,
          avatar:user.avatar
        });
        setResults(users)  
      });     
    }else{
      setResults([])
    }
  },[data])

  function onChange(e){
    if(e.target.value){
      setSearch(e.target.value)
    }else{
      setSearch(null)
    }   
  }

  function handleResultSelect(){
    setSearch(null)
    setResults([])
  }

  return (
    <Search
      className='search-users'
      fluid
      input={{icon:'search', iconPosition:'left'}}
      loading={loading}
      value={search || "" }
      onSearchChange={onChange}
      results={results}
      onResultSelect={handleResultSelect}
      resultRenderer={(e)=> <ResultsSearch data={e} />}
    />
  )
}

function ResultsSearch({data}){
  return(
    <Link className='search-users__item' to={`/${data.username}`} >
      <Image src={data.avatar || ImageNoFound} />
      <div>
        <p> {data.title} </p>
        <p> {data.username} </p>
      </div>
    </Link>
    )
  
}
