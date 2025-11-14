"use client";

import { useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useAudioStore, MusicGenre, AmbientSound } from "@/store/audio-store";

const genres: { value: MusicGenre; label: string; emoji: string }[] = [
  { value: "lofi", label: "Lo-Fi", emoji: "🎵" },
  { value: "ambient", label: "Ambient", emoji: "🌌" },
  { value: "classical", label: "Classical", emoji: "🎻" },
  { value: "jazz", label: "Jazz", emoji: "🎷" },
  { value: "rain", label: "Rain", emoji: "🌧️" },
  { value: "nature", label: "Nature", emoji: "🌿" },
];

const ambients: { value: AmbientSound; label: string; emoji: string }[] = [
  { value: null, label: "None", emoji: "🔇" },
  { value: "rain", label: "Rain", emoji: "🌧️" },
  { value: "ocean", label: "Ocean", emoji: "🌊" },
  { value: "forest", label: "Forest", emoji: "🌲" },
  { value: "cafe", label: "Café", emoji: "☕" },
  { value: "fire", label: "Fireplace", emoji: "🔥" },
];

export function MusicPlayer() {
  const {
    isPlaying,
    currentGenre,
    ambientSound,
    volume,
    setGenre,
    setAmbientSound,
    setVolume,
    togglePlay,
  } = useAudioStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Music Player</h3>
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={100}
            step={1}
            className="w-24"
          />
          <span className="text-sm text-muted-foreground w-8">{volume}%</span>
        </div>
      </div>

      {/* Music Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" size="icon" className="h-12 w-12">
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="h-16 w-16 rounded-full"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8 ml-1" />
          )}
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12">
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>

      {/* Genre Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Music Genre</label>
        <div className="grid grid-cols-3 gap-2">
          {genres.map((genre) => (
            <Button
              key={genre.value}
              variant={currentGenre === genre.value ? "default" : "outline"}
              className="h-auto py-3 flex flex-col gap-1"
              onClick={() => setGenre(genre.value)}
            >
              <span className="text-2xl">{genre.emoji}</span>
              <span className="text-xs">{genre.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Ambient Sounds */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Ambient Sounds</label>
        <div className="grid grid-cols-3 gap-2">
          {ambients.map((ambient) => (
            <Button
              key={ambient.label}
              variant={ambientSound === ambient.value ? "default" : "outline"}
              className="h-auto py-3 flex flex-col gap-1"
              onClick={() => setAmbientSound(ambient.value)}
            >
              <span className="text-2xl">{ambient.emoji}</span>
              <span className="text-xs">{ambient.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
