document.addEventListener('DOMContentLoaded', populateList);

function populateList() {
    // Fetch the list of cryptocurrencies
    fetch('http://127.0.0.1:5001/default/crypto')
        .then(response => response.json())
        .then(data => {
            // Get the dropdown list element
            const dropdown = document.getElementById('symbol');

            // Clear existing options
            dropdown.innerHTML = '';

            // Add new options from the fetched data
            data.forEach(crypto => {
                let option = document.createElement('option');
                option.value = crypto.toLowerCase();
                option.textContent = crypto.toUpperCase() + ' (' + crypto.charAt(0).toUpperCase() + crypto.slice(1).toLowerCase() + ')';
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
};

var currentPage = 1;
var commentsPerPage = 10; 

            function runSemanticSearch(){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        // Get the comment-list element
                        var commentList = document.getElementById("comment-list");
                    
                        // Clear the content of the "comment-list" unordered list
                        if (commentList) {
                            commentList.innerHTML = ""; // Clear the existing content
                        }
                    
                        // Parse the JSON response
                        var response = JSON.parse(this.responseText);
                    
                        // Get the comments from the response
                        var comments = response.comments_matching_keywords;
                        // Check if comments are found
                        if (comments && comments.length > 0) {
                            // Create a new unordered list element
                            var ul = document.createElement("ul");
                            ul.id = "comment-list";
                    
                            // Iterate through the comments and create list items
                            comments.forEach(function(comment) {
                                var li = document.createElement("li");
                                li.textContent = comment;
                                ul.appendChild(li);
                            });
                    
                            // Append the new list to the "comment-list" element
                            if (commentList) {
                                commentList.appendChild(ul);
                            } else {
                                console.error("comment-list element not found");
                            }
                        } else {
                            // Display a message if there are no comments
                            if (commentList) {
                                commentList.innerHTML = "<li>No comments matching the keywords found.</li>";
                            } else {
                                console.error("comment-list element not found");
                            }
                        }
                    }
                    
                };
                xhttp.open("GET",`http://127.0.0.1:5001/semantic?keyword=${document.getElementById('query').value}`, true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send();
            }

            // Function to display comments for the current page
            function displayCommentsForPage() {
                var startIndex = (currentPage - 1) * commentsPerPage;
                var endIndex = startIndex + commentsPerPage;
                
                var commentList = document.getElementById("comment-list");
                commentList.innerHTML = ""; // Clear existing content
                
                for (var i = startIndex; i < endIndex && i < comments.length; i++) {
                    var li = document.createElement("li");
                    li.textContent = comments[i];
                    commentList.appendChild(li);
                }
                
                // Update page information
                var pageInfo = document.getElementById("page-info");
                pageInfo.textContent = "Page " + currentPage;
            }

            // Handle next page button click
            var nextPageButton = document.getElementById("next-page");
            nextPageButton.addEventListener("click", function() {
                var totalPages = Math.ceil(comments.length / commentsPerPage);
                
                if (currentPage < totalPages) {
                    currentPage++;
                    displayCommentsForPage();
                }
            });

            // Handle previous page button click
            var prevPageButton = document.getElementById("prev-page");
            prevPageButton.addEventListener("click", function() {
                if (currentPage > 1) {
                    currentPage--;
                    displayCommentsForPage();
                }
            });
            // Call the display function initially
            displayCommentsForPage();

function fetchCryptoGraphData() {
                const symbol = document.getElementById('symbol').value;
                const fromDate = document.getElementById('fromDate').value;
                const toDate = document.getElementById('toDate').value;
                //const url = `http://127.0.0.1:5001/crypto/graph-display?symbol=${symbol}`;
                const url = `http://127.0.0.1:5001/crypto/graph-display?symbol=${symbol}&fromDate=${fromDate}&toDate=${toDate}`;
                console.log(`url ${url}`)
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.blob(); // Assuming the response is an image
                    })
                    .then(blob => {
                        if (blob.size === 0) {
                            throw new Error('Blob is empty. No image data received.');
                        }
                        const imgURL = URL.createObjectURL(blob);
                        document.getElementById('cryptoData').innerHTML = `<img src="${imgURL}" alt="Crypto Graph">`;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        document.getElementById('cryptoData').innerHTML = `Graph display error ${error}`
                    });
}
                        
function fetchCryptoData() {
    // Get the selected symbol, fromDate, and toDate from the form
    var symbol = document.getElementById("symbol").value;
    // Get the fromDate and toDate inputs
    var fromDateInput = document.getElementById("fromDate");
    var toDateInput = document.getElementById("toDate");

    // Get the values in MM/DD/YYYY format
    var fromDateMMDDYYYY = fromDateInput.value;
    var toDateMMDDYYYY = toDateInput.value;
    console.log(`symbol=${symbol}&fromDate=${fromDateInput.value}&toDate=${toDateInput.value}`)
    // Construct the URL with the parameters
    var url = `http://127.0.0.1:5001/crypto/graph?symbol=${symbol}&fromDate=${fromDateInput.value}&toDate=${toDateInput.value}`;

    // Make the HTTP request
    fetch(url)
        .then(function(response) {
            if (response.status !== 200) {
                console.log(`Error: ${response.status}`);
                return;
            }
            return response.json();
        })
        .then(function(data) {
            // Handle the JSON data here
            console.log(data);
            // You can process and display the data as needed
            var cryptoDataDiv = document.getElementById("cryptoData");
            // Assuming 'data' contains the information you want to display
            // Create a canvas element to render the chart
            var canvas = document.createElement("canvas");
            canvas.id = "candlestickChart";
            canvas.width = 800; // Set the width as needed
            canvas.height = 400; // Set the height as needed

            cryptoDataDiv.appendChild(canvas);

            // Process and format the data for Chart.js
            var chartData = {
                datasets: [{
                    label: "Candlestick Chart",
                    data: [],
                    borderColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderWidth: 2
                }]
            };
            // Function to format the date as MM/DD/YYYY
            function formatDate(date) {
                var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero to month
                var day = date.getDate().toString().padStart(2, '0'); // Add leading zero to day
                var year = date.getFullYear();
                return month + '/' + day + '/' + year;
            }
            // Extract and format the data from 'data' for the chart
            Object.keys(data.Open).forEach(function (timestamp) {
                var date = new Date(parseInt(timestamp));
                var formattedDate = formatDate(date);  //date.toLocaleDateString('en-US');
                console.log(formattedDate); // Log the formatted date
                chartData.datasets[0].data.push({
                    t: formattedDate,
                    o: data.Open[timestamp],
                    h: data.High[timestamp],
                    l: data.Low[timestamp],
                    c: data.Close[timestamp]
                });
            });
            
            // Create the candlestick chart using Chart.js
            var ctx = document.getElementById('candlestickChart').getContext('2d');
            new Chart(ctx, {
                type: 'candlestick',
                data: chartData,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                parser: 'MM/DD/YYYY', // Specify the date format
                                tooltipFormat: 'MM/DD/YYYY', 
                                unit: 'day'
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price'
                            }
                        }
                    }
                }
            });
            
        })
}

