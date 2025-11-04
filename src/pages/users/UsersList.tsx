import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string };
  avatar: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        const withAvatars = data.map((u: any) => ({
          ...u,
          avatar: `https://i.pravatar.cc/150?img=${u.id}`,
        }));

        setUsers(withAvatars.slice(0, 20)); // فقط ۲۰ تا کاربر
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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
              <th className="px-4 py-3">Website</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">City</th>
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
                <td className="px-4 py-3">{user.website}</td>
                <td className="px-4 py-3">{user.company.name}</td>
                <td className="px-4 py-3">{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
