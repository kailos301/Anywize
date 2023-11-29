import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MarkerIconGray from 'assets/markers/marker-icon-grey.png';
import MarkerIconBlue from 'assets/markers/marker-icon-blue.png';
import MarkerIconRed from 'assets/markers/marker-icon-red.png';
import MarkerIconOrange from 'assets/markers/marker-icon-orange.png';
import { Marker } from 'react-map-gl';

const styles = makeStyles((theme) => ({
  marker: {
    backgroundColor: '#ADADAD',
    width: '20px',
    height: '20px',
    position: 'relative',
    borderRadius: '10px',
    cursor: 'pointer',

    '& img': {
      visibility: 'hidden',
      opacity: 0,
      position: 'absolute',
      top: '-42px',
      left: '-2px',
    },

    '&:hover': {
      '& img': {
        visibility: 'visible',
        opacity: 1,
        transition: 'visibility 0s, opacity 0.1s linear',
      },
    },
  },
  markerDriver: {
    backgroundColor: 'transparent',
    border: '2px solid #6F9CEB',
  },
  markerBlue: {
    backgroundColor: '#6F9CEB',
  },
  markerGreen: {
    backgroundColor: 'green',
  },
  markerRed: {
    backgroundColor: '#F78D94',
  },
  markerOrange: {
    backgroundColor: 'orange',
  },
}));

export const Pin = ({ color }) => {
  if (color === 'red') {
    return (<img alt="marker" src={MarkerIconRed} />);
  }

  if (color === 'blue') {
    return (<img alt="marker" src={MarkerIconBlue} />);
  }

  if (color === 'orange') {
    return (<img alt="marker" src={MarkerIconOrange} />);
  }

  return (<img alt="marker" src={MarkerIconGray} />);
};

export const CustomMarker = ({ lat, lng, color = 'gray', pinColor, onClick }) => {
  const classes = styles();

  return (
    <Marker latitude={lat} longitude={lng}>
      <div
        className={clsx(classes.marker, {
          [classes.markerBlue]: color === 'blue',
          [classes.markerRed]: color === 'red',
          [classes.markerGreen]: color === 'green',
          [classes.markerOrange]: color === 'orange',
        })}
        onClick={onClick}
      >
        <Pin color={pinColor} />
      </div>
    </Marker>
  );
};

const Markers = ({ route, onClick }) => {
  return (
    <>
      {
        route.pathway
          .filter((p) => {
            return p.Orders.some((o) => !o.delivered_at);
          })
          .map((pathway, i) => {
            return (
              <CustomMarker
                lat={pathway.latitude} lng={pathway.longitude}
                key={i}
                pinColor="gray"
                onClick={() => onClick(route.id, pathway.id)}
              />
            );
          })
      }
      {
        route.Stops.map((stop, i) => {
          const pathway = route.pathway.find((p) => p.id === stop.customer_id);

          return (
            <CustomMarker
              lat={pathway.latitude} lng={pathway.longitude}
              key={i}
              color={stop.goods_back ? 'red' : 'blue'}
              pinColor={stop.goods_back ? 'red' : 'blue'}
              onClick={() => onClick(route.id, pathway.id)}
            />
          );
        })
      }
    </>
  );
};

export default Markers;
