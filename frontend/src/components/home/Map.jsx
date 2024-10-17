import React, { useEffect } from 'react';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

const Map = ({ values, mid }) => {
  useEffect(() => {
    // Initialize the map
    const map = L.map(mid).setView([20, 0], 2); // Initial view, zoom level set to show the world

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Initialize the marker cluster group
    const markers = L.markerClusterGroup();

    // Create a geocoder (OpenStreetMap geocoder)
    const provider = new OpenStreetMapProvider();

    // Add a delay function to throttle requests
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Function to process geocoding with throttling
    const addMarkersWithThrottling = async () => {
      for (const contact of values) {
        try {
          const result = await provider.search({ query: contact.country.toLowerCase() });
          if (result.length > 0) {
            const { x, y } = result[0]; // Get the longitude and latitude of the country
            const marker = L.marker([y, x]).bindPopup(`<b>${contact.fullName}</b><br />${contact.country}`);
            markers.addLayer(marker); // Add marker to the cluster group
          }
        } catch (error) {
          console.error(`Error fetching geocode for ${contact.country}:`, error);
        }
        // Throttle the requests with a 1-second delay between each
        await delay(1000);
      }
    };

    // Start adding markers with throttling
    addMarkersWithThrottling();

    map.addLayer(markers); // Add the cluster group to the map

    return () => {
      map.remove();
    };
  }, [values, mid]);

  return <div id={mid} style={{ height: '500px', width: '100%' ,zIndex:-1 }}></div>;
};

export default Map;
