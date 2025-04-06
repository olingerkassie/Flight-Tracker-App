document.addEventListener("DOMContentLoaded", function() {
    const flightForm = document.getElementById("flightForm");
    if (flightForm) {
        flightForm.addEventListener("submit", function(event){
            event.preventDefault(); // Prevents page reload

            let departure = document.getElementById("departure").value;
            let destination = document.getElementById("destination").value;

            let apiUrl = `https://skyscanner89.p.rapidapi.com/flights/one-way/list`;
            
            let headers = {
                'x-rapidapi-host': 'skyscanner89.p.rapidapi.com',
                'x-rapidapi-key': 'b2a2520e09msh76192030db9959ep1ee67cjsn12b99eac49cf'
            };
            let params = new URLSearchParams({
                from: departure,
                to: destination,
                depart: "2025-10-15", // Replace with actual date
                return: "2025-10-30", // Optional return date
                currency: "USD",
                countryCode: "US",
                locale: "en-US"
            });

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    let data = JSON.parse(this.responseText);
                    if (data.itineraries) {
                        let cheapestFlight = data.itineraries[0].price.formatted;
                        document.getElementById("result").innerHTML = `Cheapest Flight: ${cheapestFlight}`;
                    } else {
                        document.getElementById("result").innerHTML = "No flights found.";
                    }
                }
            });

            xhr.open('GET', `${apiUrl}?${params.toString()}`);
            xhr.setRequestHeader('x-rapidapi-key', headers['x-rapidapi-key']);
            xhr.setRequestHeader('x-rapidapi-host', headers['x-rapidapi-host']);

            xhr.send(null);
        });
    } else {
        console.error("Element with ID 'flightForm' not found.");
    }
});