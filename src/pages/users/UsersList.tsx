import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import Modal from "@mui/material/Modal";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// رفع مشکل آیکون پیش‌فرض Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: { name: string };
  location: { lat: number; lng: number };
  avatar: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMap, setOpenMap] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [tempLocation, setTempLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosClient.get<User[]>("/users");
        const savedLocations = JSON.parse(localStorage.getItem("userLocations") || "{}");

        const usersWithAvatars: User[] = data.slice(0, 20).map((u) => ({
          ...u,
          avatar: `https://i.pravatar.cc/150?img=${u.id}`,
          location: savedLocations[u.id] || { lat: 35.6997, lng: 51.3380 }, // پیش‌فرض یا از localStorage
        }));
        setUsers(usersWithAvatars);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const LocationPicker = ({ onClick }: { onClick: (latlng: { lat: number; lng: number }) => void }) => {
    useMapEvents({
      click(e) {
        onClick(e.latlng);
      },
    });
    return null;
  };

  const handleConfirmLocation = () => {
    if (!selectedUser || !tempLocation) return;
    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id ? { ...u, location: tempLocation } : u
    );
    setUsers(updatedUsers);

    // ذخیره در LocalStorage
    const savedLocations = JSON.parse(localStorage.getItem("userLocations") || "{}");
    savedLocations[selectedUser.id] = tempLocation;
    localStorage.setItem("userLocations", JSON.stringify(savedLocations));

    setOpenMap(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading users...
      </div>
    );

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600 border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Avatar</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
                <td className="px-4 py-3">@{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">{user.company.name}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setTempLocation(user.location);
                      setOpenMap(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <LocationOnIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal نقشه */}
      <Modal open={openMap} onClose={() => setOpenMap(false)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-4xl h-96 bg-white rounded-lg shadow-lg flex">
          {selectedUser && tempLocation && (
            <>
              {/* نقشه */}
              <div className="flex-1">
                <MapContainer center={tempLocation} zoom={13} style={{ width: "100%", height: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={tempLocation} />
                  <LocationPicker onClick={(latlng) => setTempLocation(latlng)} />
                </MapContainer>
              </div>
              {/* پنل تغییر لوکیشن */}
              <div className="w-64 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold mb-2">{selectedUser.name}</h2>
                  <p>Lat: {tempLocation.lat.toFixed(4)}</p>
                  <p>Lng: {tempLocation.lng.toFixed(4)}</p>
                </div>
                <button
                  onClick={handleConfirmLocation}
                  className="mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Set Location
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
