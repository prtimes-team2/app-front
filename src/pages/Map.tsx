import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
// import { useContext } from 'react';
import type { FeatureCollection } from 'geojson';
import type { CircleLayer } from 'react-map-gl';
import Map, { Layer, Source } from 'react-map-gl';
import { AddFab } from '../components/common/AddFab';

import MapboxLanguage from '@mapbox/mapbox-gl-language';

// import { AuthContext } from '../contexts/AuthContexts';

import { Loading } from '../components/Loading';

const AppMap = () => {
  const [geojson, setGeojson] = useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-122.4, 37.8] },
        properties: {},
      },
    ],
  });

  const [layerStyle /* setLayerStyle */] = useState<CircleLayer>({
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf',
    },
  });

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

    setGeojson({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [139.7426222, 35.6698195],
          },
          properties: {},
        },
      ],
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function onLoadMap(e) {
    const map = e?.target;
    if (map) {
      // 言語設定
      const language = new MapboxLanguage({
        defaultLanguage: 'ja',
      });
      map.addControl(language);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      language._initialStyleUpdate();
    }
  }

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
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onLoad={onLoadMap}
          >
            <Source id="my-data" type="geojson" data={geojson}>
              <Layer {...layerStyle} />
            </Source>
          </Map>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </header>
      <AddFab />
    </div>
  );
};

export default AppMap;
