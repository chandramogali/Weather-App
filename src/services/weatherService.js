
import {DateTime} from "luxon"
const API_KEY="e5a7f8dfd8379043d05e840976bf1b7a";

const BASE_URL="https://api.openweathermap.org/data/2.5";


//"https://api.openweathermap.org/data/3.0/onecall?lat=48.8534&lon=2.3488&exclude=currunt,minutely,hourly,aletrs&appid=e5a7f8dfd8379043d05e840976bf1b7a&units=metric"

const getWeatherData=(infoType, searchParams) =>{
    const url=new URL(BASE_URL + "/" + infoType);

    url.search=new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url).then((res)=> res.json())
   
}

const formatCurrentdWeather = (data)=>{
     const {
            coord:{lat, lon},
            main:{temp, feels_like, temp_min, temp_max,humidity},
            name,
            dt,
            sys:{country,sunrise,sunset},
            weather,
            wind:{speed},
        
     }=data;


     
     const {main:detaitls ,icon}=weather[0];


      return {lat,lon,temp, feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,sunset,detaitls,icon,speed}
}


const formatForecastWeather = (data) =>{

    let {daily,hourly,timezone}=data;

    daily=(daily && daily.slice(1,6).map(d =>{
        return {
            title: formatToLocalTime(d.dt, timezone, "cccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon
    
        };
    })

    )
 
     hourly=(hourly &&  hourly.slice(1,6).map(d =>{
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp.day,
            icon: d.weather[0].icon
    
        };
    })
    )


   return {timezone, daily,hourly};
};

const  getFormattedWeatherData = async (searchParams)=>{
    const formattedCurrentWeather = await getWeatherData
    ("weather"
     ,searchParams
     ).then(formatCurrentdWeather)


    const {lat,lon}=formattedCurrentWeather;

    const formattedForecastWeather= await  getWeatherData("weather",
    {
        lat,lon,exclude:"current,minutely,alerts" , 
        units:searchParams.units,
        
    }).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather 
    };
};



const formatToLocalTime= (secs, zone, format= "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => 
 DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode=(code)=>
    `https://openweathermap.org/img/wn/${code}@2x.png`;



export default getFormattedWeatherData;
export {formatToLocalTime, iconUrlFromCode};