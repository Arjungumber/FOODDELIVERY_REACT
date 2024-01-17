import React, { useEffect, useState } from "react";
import classes from "./map.module.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer, // it shows tile of the map,responsible for images of map and they together make a map
  Marker, // it is responsible for the marker
  Popup, // for some extra information of the marker
  useMapEvents,
} from "react-leaflet";
// these react-leaflet and the leaflet packages are opensorce and responsible for map
import { toast } from "react-toastify";
import * as L from 'leaflet'; 

// readonly and the location is something that comes to the map
// and onchange is an event that sends data from the map to the outside
export default function Map({ readonly, location, onChange }) {
  return (
    <div className={classes.container}>
      <MapContainer
        className={classes.map}
        center={[0,0]}
        zoom={1} // shows whole map of the world
        dragging={!readonly} // keeping all these not onlyread
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* this shows how tile images will be rendered */}
        <FindButtonAndMarker
          readonly={readonly}
          location={location}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
}

function FindButtonAndMarker({ readonly, location, onChange }) {
  const [position, setPosition] = useState(location);
  useEffect(() => {
    if (readonly) {
      map.setView(position, 13);
      // 13 means it is very zoomed to the selected position
      return;
    }
    if (position) onChange(position);
  }, [position]);
  //inside useffect we only listening to the changes of position

  const map = useMapEvents({
    // we'r having 3 events click locationfound and locationerror
    click(e) {
      !readonly && setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
    locationerror(e) {
      toast.error(e.message);
    },
  });

  const markerIcon = new L.icon({
    iconUrl:'/marker-icon-2x.png',
    iconSize:[25,41],
    iconAnchor:[12.5,41],
    popupAnchor:[0,-41],
  })



  return (
    <>
      {!readonly && (
        <button
          type="button"
          className={classes.find_location}
          onClick={() => map.locate()}
        >
          Find My Location
        </button>
      )}
      {position && (
        <Marker
          // we r using an event dragend in eventhandlers, it syas when we drag the marker wr seting the new position.
          eventHandlers={{
            dragend: (e) => {
              setPosition(e.target.getLatLng());
            },
          }}
          position={position}
          draggable={!readonly}
          icon={markerIcon}
        >
          <Popup>Shipping Location</Popup>
        </Marker>
      )}
    </>
  );
}
