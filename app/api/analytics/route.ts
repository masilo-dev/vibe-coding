import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { startOfWeek, startOfMonth, subDays } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "week"; // week, month, all

    let startDate: Date;
    const now = new Date();

    switch (period) {
      case "week":
        startDate = startOfWeek(now);
        break;
      case "month":
        startDate = startOfMonth(now);
        break;
      case "7days":
        startDate = subDays(now, 7);
        break;
      default:
        startDate = new Date(0); // All time
    }

    const sessions = await prisma.codingSession.findMany({
      where: {
        userId: session.user.id,
        startTime: {
          gte: startDate,
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    // Calculate analytics
    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const averageFocusScore =
      sessions.length > 0
        ? Math.round(
            sessions.reduce((sum, s) => sum + s.focusScore, 0) / sessions.length
          )
        : 0;

    const productiveSessions = sessions.filter((s) => s.productive).length;
    const productivityRate =
      sessions.length > 0
        ? Math.round((productiveSessions / sessions.length) * 100)
        : 0;

    // Group by day for chart data
    const sessionsByDay = sessions.reduce((acc, session) => {
      const date = session.startTime.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          duration: 0,
          sessions: 0,
          focusScore: 0,
        };
      }
      acc[date].duration += session.duration;
      acc[date].sessions += 1;
      acc[date].focusScore += session.focusScore;
      return acc;
    }, {} as Record<string, any>);

    const chartData = Object.values(sessionsByDay).map((day: any) => ({
      date: day.date,
      duration: Math.round(day.duration / 60), // Convert to minutes
      sessions: day.sessions,
      averageFocusScore: Math.round(day.focusScore / day.sessions),
    }));

    // Most used music genres
    const genreCounts = sessions.reduce((acc, session) => {
      if (session.musicGenre) {
        acc[session.musicGenre] = (acc[session.musicGenre] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topGenres = Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([genre, count]) => ({ genre, count }));

    return NextResponse.json({
      totalSessions,
      totalDuration,
      averageFocusScore,
      productivityRate,
      chartData,
      topGenres,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
