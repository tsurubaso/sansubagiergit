import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import 'dotenv/config'; // charge les variables .env en local

export async function POST(req) {
  try {
    const { content } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail", // ou SMTP de ton choix
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Markdown Editor" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // tu reçois le mail sur la même adresse
      subject: "Markdown content",
      text: content, // Markdown brut dans le mail
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
