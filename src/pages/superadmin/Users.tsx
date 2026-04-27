import { useState } from 'react'
import { Plus, Search, Users, X, Shield } from 'lucide-react'

const mockUsers = [
  { id: '1', full_name: 'Michael Scott', email: 'michael@dundermifflin.com', role: 'admin', company: 'Dunder Mifflin Paper', created_at: '2024-01-15', is_active: true },
  { id: '2', full_name: 'Bill Lumbergh', email: 'bill@initech.com', role: 'admin', company: 'Initech Software', created_at: '2024-02-01', is_active: true },
  { id: '3', full_name: 'George Costanza', email: 'george@vandalay.com', role: 'admin', company: 'Vandalay Industries', created_at: '2024-02-20', is_active: false },
  { id: '4', full_name: 'Richard Hendricks', email: 'richard@piedpiper.com', role: 'admin', company: 'Pied Piper', created_at: '2024-03-05', is_active: true },
]

export default function SuperAdminUsers() {
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = mockUsers.filter(u =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">User Management</h1>
          <p className="text-slate-400 text-sm mt-1">{mockUsers.length} admin users</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary text-sm py-2.5">
          <Plus size={16} />
          Add User
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-dark pl-10"
        />
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="pl-6">User</th>
                <th>Company</th>
                <th>Role</th>
                <th>Joined</th>
                <th className="pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id}>
                  <td className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-500/15 flex items-center justify-center text-purple-400 font-bold text-sm shrink-0">
                        {user.full_name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{user.full_name}</div>
                        <div className="text-slate-500 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-slate-300 text-sm">{user.company}</td>
                  <td>
                    <span className="flex items-center gap-1.5 badge-blue w-fit">
                      <Shield size={10} />
                      {user.role}
                    </span>
                  </td>
                  <td className="text-slate-500 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="pr-6">
                    <span className={user.is_active ? 'badge-green' : 'badge bg-slate-500/15 text-slate-400 border border-slate-500/30'}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Users size={40} className="text-dark-400 mx-auto mb-3" />
            <p className="text-slate-500">No users found</p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="relative w-full max-w-md glass rounded-2xl p-7 glow-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-white">Add Admin User</h2>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-600 transition-colors">
                <X size={18} />
              </button>
            </div>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); setShowCreate(false) }}>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Full Name</label>
                <input type="text" required placeholder="Jane Smith" className="input-dark" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Email Address</label>
                <input type="email" required placeholder="jane@company.com" className="input-dark" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Assign Company</label>
                <select className="input-dark bg-dark-700 appearance-none">
                  <option>Dunder Mifflin Paper</option>
                  <option>Initech Software</option>
                  <option>Pied Piper</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Temporary Password</label>
                <input type="password" required placeholder="Min. 8 characters" className="input-dark" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1 justify-center text-sm py-2.5">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center text-sm py-2.5">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
