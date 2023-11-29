import React from 'react';
import { action } from '@storybook/addon-actions';
import ReactMapGL from 'react-map-gl';
import Map from '../Map';
import { CustomMarker } from '../Map/Markers';
import Route from './route-example';
import Stop from '../Stop';

export default {
  title: 'Map',
  argTypes: {
    color: {
      options: ['blue', 'red', 'green', 'orange'],
      control: { type: 'select' },
      defaultValue: 'red',
    },
    pinColor: {
      options: ['blue', 'red', 'gray', 'orange'],
      control: { type: 'select' },
      defaultValue: 'red',
    }
  }
};

const MAPBOX_API_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
const MAPBOX_MAP_STYLE = process.env.REACT_APP_MAPBOX_MAP_STYLE;

export const CleanMap = () => (<Map routes={[Route]} />);
export const Markers = (props) => {
  return (
    <ReactMapGL
      width={'100%'}
      height={'100vh'}
      latitude={-33.6831263}
      longitude={-59.6579517}
      zoom={15}
      mapStyle={MAPBOX_MAP_STYLE}
      mapboxApiAccessToken={MAPBOX_API_ACCESS_TOKEN}
    >
      <CustomMarker
        lat={-33.6831263}
        lng={-59.6579517}
        color={props.color}
        pinColor={props.pinColor}
        onClick={action('click')}
      />
    </ReactMapGL>
  );
};
export const CustomerStop = () => (<Stop route={Route} customer={Route.pathway[0]} />);
