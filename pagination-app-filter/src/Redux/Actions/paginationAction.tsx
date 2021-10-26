
export const fetchItemsRequest = () => {
  return {
    type: "FETCH_ITEMS_REQUEST",

  };
};
export const fetchItemsSuccess = (items:{}) => {
  return {
    type: "FETCH_ITEMS_SUCCESS",
    payload: items,
   
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


export const showItem=(firstIndex:number,lastIndex:number)=>{
  return{
    type:'SHOW',
    firstIndex,lastIndex
  }
}

      