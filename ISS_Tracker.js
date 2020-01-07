p5.disableFriendlyErrors = true; // disables FES
var cnv;
var res;
let map;
let iss;

setInterval(plot, 3000);

function preload() {
    map = loadImage('Media/ISS_tracker/map.png');
    iss = loadImage('Media/ISS_tracker/ISS.png');
}

function setup() {
    MapWidth = 870;
    MapHeight = 580;
    cnv = createCanvas(MapWidth, MapHeight);
    var xx = (windowWidth - width) / 2;
    cnv.position(xx, null);
    cnv.parent("cnv")
    plot();
}

function windowResized() {
    var xx = (windowWidth - width) / 2;
    cnv.position(xx, null);
}

function plot() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://api.wheretheiss.at/v1/satellites/25544',
        async: false,
        crossDomain: true,
        complete: function(data) {
            if (data.readyState === 4 && data.status === 200) {
                Lat = data.responseJSON.latitude;
                Long = data.responseJSON.longitude;
                Velocity = data.responseJSON.velocity.toFixed(2).toString();
                Altitude = data.responseJSON.altitude.toFixed(2).toString();
                var x = (parseFloat(Long) + 180) * (MapWidth / 360);
                var latRad = parseFloat(Lat) * Math.PI / 180;
                var mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
                var y = (MapHeight / 2) - (MapWidth * mercN / (2 * Math.PI));
                clear()
                background(map);
                noStroke();
                let col = color(200, 25, 20)
                fill(col);
                circle(x, y, 8);
                image(iss, x - 55, y - 53, 100, 100);
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes();
                var str = 'Time: '
                var text = str.concat(time, ' \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Velocity = ', parseFloat(Velocity), '\xa0\xa0 km/h \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Altitude = ', parseFloat(Altitude), '\xa0\xa0 km');
                document.getElementById("text").innerHTML = text;
            }
        }
    });
}