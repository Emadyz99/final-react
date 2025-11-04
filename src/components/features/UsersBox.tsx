import React, { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export default function UsersBox() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        // فقط ۵ کاربر اول + آواتار تصادفی
        const usersWithAvatar = data.slice(0, 5).map((u: any) => ({
          ...u,
          avatar: `https://i.pravatar.cc/150?img=${u.id}`,
        }));

        setUsers(usersWithAvatar);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 text-center">
        <p className="text-gray-500 animate-pulse">Loading users...</p>
      </div>
    );
  }

  return (
    <>
      {/* Box */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition w-full">
        <h2 className="text-lg font-semibold text-gray-500 mb-4">Users</h2>

        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>

              <button
                onClick={() => setSelectedUser(user)}
                className="text-blue-500 hover:text-blue-700"
              >
                <InfoOutlinedIcon />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-80 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <CloseIcon />
            </button>

            <div className="text-center">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {selectedUser.name}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                📧 {selectedUser.email}
              </p>
              <p className="text-gray-600 text-sm">
                📞 {selectedUser.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
