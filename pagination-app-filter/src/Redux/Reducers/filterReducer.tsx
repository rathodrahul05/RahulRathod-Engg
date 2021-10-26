interface DefaultState{
    text:string
}
const initialState={
    text:''
}
const filterReducer=(state:DefaultState=initialState,action:any)=>{
    switch (action.type) {
        case 'FILTER':
            return{
                ...state,text:action.payload
            }
    
        default:return state
            
    }

}
export default filterReducer