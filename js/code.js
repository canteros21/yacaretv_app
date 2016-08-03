$(document).ready(function(){



      $('#slides').slidesjs({
        width: 940,
        height: 270,
        play: {
          active: true,
          auto: true,
          interval: 8000,
          swap: true
        }
      });
    


});





function popUpVideo (num) {
  switch (num) {
    case 1:
      var ruta = "//player.vimeo.com/video/96868515";
      showSuscribe(ruta);
      break;
    case 2:
      var ruta = "//player.vimeo.com/video/96865278";
      showSuscribe(ruta);
      break;
  }
}



var popUp = false;
function showSuscribe(ruta){
          if(!popUp){
              document.getElementById("popup-container").style.display = "block";
              document.getElementById("slider").src = ruta;
              popUp = true;
            }
          }

function closeSuscribe(){
  document.getElementById("popup-container").style.display = "none";
  document.getElementById("slider").src = "#";
  popUp = false;
}


/*********************************************************************************************************************************************************/
/*********************************************************************************************************************************************************/
/*********************************************************************************************************************************************************/


function menuDesplegable() {

  document.getElementById("btnDesplegable").style.display = "block";

}

function menuPlegar () {
  document.getElementById("btnDesplegable").style.display = "none";
}


/*********************************************************************************************************************************************************/
/*********************************************************************************************************************************************************/
/*********************************************************************************************************************************************************/



function initialize() {
  
  var latlng = new google.maps.LatLng(-27.463320, -58.828661);
  var settings = {
    zoom: 15,
    center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  var map = new google.maps.Map(document.getElementById("map_canvas"), settings);

  var companyLogo = new google.maps.MarkerImage('img/yacare.png',
    new google.maps.Size(60,120),
    new google.maps.Point(0,0),
    new google.maps.Point(15,95)
);

  var companyPos = new google.maps.LatLng(-27.463320, -58.828661);
  
  var companyMarker = new google.maps.Marker({
    position: companyPos,
    map: map,
    icon: companyLogo,
    title:"Yacare TV"
  });

  var contentString = '<div id="content" style="color: #000; width: 200px;">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Yacare TV</h1>'+
    '<div id="bodyContent">'+
    '<p>La productora audiovisual para TV, publicidad y redes sociales con más presencia en el Litoral Argentino. Con clientes tanto regionales como de todo el país.</p>'+
    '</div>'+
    '</div>';
 
var infowindow = new google.maps.InfoWindow({
    content: contentString
});

google.maps.event.addListener(companyMarker, 'click', function() {
infowindow.open(map,companyMarker);
});
}
