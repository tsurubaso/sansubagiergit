//VOWNER_ID
//VACCESS_TOKEN


import { NextResponse } from "next/server";

export async function POST(req) {
  const { content = "" } = await req.json();
  const text = content.trim();
     if (!text) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 }
      );
    }

  const ACCESS_TOKEN = process.env.VACCESS_TOKEN;
  const OWNER_ID = process.env.VOWNER_ID; // without the "-" sign
  
  const API_VERSION = "5.199";

  const url = "https://api.vk.com/method/wall.post";

  const params = new URLSearchParams({
    owner_id: OWNER_ID,
    message: text,
    access_token: ACCESS_TOKEN,
    v: API_VERSION,
  });

  try {
    const res = await fetch(url, {
      method: "POST",
      body: params,
    });

    const data = await res.json();

    if (data.error) {
      // VK API returned an error
      return NextResponse.json(
        { success: false, error: data.error },
        { status: 400 }
      );
    }

    if (data.response) {
      // VK API call was successful
      return NextResponse.json(
        { success: true, response: data.response },
        { status: 200 }
      );
    }

    // Unexpected format
    return NextResponse.json(
      { success: false, error: "Unexpected VK API response format" },
      { status: 500 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, error: "VK API request failed" },
      { status: 500 }
    );
  }
}
