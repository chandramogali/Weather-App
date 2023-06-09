
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButton';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempratureAndDetails from './components/TempratureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useState,useEffect } from 'react';


function App() {

 const [query, setQuery]=useState({q:"Delhi"});
 const [units, setUnits]= useState("metric");
 const [weather, setWeather]=useState(null)

  useEffect( () =>{
    const fetchWeather = async() =>{
       await  getFormattedWeatherData({...query, ...units}).then(
        (data)=>{
          setWeather(data);
        }
       )
       
      
    }
    fetchWeather();
  },[query,units])

  

  return (
   <div  className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ">
  <TopButtons setQuery ={setQuery}/>
  <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

     {weather &&(
      <div>
      <TimeAndLocation  weather={weather}/>
       <TempratureAndDetails weather={weather}/>
  
       {/* <Forecast title="hourly forecast" />
      <Forecast  title="daily forecast"/> */}
  
      </div>
     )}
  
   </div>
  );
}

export default App;
