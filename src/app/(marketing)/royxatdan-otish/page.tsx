"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpAction, type AuthState } from "@/lib/actions/auth";
import { Container, Button } from "@/components/ui";

const initialState: AuthState = {};

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  return (
    <Container className="max-w-md py-16">
      <h1 className="text-2xl font-extrabold text-ink-950">Hisob yaratish</h1>
      <p className="mt-2 text-sm text-ink-600">Bepul - birinchi 10 dars va barcha testlar sizniki.</p>

      {state.info ? (
        <p className="mt-6 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-800">{state.info}</p>
      ) : (
        <form action={formAction} className="mt-6 space-y-4">
          <Field label="To'liq ism" name="fullName" placeholder="Dildora Karimova" />
          <Field label="Foydalanuvchi nomi" name="username" placeholder="dildora_k" />
          <Field label="Email" name="email" type="email" placeholder="siz@misol.uz" />
          <Field label="Parol" name="password" type="password" placeholder="Kamida 8 belgi" />

          <label className="flex items-start gap-2 text-sm text-ink-600">
            <input type="checkbox" name="ageConfirmed" className="mt-1" />
            Men kamida 13 yoshdaman va Foydalanish shartlariga roziman.
          </label>

          {state.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}

          <Button type="submit" className="w-full" size="lg">
            {pending ? "Yaratilmoqda..." : "Hisob yaratish"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-ink-600">
        Hisobingiz bormi? <Link href="/kirish" className="font-semibold text-brand-700">Kirish</Link>
      </p>
    </Container>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <label className="block text-sm font-medium text-ink-900">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="mt-1 w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-ink-950 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}
