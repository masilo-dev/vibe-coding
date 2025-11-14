"use client";

import { useEffect } from "react";
import { Play, Pause, Square, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSessionStore } from "@/store/session-store";
import { formatTime, calculateFocusScore } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function SessionTimer() {
  const {
    isActive,
    elapsedTime,
    sessionLength,
    isBreak,
    interruptions,
    startSession,
    pauseSession,
    resumeSession,
    endSession,
    startBreak,
    updateElapsedTime,
  } = useSessionStore();

  const { toast } = useToast();

  const totalSeconds = sessionLength * 60;
  const remainingSeconds = Math.max(0, totalSeconds - elapsedTime);
  const progress = (elapsedTime / totalSeconds) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        updateElapsedTime();
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, updateElapsedTime]);

  useEffect(() => {
    if (isActive && remainingSeconds === 0) {
      handleSessionComplete();
    }
  }, [remainingSeconds, isActive]);

  const handleSessionComplete = async () => {
    const focusScore = calculateFocusScore(elapsedTime, interruptions);

    if (isBreak) {
      toast({
        title: "Break Complete!",
        description: "Ready to get back to coding?",
      });
      endSession();
    } else {
      toast({
        title: "Session Complete!",
        description: `Focus Score: ${focusScore}/100`,
      });

      // Save session to database
      try {
        await fetch("/api/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            duration: elapsedTime,
            focusScore,
            productive: true,
          }),
        });
      } catch (error) {
        console.error("Failed to save session:", error);
      }

      endSession();
    }
  };

  const handleStart = () => {
    if (!isActive && elapsedTime === 0) {
      startSession(25);
      toast({
        title: "Session Started",
        description: "Focus mode activated!",
      });
    } else if (!isActive) {
      resumeSession();
    } else {
      pauseSession();
    }
  };

  const handleStop = () => {
    endSession();
    toast({
      title: "Session Ended",
      description: "Great work!",
    });
  };

  const handleStartBreak = () => {
    startBreak(5);
    toast({
      title: "Break Started",
      description: "Take a well-deserved rest!",
    });
  };

  return (
    <Card className="p-8">
      <div className="space-y-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted-foreground/20"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <p className="text-5xl font-bold">{formatTime(remainingSeconds)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {isBreak ? "Break Time" : "Focus Time"}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={handleStart}
            className="w-32"
          >
            {isActive ? (
              <>
                <Pause className="mr-2 h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                {elapsedTime === 0 ? "Start" : "Resume"}
              </>
            )}
          </Button>

          {elapsedTime > 0 && (
            <Button
              size="lg"
              variant="outline"
              onClick={handleStop}
              className="w-32"
            >
              <Square className="mr-2 h-5 w-5" />
              Stop
            </Button>
          )}

          {!isActive && elapsedTime === 0 && (
            <Button
              size="lg"
              variant="outline"
              onClick={handleStartBreak}
              className="w-32"
            >
              <Coffee className="mr-2 h-5 w-5" />
              Break
            </Button>
          )}
        </div>

        {/* Session Info */}
        {isActive && (
          <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Elapsed</p>
              <p className="text-lg font-semibold">{formatTime(elapsedTime)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interruptions</p>
              <p className="text-lg font-semibold">{interruptions}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
