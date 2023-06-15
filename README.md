# Overview

"Ask Virland" is a chat agent that can be trained to specific data and by asking Virland, she will be able to respond based onthe information that she has been trained on.

# Sample Questions

"do we have any information about US exchanges in our database?"
"do we have any information about S&P 500 in our database"
"what can you tell me about S&P 500?"
"what can you tell me about the ZODIA?"


<body>
    <div id="header">
        <img src="./img/vicon.jpeg" style="float: left; margin-right: 10px;">
    </div>
    <div id="content" style="margin-top: 100px">
        <form>
        <input type="text" id="query" placeholder="Ask Virland">
        <button onclick="runSemanticSearch()">Ask Virland</button>
        </form>
        <div id="result" style="border:1px solid #000; width:250px;">
            The result will be displayed here
        </div>
    </div>
    <div id="footer"></div>
</body>