import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
// import { useContext } from 'react';
import Map from 'react-map-gl';
// import { AuthContext } from '../contexts/AuthContexts';

const AppMap = () => {
  //   const { profile, isLogIn } = useContext(AuthContext);

  const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;

  if (!mapToken) {
    throw new Error('Mapbox Token is not defined');
  }

  // 現在地の取得

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setViewport({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => {
        // 現在地が取れない時は東京駅の緯度軽度を入れる
        setViewport({
          latitude: 35.681236,
          longitude: 139.767125,
        }),
          console.log(err);
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {viewport.latitude !== 0 && viewport.longitude !== 0 ? (
          <Map
            mapboxAccessToken={mapToken}
            initialViewState={{
              longitude: viewport.longitude,
              latitude: viewport.latitude,
              zoom: 14,
            }}
            style={{ width: '100vw', height: 'calc(100vh - 56px)' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          />
        ) : (
          <div>地図を読み込んでいます</div>
        )}
      </header>
    </div>
  );
};

export default AppMap;
