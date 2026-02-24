import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

const REGISTRATION_TABLE = import.meta.env.VITE_SUPABASE_REGISTRATION_TABLE || 'registration_applications';

const AdminPanel = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const handleApprove = async (id) => {
    setError('');
    setUpdatingId(id);

    const { error: updateError } = await supabase
      .from(REGISTRATION_TABLE)
      .update({ status: 'approved' })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message || 'Failed to approve application.');
      setUpdatingId(null);
      return;
    }

    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: 'approved' } : row))
    );
    setUpdatingId(null);
  };

  useEffect(() => {
    const fetchResponses = async () => {
      const { data, error: fetchError } = await supabase
        .from(REGISTRATION_TABLE)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message || 'Failed to fetch responses.');
      } else {
        setRows(data || []);
      }
      setLoading(false);
    };

    fetchResponses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel - Form Responses</h1>
          <Link to="/home-page" className="text-blue-600 underline hover:text-blue-800">
            Back to Home
          </Link>
        </div>

        {loading && <p className="text-gray-600">Loading responses...</p>}

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        {!loading && !error && rows.length === 0 && (
          <div className="rounded border border-gray-200 bg-white p-4 text-gray-600">
            No responses found.
          </div>
        )}

        {!loading && !error && rows.length > 0 && (
          <div className="overflow-auto rounded border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Submitted At</th>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Role</th>
                  <th className="px-3 py-2 text-left">Mobile</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Documents</th>
                  <th className="px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => {
                  const docs = item.documents || {};
                  return (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="px-3 py-2 whitespace-nowrap">
                        {item.created_at ? new Date(item.created_at).toLocaleString() : '-'}
                      </td>
                      <td className="px-3 py-2">{item.full_name || '-'}</td>
                      <td className="px-3 py-2">{item.role || '-'}</td>
                      <td className="px-3 py-2">{item.mobile || '-'}</td>
                      <td className="px-3 py-2">{item.email || '-'}</td>
                      <td className="px-3 py-2">{item.status || '-'}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col">
                          {docs.photo?.publicUrl && (
                            <a className="text-blue-600 underline" href={docs.photo.publicUrl} target="_blank" rel="noreferrer">Photo</a>
                          )}
                          {docs.aadhaar?.publicUrl && (
                            <a className="text-blue-600 underline" href={docs.aadhaar.publicUrl} target="_blank" rel="noreferrer">Aadhaar</a>
                          )}
                          {docs.shopAct?.publicUrl && (
                            <a className="text-blue-600 underline" href={docs.shopAct.publicUrl} target="_blank" rel="noreferrer">Shop Act</a>
                          )}
                          {docs.shopPhoto?.publicUrl && (
                            <a className="text-blue-600 underline" href={docs.shopPhoto.publicUrl} target="_blank" rel="noreferrer">Shop Photo</a>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        {item.status === 'approved' ? (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-700">
                            Approved
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApprove(item.id)}
                            disabled={updatingId === item.id}
                            className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
                          >
                            {updatingId === item.id ? 'Approving...' : 'Approve'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
