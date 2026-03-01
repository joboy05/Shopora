import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Mail, Shield, Globe, Clock, Calendar, Search, Filter, MoreVertical, Crown, Star, Zap, Settings, Trash2, Edit, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const roles = [
  { 
    id: 'owner', 
    name: 'Owner', 
    description: 'Full access to everything',
    icon: Crown,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    permissions: ['all']
  },
  { 
    id: 'admin', 
    name: 'Admin', 
    description: 'Manage store, products, orders',
    icon: Shield,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    permissions: ['products', 'orders', 'customers', 'analytics', 'settings']
  },
  { 
    id: 'manager', 
    name: 'Manager', 
    description: 'Manage products and orders',
    icon: Star,
    color: 'text-green-600 bg-green-50 border-green-200',
    permissions: ['products', 'orders', 'customers']
  },
  { 
    id: 'employee', 
    name: 'Employee', 
    description: 'View and manage orders',
    icon: Users,
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    permissions: ['orders']
  },
  { 
    id: 'viewer', 
    name: 'Viewer', 
    description: 'Read-only access',
    icon: Eye,
    color: 'text-slate-600 bg-slate-50 border-slate-200',
    permissions: ['view']
  }
];

const timezones = [
  'UTC-08:00 (Los Angeles)',
  'UTC-05:00 (New York)',
  'UTC+00:00 (London)',
  'UTC+01:00 (Paris)',
  'UTC+02:00 (Cairo)',
  'UTC+03:00 (Moscow)',
  'UTC+04:00 (Dubai)',
  'UTC+05:30 (New Delhi)',
  'UTC+07:00 (Bangkok)',
  'UTC+08:00 (Beijing)',
  'UTC+09:00 (Tokyo)',
  'UTC+10:00 (Sydney)',
  'UTC-03:00 (São Paulo)',
  'UTC+01:00 (Lagos)',
  'UTC+02:00 (Johannesburg)'
];

export default function TeamManagement() {
  const [activeTab, setActiveTab] = useState('members');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@shopora.com',
      role: 'owner',
      avatar: 'JS',
      status: 'active',
      lastActive: '2 minutes ago',
      joinedAt: '2024-01-15',
      timezone: 'UTC-05:00 (New York)',
      permissions: ['all'],
      twoFactorEnabled: true
    },
    {
      id: '2',
      name: 'Marie Dubois',
      email: 'marie@shopora.com',
      role: 'admin',
      avatar: 'MD',
      status: 'active',
      lastActive: '1 hour ago',
      joinedAt: '2024-02-01',
      timezone: 'UTC+01:00 (Paris)',
      permissions: ['products', 'orders', 'customers', 'analytics', 'settings'],
      twoFactorEnabled: true
    },
    {
      id: '3',
      name: 'Ahmed Hassan',
      email: 'ahmed@shopora.com',
      role: 'manager',
      avatar: 'AH',
      status: 'active',
      lastActive: '30 minutes ago',
      joinedAt: '2024-02-15',
      timezone: 'UTC+02:00 (Cairo)',
      permissions: ['products', 'orders', 'customers'],
      twoFactorEnabled: false
    },
    {
      id: '4',
      name: 'Yuki Tanaka',
      email: 'yuki@shopora.com',
      role: 'employee',
      avatar: 'YT',
      status: 'active',
      lastActive: '3 hours ago',
      joinedAt: '2024-03-01',
      timezone: 'UTC+09:00 (Tokyo)',
      permissions: ['orders'],
      twoFactorEnabled: true
    },
    {
      id: '5',
      name: 'Pending User',
      email: 'new@shopora.com',
      role: 'viewer',
      avatar: 'PU',
      status: 'pending',
      lastActive: 'Never',
      joinedAt: '2024-03-10',
      timezone: 'UTC+00:00 (London)',
      permissions: ['view'],
      twoFactorEnabled: false
    }
  ]);

  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'employee',
    message: '',
    sendWelcomeEmail: true,
    timezone: 'UTC+00:00 (London)'
  });

  const [pendingInvites, setPendingInvites] = useState([
    {
      id: 'inv1',
      email: 'sarah@company.com',
      role: 'manager',
      invitedBy: 'John Smith',
      invitedAt: '2024-03-12',
      expiresAt: '2024-03-19',
      status: 'pending'
    },
    {
      id: 'inv2',
      email: 'carlos@empresa.com',
      role: 'admin',
      invitedBy: 'Marie Dubois',
      invitedAt: '2024-03-11',
      expiresAt: '2024-03-18',
      status: 'pending'
    }
  ]);

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleInvite = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newInvite = {
        id: `inv${Date.now()}`,
        email: inviteForm.email,
        role: inviteForm.role,
        invitedBy: 'Current User',
        invitedAt: new Date().toISOString().split('T')[0],
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending'
      };
      
      setPendingInvites(prev => [...prev, newInvite]);
      setInviteForm({ email: '', role: 'employee', message: '', sendWelcomeEmail: true, timezone: 'UTC+00:00 (London)' });
      setShowInviteModal(false);
    } catch (error) {
      console.error('Failed to send invite:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (memberId, newRole) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, role: newRole, permissions: roles.find(r => r.id === newRole).permissions }
        : member
    ));
  };

  const handleRemoveMember = (memberId) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleResendInvite = (inviteId) => {
    console.log('Resending invite:', inviteId);
  };

  const handleRevokeInvite = (inviteId) => {
    setPendingInvites(prev => prev.filter(invite => invite.id !== inviteId));
  };

  const getRoleInfo = (roleId) => roles.find(r => r.id === roleId);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Team Management</h1>
          <p className="text-slate-500 mt-1">Manage your global team members and permissions</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-black text-slate-900">{teamMembers.filter(m => m.status === 'active').length}</span>
          </div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Active Members</p>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Mail className="h-5 w-5 text-yellow-500" />
            <span className="text-2xl font-black text-slate-900">{pendingInvites.length}</span>
          </div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Pending Invites</p>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Globe className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-black text-slate-900">{new Set(teamMembers.map(m => m.timezone)).size}</span>
          </div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Timezones</p>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Shield className="h-5 w-5 text-purple-500" />
            <span className="text-2xl font-black text-slate-900">{teamMembers.filter(m => m.twoFactorEnabled).length}</span>
          </div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider">2FA Enabled</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2">
        <div className="flex space-x-1">
          {['members', 'invites', 'roles'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm capitalize transition-all ${
                activeTab === tab
                  ? 'bg-black text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab === 'members' && 'Team Members'}
              {tab === 'invites' && 'Pending Invites'}
              {tab === 'roles' && 'Role Permissions'}
            </button>
          ))}
        </div>
      </div>

      {/* Team Members Tab */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-2xl border border-slate-200">
          {/* Search and Filter */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-slate-900"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-slate-900"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Members List */}
          <div className="divide-y divide-slate-200">
            {filteredMembers.map((member) => {
              const roleInfo = getRoleInfo(member.role);
              const RoleIcon = roleInfo.icon;
              
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900">{member.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                          {member.twoFactorEnabled && (
                            <Shield className="h-4 w-4 text-green-500" title="2FA Enabled" />
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{member.email}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {member.lastActive}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {member.timezone}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Joined {member.joinedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${roleInfo.color}`}>
                        <RoleIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">{roleInfo.name}</span>
                      </div>
                      
                      <div className="relative">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pending Invites Tab */}
      {activeTab === 'invites' && (
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="divide-y divide-slate-200">
            {pendingInvites.map((invite) => {
              const roleInfo = getRoleInfo(invite.role);
              const RoleIcon = roleInfo.icon;
              
              return (
                <motion.div
                  key={invite.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{invite.email}</h3>
                        <p className="text-sm text-slate-500">
                          Invited by {invite.invitedBy} • {invite.invitedAt}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Expires in {Math.ceil((new Date(invite.expiresAt) - new Date()) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${roleInfo.color}`}>
                        <RoleIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">{roleInfo.name}</span>
                      </div>
                      
                      <button
                        onClick={() => handleResendInvite(invite.id)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Resend
                      </button>
                      <button
                        onClick={() => handleRevokeInvite(invite.id)}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Role Permissions Tab */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          {roles.map((role) => {
            const RoleIcon = role.icon;
            const membersWithRole = teamMembers.filter(m => m.role === role.id).length;
            
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl border ${role.color} flex items-center justify-center`}>
                      <RoleIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{role.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{role.description}</p>
                      <p className="text-xs text-slate-400 mt-2">{membersWithRole} team member(s) with this role</p>
                    </div>
                  </div>
                  
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Edit className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map(permission => (
                      <span
                        key={permission}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                      >
                        {permission === 'all' ? 'Full Access' : permission.charAt(0).toUpperCase() + permission.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" onClick={() => setShowInviteModal(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform animate-slide-in">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="font-black text-xl">Invite Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <Trash2 className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-slate-900"
                  placeholder="colleague@company.com"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-slate-900"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name} - {role.description}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Timezone</label>
                <select
                  value={inviteForm.timezone}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-slate-900"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Personal Message (Optional)</label>
                <textarea
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent h-24 text-slate-900"
                  placeholder="Welcome to our team! Looking forward to working with you..."
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="welcome-email"
                  checked={inviteForm.sendWelcomeEmail}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, sendWelcomeEmail: e.target.checked }))}
                  className="rounded border-slate-300 text-black focus:ring-black"
                />
                <label htmlFor="welcome-email" className="text-sm text-slate-700">Send welcome email with setup instructions</label>
              </div>
            </div>
            
            <div className="p-6 border-t bg-slate-50">
              <button
                onClick={handleInvite}
                disabled={loading || !inviteForm.email}
                className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                {loading ? 'Sending Invite...' : 'Send Invitation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
