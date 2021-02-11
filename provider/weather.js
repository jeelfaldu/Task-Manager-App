//navigator.geolocation.getCurrentPosition("","")
function getLocation() {
    let options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        console.log('Locating…');

        var id = navigator.geolocation.watchPosition(result => {
            console.log(result);
            const latitude = result.coords.latitude;
            const longitude = result.coords.longitude;
            api(latitude, longitude)
            status.textContent = '';
            navigator.geolocation.clearWatch(id);
        }, null, options);
    }

}

function api(lat, long) {
    fetch(`https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&latitude=${lat}&longitude=${long}&oneobservation=true&apiKey=yQ3jUXZUYmSRbF_BxIlghgIsIZ63fXZEvHtv_FudBqA`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("city").innerHTML = data.observations.location[0].city
            //document.getElementById("temp").innerHTML = data.observations.location[0].observation[0].city
            document.getElementById("skyDescription").innerHTML = data.observations.location[0].observation[0].skyDescription
            document.getElementById("temp").innerHTML = data.observations.location[0].observation[0].temperature + "°"
            document.getElementById("windSpeed").innerHTML = "Wind: " + data.observations.location[0].observation[0].windSpeed + "  mph"
            document.getElementById("icon").src = data.observations.location[0].observation[0].iconLink + "?apiKey=yQ3jUXZUYmSRbF_BxIlghgIsIZ63fXZEvHtv_FudBqA"
            document.getElementById("temperatureDesc").innerHTML = data.observations.location[0].observation[0].temperatureDesc
        });
}

const gitapi = "bxqK6wfJwFjYKxBqoRISkErrvtlfAZlK"
function getGif() {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${gitapi}&limit=20`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let i = 0
            setInterval(() => {
                if (i == 20) {
                    i = 0
                }
                document.getElementById("myImg").src = data.data[i].embed_url;
                i++;
            }, 5000);
        })
}
getGif()

