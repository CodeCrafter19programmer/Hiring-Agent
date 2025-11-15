"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ApplyPage() {
  const params = useSearchParams();
  const prefillJobId = params.get("jobId") || "";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobId, setJobId] = useState(prefillJobId);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return (
      fullName.trim().length > 2 &&
      /.+@.+\..+/.test(email) &&
      phone.trim().length >= 7 &&
      jobId.trim().length > 0 &&
      !!file
    );
  }, [fullName, email, phone, jobId, file]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!file) {
      setError("Please attach a CV file.");
      return;
    }

    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("full_name", fullName);
      form.append("email", email);
      form.append("phone", phone);
      form.append("jobId", jobId);
      form.append("cv_file", file);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(data?.error || "Submission failed");
      }

      setMessage("Application submitted successfully. You'll receive updates via email.");
      setFullName("");
      setEmail("");
      setPhone("");
      if (!prefillJobId) setJobId("");
      setFile(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-transparent flex items-center justify-center py-10 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Apply for a Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

            <div>
              <label htmlFor="jobId" className="mb-1.5 block text-sm font-medium">
                Job ID
              </label>
              <input
                id="jobId"
                name="jobId"
                title="Job ID"
                className="h-10 w-full rounded-md border px-3 text-sm text-foreground border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30 focus:ring-offset-2"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                placeholder="e.g. JOB-1234"
                required
              />
            </div>

            <div>
              <label htmlFor="cv_file" className="mb-1.5 block text-sm font-medium">
                Upload CV (PDF or DOCX)
              </label>
              <input
                id="cv_file"
                name="cv_file"
                title="CV File"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="w-full text-sm"
                onChange={onFileChange}
                required
              />
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}

            <Button type="submit" className="w-full" isLoading={submitting} disabled={!isValid || submitting}>
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
