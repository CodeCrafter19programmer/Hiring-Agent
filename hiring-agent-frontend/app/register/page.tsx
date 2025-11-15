"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Recruiter");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await auth.register(email, password, fullName, role);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-transparent">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <h1 className="mb-6 text-center text-2xl font-bold">Create an account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div>
              <label htmlFor="role" className="mb-1.5 block text-sm font-medium">Role</label>
              <select
                id="role"
                title="Role"
                className="h-10 w-full rounded-md border px-3 text-sm text-foreground border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30 focus:ring-offset-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Recruiter</option>
                <option>Admin</option>
              </select>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" isLoading={loading}>
              Register
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
