"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Key, Database, Mail, Palette, Clock } from "lucide-react";

export default function SettingsPage() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [googleSheetsKey, setGoogleSheetsKey] = useState("");
  const [emailApiKey, setEmailApiKey] = useState("");
  const [defaultModel, setDefaultModel] = useState("gpt-4");
  const [workflowTimeout, setWorkflowTimeout] = useState("300");
  const [theme, setTheme] = useState("auto");

  const handleSave = () => {
    // TODO: Implement save settings API call
    console.log("Saving settings...");
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <h1 className="mb-8 text-3xl font-bold">Settings</h1>

        <div className="space-y-6">
          {/* API Keys Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="OpenAI API Key"
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-..."
              />
              <Input
                label="Google Sheets API Key"
                type="password"
                value={googleSheetsKey}
                onChange={(e) => setGoogleSheetsKey(e.target.value)}
                placeholder="Enter Google Sheets API key"
              />
              <Input
                label="Email Processing API Key"
                type="password"
                value={emailApiKey}
                onChange={(e) => setEmailApiKey(e.target.value)}
                placeholder="Enter email API key"
              />
            </CardContent>
          </Card>

          {/* App Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Application Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="default-model" className="mb-1.5 block text-sm font-medium">
                  Default AI Model
                </label>
                <select
                  id="default-model"
                  title="Default AI Model"
                  className="h-10 w-full rounded-md border px-3 text-sm text-foreground border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30 focus:ring-offset-2"
                  value={defaultModel}
                  onChange={(e) => setDefaultModel(e.target.value)}
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3">Claude 3</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  label="Workflow Default Timeout (seconds)"
                  type="number"
                  value={workflowTimeout}
                  onChange={(e) => setWorkflowTimeout(e.target.value)}
                  placeholder="300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label htmlFor="theme" className="mb-1.5 block text-sm font-medium">
                  Theme Preference
                </label>
                <select
                  id="theme"
                  title="Theme Preference"
                  className="h-10 w-full rounded-md border px-3 text-sm text-foreground border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30 focus:ring-offset-2"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Email Integration Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configure email parsing to automatically extract CVs from incoming emails.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-md border border-border">
                  <span className="text-sm">Gmail Integration</span>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-md border border-border">
                  <span className="text-sm">Outlook Integration</span>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
