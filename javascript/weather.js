class weather{

     apikey ="3eb87474c325f718e5b1c736d7790fc4";
     lat=0;
     lon=0;

    forecast(loc){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+loc+"&units=metric&appid="+this.apikey).then(response=>response.json()).then(data =>{
      
            document.querySelector("#temperature").innerHTML = data['main']['temp']+"°C";
            document.querySelector("#humidity").innerHTML = "Humidity : "+data['main']['humidity']+"%";
            document.querySelector("#wind").innerHTML = "Wind : "+data['wind']['speed']+"km/s";
            document.querySelector("#condition").innerHTML = "Weather : "+data['weather'][0]['description'];
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+data['coord']['lat']+"&units=metric&lon="+data['coord']['lon']+"&lang=en&appid="+this.apikey).then(response=>response.json()).then(data=>{
                let temp_series = []
                let humidity_series = []
                let weather_series = []
         
                for(let i=0;i<7;i++){
                     humidity_series.push({x:"day"+(i+1),y:data["daily"][i]['humidity']})
                     temp_series.push({x:"day"+(i+1),y:data["daily"][i]['temp']['max']})
                     weather_series.push({x:data['daily'][i]['weather'][0].description,y:"day"+(i+1)})
               } 
         
               JSC.Chart('chartDiv', {
                     // type: 'vertical column',
                     series: [
                     {
                     name:'Temparature Change',
                     points: temp_series
                  }
               ]
            });       
            JSC.Chart('chartDiv2', {
               
                     series: [
                     {
                     name:'Humidity Change',
                     points: humidity_series
                  }
               ]
            });       
            JSC.Chart('chartDiv3', {
                     
                     type:'pie',
                     series: [
                     {
                     name:'Weather Change',
                     points: weather_series
                  }
               ]
            });       

            });
    })}
};

webapp = new weather() 

webapp.forecast("delhi")
document.querySelector('card-heading>input').value="Delhi"

document.querySelector('card-heading>input').addEventListener("change",()=>{
   
    var val = document.querySelector('card-heading>input').value
    webapp.forecast(val)

})
