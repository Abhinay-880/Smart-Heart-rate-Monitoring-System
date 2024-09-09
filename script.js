// Replace with your Thingspeak Channel ID and Read API Key
const channelID = "2649943";
const readAPIKey = "CXCKMXNMLICUB009";

// Fetch data from Thingspeak API
function fetchData() {
    const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}&results=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const feed = data.feeds[0];
            const heartRate = feed.field1;
            const spO2 = feed.field2;
            
            document.getElementById("heartRate").innerText = heartRate;
            document.getElementById("spO2").innerText = spO2;
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data every 30 seconds
setInterval(fetchData, 30000);

// Initial fetch
fetchData();
