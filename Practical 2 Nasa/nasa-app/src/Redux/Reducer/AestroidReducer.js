const initialState={
    aestroid_id:'',
    name: "",
    nasa_jpl_url: "",
    is_potentially_hazardous_asteroid: "",
}
const AestroidReducer=(state=initialState,action)=>{
    switch (action.type) {
       
      
    case 'GET_RANDOM_AESTROID':
        return{
            ...state,
            aestroid_id:action.id,
            name:action.payload.name,
            nasa_jpl_url:action.payload.nasa_jpl_url,
            is_potentially_hazardous_asteroid:action.payload.is_potentially_hazardous_asteroid
        }
        default:
            return state
    }

}
export default AestroidReducer