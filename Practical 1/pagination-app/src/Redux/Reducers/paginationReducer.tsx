export interface DefaultState{
loading:boolean,
totalItems:any[],
items:any[],
selectedItem:object | undefined,
currentPage:number,
error:string,
itemsPerPage:number,
pages:number
}
const initialState:DefaultState = {
  loading: false,
  totalItems:[],
  items:[],
  selectedItem:undefined,
  currentPage:0,
  error: "",
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
      console.log(action.firstIndex,action.lastIndex)
      
      return {
        ...state,
        loading: false,
        totalItems:state.totalItems.concat(action.payload.hits),
        error: "",
        pages:action.payload.nbPages
      };
      case 'SHOW':
        return{
          ...state,
         items:state.totalItems.slice(action.firstIndex,action.lastIndex)
        }

    case "FETCH_ITEMS_FAILURE":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.payload,
      };
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
    case "NEXT_PAGE":
      return{
        ...state,
        currentPage:state.currentPage+1
      }
   
    default:
      return state;
  }
 
};

export default paginationReducer;
