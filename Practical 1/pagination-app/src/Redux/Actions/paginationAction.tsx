import axios from "axios";
import { Dispatch } from "redux"

export const fetchItemsRequest = () => {
  return {
    type: "FETCH_ITEMS_REQUEST",

  };
};
export const fetchItemsSuccess = (items:object) => {
  return {
    type: "FETCH_ITEMS_SUCCESS",
    payload: items,
   
  };
};
export const fetchUsersFailure = (error:string) => {
  return {
    type: "FETCH_ITEMS_FAILURE",
    payload: error,
  };
};
export const selectedItem=(item:object)=>{
  return{
    type:'SELECTED_ITEM',
    payload:item
  }
}

export const closeModal=()=>{
  return{
    type:'CLOSE_MODAL'
  }
}
export const nextPage=()=>{
  return{
    type:'NEXT_PAGE'
  }
}

export const showItem=(firstIndex:number,lastIndex:number)=>{
  return{
    type:'SHOW',
    firstIndex,lastIndex
  }
}
export const fetchItems = (page:number,fI:number=0,lI:number=0) => {
  return (dispatch:Dispatch) => {
    dispatch(fetchItemsRequest());
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      )
      .then((response:any) => {
       
        const items = response.data;
       
          
          dispatch(fetchItemsSuccess(items));
          dispatch(showItem(fI,lI))
        
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
      });
  };
};
