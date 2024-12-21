import EmailTemplate from '@/containers/contact-us-page/contact-section/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const formDataEntries = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      subject: formData.get('subject')?.toString() ?? '',
      message: formData.get('message')?.toString() ?? '',
    };

    const { data, error } = await resend.emails.send({
      from: `${formDataEntries.name} <info@chiesagraziaeverita.com>`,
      to: ['chiesagraziaeverita@gmail.com'],
      subject: formDataEntries.subject,
      react: EmailTemplate(formDataEntries),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
