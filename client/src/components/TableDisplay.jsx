import React, { useEffect, useState } from 'react';
import AddEditPopup from './AddEditPopup';

const TableDisplay = () => {
  const [data, setData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const res = await fetch('https://merncrud-server.onrender.com/api/users');
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`https://merncrud-server.onrender.com/api/users/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleEdit = (item) => {
    setEditData(item);
    setPopupOpen(true);
  };

  return (
    <div className="container">
      <h2 className='text-xl font-semibold mx-10'>User Table</h2>
      <div className='flex justify-end'>
        <button className='px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md' onClick={() => { setEditData(null); setPopupOpen(true); }}>
         + Add
        </button>

      </div>

      <table className="w-full border mt-4 mx-10 text-sm">
        <thead>
          <tr className="bg-violet-400 text-white">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user._id} className={`hover:bg-gray-50 ${index%2===0?'bg-white':'bg-violet-100'}`}>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.gender}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.city}</td>
              <td className="p-2 border flex gap-2 justify-center">
                <button onClick={() => handleEdit(user)}>✏️</button>
                <button onClick={() => handleDelete(user._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupOpen && (
        <AddEditPopup
          onClose={() => setPopupOpen(false)}
          fetchData={fetchData}
          editData={editData}
        />
      )}
    </div>
  );
};

export default TableDisplay;
