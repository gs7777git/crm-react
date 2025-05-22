import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", role: "User" });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://google-sheet-proxy.govindsaini355.workers.dev/?action=getUsers"
      );
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      setError("Failed to load users.");
    }
    setLoading(false);
  }

  async function handleAddUser(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(
        "https://google-sheet-proxy.govindsaini355.workers.dev/?action=addUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.success) {
        fetchUsers();
        setForm({ name: "", email: "", role: "User" });
      } else {
        setError("Failed to add user.");
      }
    } catch {
      setError("Error adding user.");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      {error && (
        <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
      )}

      <form
        onSubmit={handleAddUser}
        className="mb-8 max-w-md border p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <input
          type="text"
          required
          placeholder="Name"
          className="w-full p-2 mb-4 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <select
          className="w-full p-2 mb-4 border rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>User</option>
          <option>Admin</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded font-semibold"
        >
          Add User
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">User List</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((u, i) => (
              <tr key={i} className="border-b hover:bg-gray-100">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

