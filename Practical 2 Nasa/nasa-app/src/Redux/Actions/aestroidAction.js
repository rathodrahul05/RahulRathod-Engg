
export const getRandomAestroid=(data,id)=>{
    return {
        type:'GET_RANDOM_AESTROID',
        payload:data,
        id
    }
}