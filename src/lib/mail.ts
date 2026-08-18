import { company } from '~/data/company';

export interface MailPayload {
  subject: string;
  rows: [string, string][];
  replyTo?: string;
}

interface Env {
  RESEND_API_KEY?: string;
  MAIL_TO?: string;
  MAIL_FROM?: string;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!,
  );

export async function sendMail(payload: MailPayload, env: Env): Promise<void> {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY lipsește');

  const html = `<table cellpadding="6" style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">
${payload.rows
  .filter(([, value]) => value)
  .map(
    ([label, value]) =>
      `<tr><td style="color:#6B747B">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
  )
  .join('\n')}
</table>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.MAIL_FROM ?? `site@${new URL('https://clar-expert.com').hostname}`,
      to: [env.MAIL_TO ?? company.email],
      subject: payload.subject,
      html,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${await response.text()}`);
  }
}

/** Validare minimă comună celor două formulare. */
export function readForm(data: FormData, fields: string[]) {
  const out: Record<string, string> = {};
  for (const field of fields) {
    const value = data.get(field);
    out[field] = typeof value === 'string' ? value.trim().slice(0, 2000) : '';
  }
  return out;
}

export const isSpam = (data: FormData) => Boolean(data.get('website'));

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
