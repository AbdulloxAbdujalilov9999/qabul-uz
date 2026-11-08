"use client";

import { useActionState } from "react";
import Link from "next/link";
import { logInAction, type AuthState } from "@/lib/actions/auth";
import { Container, Button } from "@/components/ui";

const initialState: AuthState = {};

export default function LogInPage() {
  const [state, formAction, pending] = useActionState(logInAction, initialState);

  return (
    <Container className="max-w-md py-16">
      <h1 className="text-2xl font-extrabold text-ink-950">Kirish</h1>
      <p className="mt-2 text-sm text-ink-600">Qaytganingizdan xursandmiz.</p>

      <form action={formAction} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-ink-900">
          Email
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-ink-900/15 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="block text-sm font-medium text-ink-900">
          Parol
          <input name="password" type="password" required className="mt-1 w-full rounded-lg border border-ink-900/15 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </label>

        {state.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}

        <Button type="submit" className="w-full" size="lg">
          {pending ? "Kirilmoqda..." : "Kirish"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-600">
        Hisobingiz yo&apos;qmi? <Link href="/royxatdan-otish" className="font-semibold text-brand-700">Ro&apos;yxatdan o&apos;tish</Link>
      </p>
    </Container>
  );
}
