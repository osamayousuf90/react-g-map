import React, { useEffect, useRef } from 'react';

const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  // list of the marker object along with icon, title & info
  const markerList = [
    {
      lat:47.359423,
      lng:-122.021071,
      icon: 'https://cdn.onlinewebfonts.com/svg/img_518849.png',
      info: '<div class="card"><h2>Info 3</h2><p>Lorem Ipsum is simply dummy text<br/> of the printing and typesetting industry.</p></div>',
      title: "Title 3"
    }
  ];

  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    markerList.map(x => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
    googleMap.fitBounds(bounds); // the map to contain all markers
  }, []);


  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 4
    });
  }

// create marker on google map
const createMarker = (markerObj) => {
  const marker = new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    map: googleMap,
    icon: {
      url: markerObj.icon,
      // set marker width and height
      scaledSize: new window.google.maps.Size(30, 30)
    },
    title: markerObj.title
  });

  const infowindow = new window.google.maps.InfoWindow({ content: markerObj.info });
  marker.addListener("click", () => infowindow.open(googleMap, marker));

  return marker;
}

  return <div
    ref={googleMapRef}
    style={{ width: 1580, height: 500 }}
  />
}

export default GMap;