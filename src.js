LATITUDE = 45.762692;
LONGITUDE = 4.823116;

const THRESHOLDDISTACE = 2;

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Earth's radius in kilometers
  
    // Convert latitude and longitude from degrees to radians
    const lat1Rad = (Math.PI / 180) * lat1;
    const lon1Rad = (Math.PI / 180) * lon1;
    const lat2Rad = (Math.PI / 180) * lat2;
    const lon2Rad = (Math.PI / 180) * lon2;
  
    // Calculate the differences between the latitudes and longitudes
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
  
    // Haversine formula
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Calculate the distance in kilometers
    const distance = earthRadius * c;
  
    return distance;
}

function findMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
    const chicken_dance = document.querySelector("#step-2");

    mapLink.status = ""
    mapLink.textContent = ""

    function success(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
        status.textContent = "";

        if (calculateDistance(latitude, longitude, LATITUDE, LONGITUDE) < THRESHOLDDISTACE){
            mapLink.textContent = "Congrats! You're where you should be!";
            chicken_dance.style.visibility = "visible";
        }
        else{
            mapLink.href="";
            mapLink.textContent = "Not so close, please go to the above location!";
        }
    }

    function error() {
        status.textContent = "Unable to retrieve your location";
    }

    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
      } else {
        status.textContent = "Locating…";
        navigator.geolocation.getCurrentPosition(success, error);
      }
        
}

document.querySelector("#find-me").addEventListener("click", findMe);

counts = 0;

document.querySelector("#check-chicken-dance").addEventListener("click", () => {
    const lie_detector_1 = document.querySelector("#lie-detector-1");
    const lie_detector_2 = document.querySelector("#lie-detector-2");
    const treasure = document.querySelector("#step-3");

    if (counts == 0){
        lie_detector_1.style.display = "none";
        lie_detector_2.style.display = "none";
    }

    else if (counts == 1){
        lie_detector_1.style.display = "block";
        lie_detector_2.style.display = "none";
    }
    else if (counts == 2){
        lie_detector_1.style.display = "block";
        lie_detector_2.style.display = "block";
    }
    else {
        treasure.style.visibility = "visible";
    }
    console.log(counts);
    counts++;
});