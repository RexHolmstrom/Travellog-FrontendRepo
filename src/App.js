import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
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
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>{entry.title}</div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default App;
