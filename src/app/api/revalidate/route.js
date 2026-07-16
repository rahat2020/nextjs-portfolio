import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Called by the server after any About create/update/delete so the public
 * site drops its cached data immediately instead of waiting out the ISR
 * window (see client.js's default `revalidate: 3600`).
 */
export async function POST(request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 });
  }

  const { tag } = await request.json().catch(() => ({}));
  if (!tag) {
    return NextResponse.json({ success: false, message: "Missing tag" }, { status: 400 });
  }

  revalidateTag(tag);
  return NextResponse.json({ success: true, revalidated: true, tag });
}
