import React, { useEffect } from 'react';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const Map = ({ values, mid }) => {
  useEffect(() => {
    // Initialize the map
    const map = L.map(mid).setView([20, 0], 2); // Initial view, zoom level set to show the world

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Create a geocoder (OpenStreetMap geocoder)
    const provider = new OpenStreetMapProvider();

    // Function to process geocoding with a slight offset
    const addMarkersWithOffset = async () => {
      for (const contact of values) {
        try {
          const result = await provider.search({ query: contact.country.toLowerCase() });
          if (result.length > 0) {
            const { x, y } = result[0]; // Get the longitude and latitude of the country

            // Apply a slight random offset to the coordinates
            const offsetLat = (Math.random() - 0.5) * 5; // Adjust the multiplier for more or less spread
            const offsetLng = (Math.random() - 0.5) * 5; // Adjust the multiplier for more or less spread

            const marker = L.marker([y + offsetLat, x + offsetLng]);

            // Bind a popup to the marker
            marker.bindPopup(`<b>${contact.fullName}</b><br />${contact.country}`);

            // Add mouseover event to open the popup
            marker.on('mouseover', function () {
              marker.openPopup();
            });

            // Add mouseout event to close the popup
            marker.on('mouseout', function () {
              marker.closePopup();
            });

            // Add marker to the map
            marker.addTo(map);
          }
        } catch (error) {
          console.error(`Error fetching geocode for ${contact.country}:`, error);
        }
      }
    };

    // Start adding markers with offset
    addMarkersWithOffset();

    return () => {
      map.remove();
    };
  }, [values, mid]);

  return <div id={mid} style={{ height: '500px', width: '100%', zIndex: -1 }}></div>;
};

export default Map;
