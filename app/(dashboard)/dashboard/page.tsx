"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SessionTimer } from "@/components/session-timer";
import { MusicPlayer } from "@/components/music-player";
import { Music2, BarChart3, Settings, LogOut, User } from "lucide-react";
import { getGreeting } from "@/lib/utils";

export default function DashboardPage() {
  const { data: session } = useSession();
  const greeting = getGreeting();

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
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-4xl font-bold">
              {greeting}, {session?.user?.name || "Developer"}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to get in the zone and create something amazing?
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Timer Section */}
            <div className="space-y-4">
              <SessionTimer />
              
              <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Take regular breaks to maintain focus</li>
                  <li>• Adjust music and ambient sounds to your preference</li>
                  <li>• Track your sessions to see productivity patterns</li>
                  <li>• Stay hydrated and maintain good posture</li>
                </ul>
              </div>
            </div>

            {/* Music Player Section */}
            <div className="space-y-4">
              <MusicPlayer />
              
              <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Today's Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Sessions</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <p className="text-3xl font-bold">0h</p>
                    <p className="text-sm text-muted-foreground">Focus Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
            <p className="text-sm text-muted-foreground text-center py-8">
              No sessions yet. Start your first coding session above!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
