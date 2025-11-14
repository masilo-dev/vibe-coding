import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const preferencesSchema = z.object({
  defaultMusicGenre: z.string().optional(),
  defaultAmbientSound: z.string().optional().nullable(),
  defaultSessionLength: z.number().min(1).max(180).optional(),
  autoStartBreak: z.boolean().optional(),
  breakLength: z.number().min(1).max(60).optional(),
  volume: z.number().min(0).max(100).optional(),
  darkMode: z.boolean().optional(),
  notifications: z.boolean().optional(),
});

// GET - Fetch user preferences
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences = await prisma.userPreferences.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!preferences) {
      // Create default preferences if they don't exist
      const newPreferences = await prisma.userPreferences.create({
        data: {
          userId: session.user.id,
          defaultMusicGenre: "lofi",
          defaultSessionLength: 25,
          autoStartBreak: true,
          breakLength: 5,
          volume: 50,
          darkMode: true,
          notifications: true,
        },
      });
      return NextResponse.json(newPreferences);
    }

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update user preferences
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = preferencesSchema.parse(body);

    const preferences = await prisma.userPreferences.upsert({
      where: {
        userId: session.user.id,
      },
      update: validatedData,
      create: {
        userId: session.user.id,
        ...validatedData,
      },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating preferences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
