export const filter=(text:string)=>{
    return{
        type:'FILTER',
        payload:text
    }
}