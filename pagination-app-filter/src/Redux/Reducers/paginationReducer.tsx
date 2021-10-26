export interface DefaultState{
loading:boolean,
totalItems:any[],
items:any[],
selectedItem:object | undefined,
itemsPerPage:number,
pages:number
}
const initialState:DefaultState = {
  loading: false,
  totalItems:[],
  items:[],
  selectedItem:undefined,
  itemsPerPage:20,
  pages:0
};

const paginationReducer = (state:DefaultState = initialState, action:any):DefaultState => {
  switch (action.type) {
    case "FETCH_ITEMS_REQUEST":
      return {
        ...state,
        loading: true,
         
      };
      case "FETCH_ITEMS_SUCCESS":
        return {
        ...state,
        loading: false,
        totalItems:state.totalItems.concat(action.payload.hits),
        pages:action.payload.nbPages
      };
      case 'SHOW':
        return{
          ...state,
         items:state.totalItems.slice(action.firstIndex,action.lastIndex)
        }

    case "SELECTED_ITEM":
      return{
        ...state,
        selectedItem:action.payload
      }
    case "CLOSE_MODAL":
      return{
        ...state,
        selectedItem:undefined
      }
   
    default:
      return state;
  }
 
};

export default paginationReducer;
