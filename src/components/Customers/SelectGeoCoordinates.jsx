import { useState, useEffect, useMemo } from 'react';
import throttle from 'lodash/throttle';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const MAPBOX_API_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
const MAPBOX_MAP_STYLE = process.env.REACT_APP_MAPBOX_MAP_STYLE;

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  fill: '#6F9CEB',
  stroke: 'none'
};

function Pin(props) {
  const { size = 20 } = props;

  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
}

const SelectGeoCoordinates = ({ onChange, latitude, longitude, initialInputValue }) => {
  const [marker, setMarker] = useState({
    latitude,
    longitude,
  });
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 8,
    bearing: 0,
    pitch: 0
  });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();

  const fetch = useMemo(
    () =>
      throttle((input, callback) => {
        setLoading(true);
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(input)}.json`, {
          params: {
            access_token: MAPBOX_API_ACCESS_TOKEN,
            autoComplete: true,
          },
        })
          .then(({ data }) => {
            setLoading(false);
            return callback(data);
          })
      }, 1000),
    [],
  );

  useEffect(() => {
    setInputValue(initialInputValue || '');
  }, [])

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results.features];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const onMarkerDragEnd = (event) => {
    onChange({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });
  };

  const handleClick = (e) => {
    onChange({
      longitude: e.lngLat[0],
      latitude: e.lngLat[1]
    });
    setMarker({
      longitude: e.lngLat[0],
      latitude: e.lngLat[1]
    });
  };

  const onOptionSelected = (option) => {
    if (!option || !option.geometry) {
      return;
    }

    onChange({
      longitude: option?.geometry.coordinates[0],
      latitude: option?.geometry.coordinates[1],
    });
    setMarker({
      longitude: option?.geometry.coordinates[0],
      latitude: option?.geometry.coordinates[1],
    });
    setViewport({
      ...viewport,
      longitude: option?.geometry.coordinates[0],
      latitude: option?.geometry.coordinates[1],
      zoom: 15,
    });
  }

  return (
    <Box>
      <Box my={2}>
        <Alert severity="info">
          {t('Search a place with the search box or drag the pin around to the desired location')}
        </Alert>
      </Box>
      <FormControl fullWidth margin="none">
        <Autocomplete
          id="asynchronous-demo"
          fullWidth
          getOptionSelected={(option, value) => option.place_name === value.place_name}
          getOptionLabel={(option) => option.place_name}
          options={options}
          loading={loading}
          value={value}
          disableClearable
          inputValue={inputValue}
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);

            onOptionSelected(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={t("Search location")} variant="outlined" fullWidth />
          )}
        />
      </FormControl>
      <ReactMapGL
        width={'100%'}
        height={'500px'}
        {...viewport}
        onViewportChange={setViewport}
        mapStyle={MAPBOX_MAP_STYLE}
        mapboxApiAccessToken={MAPBOX_API_ACCESS_TOKEN}
        onClick={handleClick}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={30} />
        </Marker>
        <div style={{ position: 'absolute', top: '0', left: 0, padding: '10px' }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </Box>

  );
}

export default SelectGeoCoordinates;
