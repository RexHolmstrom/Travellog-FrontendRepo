import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { listLogEntries } from "./API";

const App = () => {
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
      console.log(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/rexholmstrom/ckeom0yvs4d1r1ankxvt3lcch"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    />
  );
};

export default App;
