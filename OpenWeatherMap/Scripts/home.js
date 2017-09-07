$(document).ready(function () {
     clearWeather();

    $('#get-weather-button').on('click', function () {
        
        var haveValidationErrors = checkZipCodeValidationErrors($('#get-zip').val())
      if(haveValidationErrors){
          return false;
      }
        clearWeather();
        currentWeather();
        fiveDayForecast();
    });


})

 function currentWeather() {

      
        
        var zip = $('#get-zip').val();
        var units = $('#get-unit').val();
        var urlFull = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',US&units=' + units + '&appid=c4aeafe25268a015afb944119f6b4ea4';

        $.ajax({
            type: 'GET',
            url: urlFull,
            success: function (weatherData) {

                var wind =  (units === 'metric') ? 'meter/sec' : 'miles/hour';
                var temp = (units === 'metric') ? 'C' : 'F';
                var weather = weatherData.weather[0];
                
                $('#weatherIcon').append('<img src="https://openweathermap.org/img/w/'+ weather.icon +'.png" />');
                $('#weatherDescription').append(weather.description);
                $('#weatherTemp').append('Temperature: ' + weatherData.main.temp + ' ' + temp);
                $('#weatherHumidity').append('Humidity: ' + weatherData.main.humidity+'%');
                $('#weatherWindSpeed').append('Wind: ' + weatherData.wind.speed + ' ' + wind);
               // wind: meter/sec = Metric, miles/hour = Imperial
                //temp: Celsius= Metric, Fahrenheit = imperial
            },
            error: function (a, b, c) {
                alert('')

            }
        });
    
      
    $('#currentConditions').show();
    }

function clearWeather(){
    $('#weatherIcon').empty();
    $('#weatherDescription').empty();
    $('#weatherTemp').empty();
    $('#weatherHumidity').empty();
    $('#weatherWindSpeed').empty();

    for(index=0;index < 5; index++)
    {
        $('#data-day'+index).empty();
        $('#data-weather-icon-day' + index).empty();
        $('#data-weather-description-day' + index).empty();
        $('#data-temperature-day' + index).empty();
    }
    $('#fiveDayForecast').hide();
    $('#currentConditions').hide();
}


function fiveDayForecast(cityId){
   
    var zip = $('#get-zip').val();
    var units = $('#get-unit').val();
    var urlFull='https://api.openweathermap.org/data/2.5/forecast/daily?zip='+zip+',US&units='+units+'&appid=c4aeafe25268a015afb944119f6b4ea4'
    $.ajax({
        type: 'GET',
        url: urlFull,
        success: function (weatherCollection) {

            var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
            var temp = (units === 'metric') ? 'C' : 'F';

            $.each(weatherCollection.list,function(index, value){
                var day = new Date(value.dt*1000);
                var dayFormat = day.getDate() + ' '+ month[day.getMonth()];
                
                if(index <5) {
                $('#data-day'+index).append(dayFormat);    
                                        
            $('#data-weather-icon-day' + index).append('<img src="https://openweathermap.org/img/w/' + value.weather[0].icon + '.png" />');
            $('#data-weather-description-day' + index).append(value.weather[0].main);
            $('#data-temperature-day' + index).append('H '+ value.temp.max +' '+ temp+' L '+ value.temp.min + ' ' + temp );
    

                }
            });
        
        },
        error: function (a, b, c) {
            alert('')

        }
    });

      $('#fiveDayForecast').show();
  
}

function checkZipCodeValidationErrors(input){
    $('#errorMessages').empty();

    var errorMessages = [];


        if(input.length != 5) {
            var errorField = $('label[for=' + input.id+']').text();
            errorMessages.push(errorField + 'Zipcode: Please enter a 5-digit zip code');
        }
        else{
            for(index=0;index < 5; index++)
            {
                if(!(input[index]>='0' && input[index]<='9'))
                {
                    var errorField = $('label[for=' + input.id+']').text();
                errorMessages.push(errorField + 'Zipcode: Please re-enter a 5-digit zip code');
                break;
                }

            }
        }

    if(errorMessages.length > 0){
        $.each(errorMessages,function(index, message){
            $('#errorMessages').append($('<li>').attr({class:'list-group-item list-group-item-danger'}).text(message));
        });
        return true;
    }else{
        return false;
    }


}