function initMap() {
  const ubicacion = { lat: -12.0464, lng: -77.0428 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: ubicacion,
  });

  new google.maps.Marker({
    position: ubicacion,
    map: map,
  });
}
