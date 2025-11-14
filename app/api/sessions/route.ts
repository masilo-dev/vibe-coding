import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const sessionSchema = z.object({
  duration: z.number().min(0),
  focusScore: z.number().min(0).max(100),
  musicGenre: z.string().optional(),
  ambientSound: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  productive: z.boolean().optional(),
});

// GET - Fetch user's coding sessions
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const sessions = await prisma.codingSession.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        startTime: "desc",
      },
      take: limit,
      skip: offset,
    });

    const total = await prisma.codingSession.count({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ sessions, total });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create a new coding session
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = sessionSchema.parse(body);

    const codingSession = await prisma.codingSession.create({
      data: {
        userId: session.user.id,
        duration: validatedData.duration,
        focusScore: validatedData.focusScore,
        musicGenre: validatedData.musicGenre,
        ambientSound: validatedData.ambientSound,
        notes: validatedData.notes,
        tags: validatedData.tags || [],
        productive: validatedData.productive ?? true,
        endTime: new Date(),
      },
    });

    return NextResponse.json(codingSession, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
