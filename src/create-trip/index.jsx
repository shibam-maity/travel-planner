import React from 'react'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTraveleslist, AI_PROMPT } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { chatSession } from '@/service/AIModal';
import { toast } from 'sonner';




const CreateTrip = () => {
  const [place,setPlace]=useState();

const [formData,setFormData]=useState({});
const [searchQuery, setSearchQuery] = useState('');
const [suggestions, setSuggestions] = useState([]);

const handleInputChange=(name,value)=>{
  setFormData({...formData,[name]:value})

  
}
useEffect(()=>{
  console.log(formData);
},[formData])

const fetchPlaceSuggestions = async (input) => {
  if (!input) return;
  try {
    const response = await fetch(
      `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${input}&key=AlzaSyI9ApEVPyK9cIhgH5kSehjBGpBEG0fuiNY`
    );
    const data = await response.json();
    if (data.status === 'OK') {
      setSuggestions(data.predictions);
    }
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

const OnGenerateTrip=async()=>
{
 if (formData?.noofDays>30&&!formData?.location||!formData?.budget||!formData?.travelers){
  toast.error('Please fill all the fields');

  return;

 }
 const FINAL_PROMPT = AI_PROMPT
 .replace('{location}',formData?.location)
 .replace('{noofDays}',formData?.noofDays)
 .replace('{travelers}',formData?.travelers)
 .replace('{budget}',formData?.budget)
 .replace('{totalDays}',formData?.noofDays)

 console.log(FINAL_PROMPT);
 const result = await chatSession.sendMessage(FINAL_PROMPT);
 console.log(result?.response?.text());
}

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-25 px-8 py-12'>
      <h2 className='text-5xl font-bold text-center'> Tell us about your trip preferences 🏕️</h2>
      <p className='mt-4text-lg text-center text-gray-600 mt-2' >Just provide some basic information,and our trip planner will generate a personalized itinerary for your preferences</p>
      
      <div className="mt-10 flex flex-col gap-1 ">
        <div>
          <h2 className='text-xl my-4 font-bold mx-1'>Enter your destination</h2>
          <div className="relative">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchPlaceSuggestions(e.target.value);
              }}
              placeholder="Search for a place..."
              className="w-full"
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(suggestion.description);
                      handleInputChange('location', suggestion.description);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div >
          <h2 className='text-xl my-4 font-bold mx-1'  >For how many days are you planning your trip?</h2>
                <Input type='number' placeholder='Enter the number of days'
                onChange={(e)=>handleInputChange('noofDays',e.target.value)}
                
                />

        </div>        
      </div>
      <div>
        <h2 className='text-xl my-4 font-bold mx-1 mt-20'  >What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-4'>
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index}
            onClick={()=>handleInputChange('budget',item.tittle)}
             className={` p-4 rounded-lg border hover:shadow-lg 
             hover:scale-105 transition-all duration-400 
             ${formData?.budget == item.tittle && 'border-black'}`}>
                  <h2 className='text-3xl'> {item.icon}</h2>
                  <h2 className='font-bold text-2xl '> {item.tittle}</h2>
                  <h2 className='text-sm text-gray-600 '> {item.desc}</h2> 

            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-xl my-4 font-bold mx-1'  >Who do you plan on travelling with on this trip?</h2>
        <div className='grid grid-cols-4 gap-4'>
          {SelectTraveleslist.map((item,index)=>(
            <div key={index}
            onClick={()=>handleInputChange('travelers',item.people)}
             className={` p-4 rounded-lg border hover:shadow-lg
              hover:scale-105 transition-all duration-400
              ${formData?.travelers == item.people && 'border-black'}`}>
                  <h2 className='text-3xl'> {item.icon}</h2>
                  <h2 className='font-bold text-2xl '> {item.tittle}</h2>
                  <h2 className='text-sm text-gray-600 '> {item.desc}</h2> 

            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>

      
    </div>

  )
}

export default CreateTrip
