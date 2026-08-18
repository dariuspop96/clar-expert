/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

interface Env {
  RESEND_API_KEY: string;
  MAIL_TO: string;
  MAIL_FROM: string;
  TURNSTILE_SECRET?: string;
}

declare namespace App {
  interface Locals extends Runtime {}
}
