import { NEXT_AUTH } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
    // auth check
    const session = await getServerSession(NEXT_AUTH);
    console.log(session);
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    // role check
    if (session.user.role !== "recruiter") {
        return new Response("Forbidden", { status: 403 });
    }
}