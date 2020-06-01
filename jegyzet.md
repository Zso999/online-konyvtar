//ezt a fuggvenyt a sorbeepiteshez hasznaltam
//ez szamolja hogy hanyszor kattintottak a gombra
<html>
<head>
    <title>Space Clicker</title>
</head>
<body>
    <script type="text/javascript">
    var clicks = 0;
    function onClick() {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
    };
    </script>
    <button type="button" onClick="onClick()">Click me</button>
    <p>Clicks: <a id="clicks">0</a></p>
</body></html>


//ezt a bejentkezesnel hasznaltam

<button onclick="myFunction()">Replace document</button>
<script>
function myFunction() {
  location.replace("sajatkonyvtar.html")
}
</script>

//fajlbeolvasas

<sript>
  var fileReader = new FileReader(); 
 fileReader.onload = function (e) { 
	 var fileContents = document.getElementById('filecontents');
 //filecontents is a div in the html that displays the file.
	 fileContents.innerText = fileReader.result; 
 } 
 fileReader.readAsText(fileTobeRead); 
</sript>


Fantasy, Romantikus, Sci fi, Tragikus