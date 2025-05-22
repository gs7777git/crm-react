export default function Dashboard({ user }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="text-lg">
        Role: <span className="font-semibold">{user.role}</span>
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Leads</h2>
          <p className="text-3xl font-bold">34</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Active Users</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Open Tasks</h2>
          <p className="text-3xl font-bold">8</p>
        </div>
      </div>
    </div>
  );
}

