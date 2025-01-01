import EmailTemplate from '@/containers/contact-us-page/contact-section/email-template';
import { resendKey as key } from '@/src/env';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const formDataEntries = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      subject: formData.get('subject')?.toString() ?? '',
      message: formData.get('message')?.toString() ?? '',
    };

    const { data, error } = await new Resend(key).emails.send({
      from: `${formDataEntries.name} <info@chiesagraziaeverita.com>`,
      to: ['chiesagraziaeverita@gmail.com'],
      subject: formDataEntries.subject,
      react: EmailTemplate(formDataEntries),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
