import { useEffect } from 'react';

function setMapDimensions() {
    const map = document.querySelector(`#map`);
    const main = document.querySelector('main');
    map.style.height = main.clientHeight+'px';
    map.style.width = main.clientWidth+'px';
}

function initiateMap(position) {
    return new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=jwOH9FS8f3MmWVVRkj7V', // stylesheet location
        center: [ position[0], position[1]+5 ], // starting position slightly dislocated to the south
        zoom: 3
    });
}

function createMarker(coordinatesArr, map) {
    return new maplibregl.Marker()
    .setLngLat(coordinatesArr)
    .addTo(map);
}

function MyMap({ coordinates }) {
    let map, marker;
    
    useEffect(()=> { setMapDimensions(); }, []);
    useEffect(()=> { 
        map = initiateMap(coordinates);
        marker = createMarker(coordinates, map);
    }, [ coordinates ]);
    
    return <div id='map' style={{ width:"100%", height:"100%" }}></div>;
}
export default MyMap;
