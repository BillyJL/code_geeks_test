import React, { useEffect, useState, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
} from '@react-google-maps/api';
import { EventType } from '@/services/event';
import appConfig from '@/configs/app.config';
import geocodeAddress from '@/shared/utils/geocode-address';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapView: React.FC<{ events: EventType[] }> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [eventLocations, setEventLocations] = useState<{ [key: string]: { lat: number, lng: number } }>({});
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const locations: { [key: string]: { lat: number, lng: number } } = {};
      for (const event of events) {
        if (!eventLocations[event.id]) {
          const coordinates = await geocodeAddress(event.location);
          if (coordinates) {
            locations[event.id] = coordinates;
          }
        }
      }
      setEventLocations(locations);
    };

    fetchCoordinates();
  }, [events]);

  useEffect(() => {
    if (mapRef.current) {
      events.forEach(event => {
        if (eventLocations[event.id]) {
          const { lat, lng } = eventLocations[event.id];

          const marker = new (google.maps as any).marker.AdvancedMarkerElement({
            map: mapRef.current,
            position: { lat, lng },
            title: event.title,
          });

          marker.addListener('click', () => {
            setSelectedEvent(event);
          });
        }
      });
    }
  }, [eventLocations, events]);

  return (
    <LoadScript
      googleMapsApiKey={appConfig.GOOGLE_MAP_API_KEY}
      libraries={['places', 'marker']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={map => { mapRef.current = map; }}
      >
        {selectedEvent && eventLocations[selectedEvent.id] && (
          <InfoWindow
            position={eventLocations[selectedEvent.id]}
            onCloseClick={() => setSelectedEvent(null)}
          >
            <div>
              <h2>{selectedEvent.title}</h2>
              <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p>{selectedEvent.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
