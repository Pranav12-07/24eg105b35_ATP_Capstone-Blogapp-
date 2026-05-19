import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { API_BASE_URL } from "../api";

function AdminProfile() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(`${API_BASE_URL}/admin-api/users`, { 
        withCredentials: true 
      })
      if (res.status === 200) {
        setUsers(res.data?.payload || [])
      }
    } catch (err) {
      console.error('Error fetching users:', err)
      setError(err.response?.data?.message || 'Failed to fetch users')
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      setUpdatingId(userId)
      const res = await axios.patch(
        `${API_BASE_URL}/admin-api/users`,
        {
          userId,
          isUserActive: !currentStatus
        },
        { withCredentials: true }
      )
      if (res.status === 200) {
        // Update the user in the list
        setUsers(users.map(user => 
          user._id === userId ? res.data?.payload : user
        ))
        toast.success(
          !currentStatus ? 'User activated successfully' : 'User deactivated successfully'
        )
      }
    } catch (err) {
      console.error('Error updating user status:', err)
      toast.error(err.response?.data?.message || 'Failed to update user status')
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard - User Management</h1>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full bg-white">
              <thead className="bg-gray-200 border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isUserActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isUserActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleUserStatus(user._id, user.isUserActive)}
                        disabled={updatingId === user._id}
                        className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                          updatingId === user._id
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : user.isUserActive
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {updatingId === user._id ? 'Updating...' : user.isUserActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p>Total Users: <span className="font-semibold">{users.length}</span></p>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
