/* Global Variables */
const BaseURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const API_KEY = "&appid=1ea31cdaaa73a6c4e9c44569093b3f74&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// create a variable for zipcode
let ZIP ="";
// add event listener for generate button
document.getElementById('generate').addEventListener('click',function(){
    ZIP = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    if (checkFormat(ZIP)){
    getWeather(BaseURL, ZIP, API_KEY)
    .then (function(data){
        let obj ={date:newDate, temp:data.list[0].main.temp,content:feeling};
        postData('/add', obj );
        updateUI();
        console.log("Succsessfully Posted :"+obj);
    });
  }else {
    window.alert("Please enter a valid zipcode.");
  }
});

// fetch the weather information based on the ZIP Code
const getWeather = async (BaseURL,ZIP,API_KEY) => {
    const response = await fetch(BaseURL+ZIP+API_KEY);
    try {
        const data = await response.json();
        return data;
    }catch (error){
        console.log("ERROR: "+error);

    }
}

// check ZIP code format 
function checkFormat(zipcode){
  const regex = /(\d{5})(\d{4})/;
  if (zipcode.length === 5){
    return true;
  }else if(zipcode.length === 9){
    ZIP = zipcode.replace(/(\d{5})(\d{4})/, "$1-$2");
    return true;
  }else 
  return false;
}

// ASYNC POST
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

// UPDATE UI
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = "Date : "+allData.date;
      document.getElementById('temp').innerHTML = "Temperature : "+allData.temp;
      document.getElementById('content').innerHTML ="I feel : "+allData.content;
  
    }catch(error){
      console.log("error", error);
    }
  }