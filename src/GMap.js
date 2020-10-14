import React, { useEffect, useRef } from 'react';

const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  // list of the marker object along with icon, title & info
  const markerList = [
    {
      lat: 59.2967322,
      lng: 18.0009393,
      icon: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png',
      info: '<div><h2>Info 1</h2><p>Lorem Ipsum is simply dummy text<br/> of the printing and typesetting industry.</p></div>',
      title: "Title 1"
    },
    {
      lat: 59.2980245,
      lng: 17.9971503,
      icon: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
      info: '<div><h2>Info 2</h2><p>Lorem Ipsum is simply dummy text<br/> of the printing and typesetting industry.</p></div>',
      title: "Title 2"
    },
    {
      lat: 59.2981078,
      lng: 17.9980875,
      icon: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png',
      info: '<div><h2>Info 3</h2><p>Lorem Ipsum is simply dummy text<br/> of the printing and typesetting industry.</p></div>',
      title: "Title 3"
    },
    {
      lat: 59.2987638,
      lng: 17.9917639,
      icon: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png',
      info: '<div><h2>Info 4</h2><p>Lorem Ipsum is simply dummy text<br/> of the printing and typesetting industry.</p></div>',
      title: "Title 4"
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
      zoom: 8
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
      scaledSize: new window.google.maps.Size(50, 50)
    },
    title: markerObj.title
  });

  const infowindow = new window.google.maps.InfoWindow({ content: markerObj.info });
  marker.addListener("click", () => infowindow.open(googleMap, marker));

  return marker;
}

  return <div
    ref={googleMapRef}
    style={{ width: 600, height: 500 }}
  />
}

export default GMap;