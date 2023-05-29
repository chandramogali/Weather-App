import React from 'react';



function TopButtons({setQuery }) {

   const cities =[
    {
      id:1,
      title:"Mumbai"
    },
    {
      id:2,
      title:"Hyderabad"
    },
    {
      id:3,
      title:"Delhi"
    },
    {
      id:4,
      title:"Bengaluru"
    },
    {
      id:5,
      title:"Pune"
    },

   ];

  return( <div className="flex items-center justify-around my-6">
      {cities.map((city) => {

         return  <button key={city.id} className="text-white text-lg font-medium"
           onClick={()=> setQuery({q:city.title})}> 
         {city.title} </button>
        })}
        
    </div>
  )
}

export default TopButtons;