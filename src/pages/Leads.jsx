import { useEffect, useState } from "react";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://google-sheet-proxy.govindsaini355.workers.dev/?action=getLeads"
      );
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      setError("Failed to load leads.");
    }
    setLoading(false);
  }

  async function handleAddLead(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(
        "https://google-sheet-proxy.govindsaini355.workers.dev/?action=addLead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.success) {
        fetchLeads();
        setForm({ name: "", email: "", phone: "" });
      } else {
        setError("Failed to add lead.");
      }
    } catch {
      setError("Error adding lead.");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Leads Management</h1>

      {error && (
        <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
      )}

      <form
        onSubmit={handleAddLead}
        className="mb-8 max-w-md border p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Lead</h2>
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
        <input
          type="tel"
          required
          placeholder="Phone"
          className="w-full p-2 mb-4 border rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold"
        >
          Add Lead
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Lead List</h2>
      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No leads found.
                </td>
              </tr>
            )}
            {leads.map((l, i) => (
              <tr key={i} className="border-b hover:bg-gray-100">
                <td className="p-3">{l.name}</td>
                <td className="p-3">{l.email}</td>
                <td className="p-3">{l.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
