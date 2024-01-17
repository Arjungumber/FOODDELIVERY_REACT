import React, { useReducer, useEffect } from "react";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import { getAll,getAllTags,search,getAllByTag } from "../../services/foodService";
import Search from "../../components/Search/Search";
import Tags from "../../components/Tags/Tags";
import NotFound from "../../components/NotFound/NotFound";

const initialState = {foods:[],tags:[]};

// here we get the current state and the action we get to change the current state
const reducer = (state,action) =>{
  switch(action.type){
    case 'FOODS_LOADED':
      return{...state,foods:action.payload};// if the foods are loaded
      // return the previous state and overwrite the foods with the new value that is set to the payload of the action
      case 'TAGS_LOADED':
      return{...state,tags:action.payload}
      default:
        return state;
  }
};

export default function HomePage() {

  const [state,dispatch] = useReducer(reducer,initialState);
  
  const {foods,tags} = state; // destructuring

  const {searchTerm , tag} = useParams();

  useEffect(() => {
  getAllTags().then(tags => dispatch({type:'TAGS_LOADED',payload:tags}));

const loadFoods = 
tag ? getAllByTag(tag):
searchTerm ? search(searchTerm) : getAll();

loadFoods.then(foods => dispatch({type:'FOODS_LOADED',payload:foods}));
  },[searchTerm,tag]); 
  // empty array is dependencies this function will be called once when the page is loaded.
// otherwise it will be called every time anyone search for it.
  return(
  <>       
  <Search></Search>
  <Tags tags={tags}></Tags>
  {/* if theres no food found No found component will be rendered */}
  {foods.length === 0 && <NotFound linkText="Reset Search"></NotFound>} 
    <Thumbnails foods = {foods}/>
  </>
  );
}
