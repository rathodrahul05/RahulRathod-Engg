import { CountryInfo } from "../../types/CountryInfo"

export const getCountry=(country:CountryInfo)=>{
    return{
        type:'FETCH_COUNTRY',
       country: country
        

    }
}
