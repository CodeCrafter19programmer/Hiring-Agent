"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await auth.login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-transparent">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <h1 className="mb-2 text-center text-2xl font-bold">Hiring Automation System</h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">Admin & Recruiter Portal</p>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <Button type="submit" className="w-full" isLoading={loading}>
              Login
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link href="#" className="text-blue-600 hover:underline">Forgot Password?</Link>
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
