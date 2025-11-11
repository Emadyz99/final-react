import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // خیلی مهم
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Props {
  initialLocation: [number, number];
}

export default function UserLocationMap({ initialLocation }: Props) {
  const [position, setPosition] = useState<[number, number]>(initialLocation);
  const [editMode, setEditMode] = useState(false);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        if (editMode) {
          setPosition([e.latlng.lat, e.latlng.lng]);
          setEditMode(false); // بعد از انتخاب نقطه، ویرایش تمام می‌شود
        }
      },
    });
    return <Marker position={position} icon={defaultIcon} />;
  };

  return (
    <div className="w-full h-96 bg-gray-100 p-4 rounded-lg shadow-md">
      <button
        onClick={() => setEditMode(true)}
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {editMode ? "Select Location on Map" : "Edit Location"}
      </button>

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-80 rounded"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>

      <p className="mt-2 text-gray-700">
        Selected: Lat {position[0].toFixed(5)}, Lng {position[1].toFixed(5)}
      </p>
    </div>
  );
}
