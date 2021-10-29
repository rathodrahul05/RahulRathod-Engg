const initialState=[];

const totolAestroidsReducer=(state=initialState,action)=>{
switch (action.type) {
    case 'GET_ALL_AESTROIDS':
        return action.payload

    default:return state
}
}
export default totolAestroidsReducer;