import type { APIRoute } from 'astro';
import { isEmail, isSpam, readForm, sendMail } from '~/lib/mail';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const data = await request.formData();
  const wantsJson = request.headers.get('accept')?.includes('application/json');

  if (isSpam(data)) {
    return wantsJson ? new Response(null, { status: 204 }) : redirect('/?sent=1', 303);
  }

  const form = readForm(data, ['name', 'email', 'phone', 'message', 'locale']);

  if (!form.name || !form.phone || !form.message || !isEmail(form.email)) {
    return new Response(JSON.stringify({ error: 'invalid' }), {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
  }

  const env = (locals as { runtime?: { env?: Record<string, string> } }).runtime?.env ?? (import.meta.env as unknown as Record<string, string>);

  try {
    await sendMail(
      {
        subject: `Mesaj din site — ${form.name}`,
        replyTo: form.email,
        rows: [
          ['Nume', form.name],
          ['E-mail', form.email],
          ['Telefon', form.phone],
          ['Mesaj', form.message],
          ['Limba', form.locale],
        ],
      },
      env,
    );
  } catch (error) {
    console.error('[contact]', error);
    return new Response(JSON.stringify({ error: 'send_failed' }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }

  return wantsJson
    ? new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } })
    : redirect('/?sent=1', 303);
};
