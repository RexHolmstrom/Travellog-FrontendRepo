import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 55.1736,
    longitid: -23.8948,
    zoom: 3,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/rexholmstrom/ckeom0yvs4d1r1ankxvt3lcch"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {logEntries.map((entry) => (
        <Marker
          key={entry._id}
          latitude={entry.latitude}
          longitude={entry.longitid}
          // offsetLeft={-12}
          // offsetTop={-24}
        >
          <div>
            <img
              className="marker"
              style={{
                height: `${6 * viewport.zoom}px`,
                width: `${6 * viewport.zoom}px`,
              }}
              src="https://i.imgur.com/y0G5YTX.png"
              alt="marker"
            />
          </div>
        </Marker>
      ))}
      <Popup
        latitude={37.78}
        longitude={-122.41}
        closeButton={true}
        closeOnClick={true}
        onClose={() => this.setState({ showPopup: false })}
        anchor="top"
      >
        <div>You are here!</div>
      </Popup>
    </ReactMapGL>
  );
};

export default App;
