"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/hooks/useAuth";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Recruiter");
  const [loading, setLoading] = useState(false);

  // Only admins can access this page
  if (user?.role !== "Admin") {
    return (
      <ProtectedRoute>
        <AppLayout>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground">Only administrators can manage users.</p>
          </div>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Call API to create user
      console.log("Creating user:", { email, fullName, role });
      
      // Reset form
      setEmail("");
      setFullName("");
      setPassword("");
      setRole("Recruiter");
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button onClick={() => setShowCreateModal(true)}>
            Add User
          </Button>
        </div>

        <Card>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Role</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-muted-foreground">
                        No users found. Create your first recruiter to get started.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="border-b border-border">
                        <td className="py-3">{u.full_name}</td>
                        <td className="py-3">{u.email}</td>
                        <td className="py-3">
                          <span className={`inline-block rounded-full px-2 py-1 text-xs ${
                            u.role === 'Admin' 
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Delete</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New User">
          <form onSubmit={handleCreateUser} className="space-y-4">
            <Input 
              label="Full Name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
            <Input 
              label="Email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <div>
              <label htmlFor="user-role" className="mb-1.5 block text-sm font-medium">Role</label>
              <select
                id="user-role"
                title="User Role"
                className="h-10 w-full rounded-md border px-3 text-sm text-foreground border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30 focus:ring-offset-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Recruiter</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="submit" isLoading={loading}>
                Create User
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </AppLayout>
    </ProtectedRoute>
  );
}
