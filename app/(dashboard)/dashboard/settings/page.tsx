"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Music2, BarChart3, Settings, LogOut, Save } from "lucide-react";
import { signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

interface UserPreferences {
  defaultMusicGenre: string;
  defaultAmbientSound: string | null;
  defaultSessionLength: number;
  autoStartBreak: boolean;
  breakLength: number;
  volume: number;
  darkMode: boolean;
  notifications: boolean;
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await fetch("/api/preferences");
      const data = await response.json();
      setPreferences(data);
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!preferences) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) throw new Error("Failed to save preferences");

      toast({
        title: "Success",
        description: "Preferences saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    if (preferences) {
      setPreferences({ ...preferences, [key]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">VibeCoding</span>
            </div>

            <nav className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <Music2 className="mr-2 h-4 w-4" />
                  Session
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="ghost" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Customize your VibeCoding experience</p>
          </div>

          {!isLoading && preferences && (
            <div className="space-y-6">
              {/* Session Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Session Settings</CardTitle>
                  <CardDescription>Configure your default session parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Default Session Length: {preferences.defaultSessionLength} minutes
                    </label>
                    <Slider
                      value={[preferences.defaultSessionLength]}
                      onValueChange={(value) =>
                        updatePreference("defaultSessionLength", value[0])
                      }
                      min={5}
                      max={120}
                      step={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Break Length: {preferences.breakLength} minutes
                    </label>
                    <Slider
                      value={[preferences.breakLength]}
                      onValueChange={(value) => updatePreference("breakLength", value[0])}
                      min={1}
                      max={30}
                      step={1}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Audio Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Audio Settings</CardTitle>
                  <CardDescription>Set your preferred music and volume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Music Genre</label>
                    <select
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                      value={preferences.defaultMusicGenre}
                      onChange={(e) =>
                        updatePreference("defaultMusicGenre", e.target.value)
                      }
                    >
                      <option value="lofi">Lo-Fi</option>
                      <option value="ambient">Ambient</option>
                      <option value="classical">Classical</option>
                      <option value="jazz">Jazz</option>
                      <option value="rain">Rain</option>
                      <option value="nature">Nature</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Default Volume: {preferences.volume}%
                    </label>
                    <Slider
                      value={[preferences.volume]}
                      onValueChange={(value) => updatePreference("volume", value[0])}
                      min={0}
                      max={100}
                      step={5}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input value={session?.user?.name || ""} disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input value={session?.user?.email || ""} disabled />
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} size="lg">
                  <Save className="mr-2 h-5 w-5" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading settings...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
