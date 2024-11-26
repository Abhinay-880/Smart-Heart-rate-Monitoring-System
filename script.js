const channelID = "2649943";
const readAPIKey = "HR241TPLGHRMGBVA"; // Updated read API key
const writeAPIKey = "W5B02FMS63LWOPKG"; // Updated write API key (if needed for sending data)

// Fetch data from ThingSpeak API
function fetchData() {
    const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}&results=1`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.feeds && data.feeds.length > 0) {
                const feed = data.feeds[0];
                const heartRate = feed.field1 || '--'; // Field 1: Heart Rate
                const spO2 = feed.field2 || '--'; // Field 2: SpO2
                
                document.getElementById("heartRate").innerText = heartRate;
                document.getElementById("spO2").innerText = spO2;
            } else {
                console.warn("No data available in ThingSpeak feed.");
                document.getElementById("heartRate").innerText = "--";
                document.getElementById("spO2").innerText = "--";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Fetch data every 30 seconds
setInterval(fetchData, 30000);

// Initial fetch
fetchData();

// Optional: Function to send data to ThingSpeak (using the write API key)
function sendData(heartRate, spO2) {
    const url = `https://api.thingspeak.com/update?api_key=${writeAPIKey}&field1=${heartRate}&field2=${spO2}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to update ThingSpeak! status: ${response.status}`);
            }
            console.log("Data sent successfully to ThingSpeak.");
        })
        .catch(error => console.error("Error sending data:", error));
}

