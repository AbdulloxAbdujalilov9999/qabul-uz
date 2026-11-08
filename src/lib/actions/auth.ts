"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AuthState {
  error?: string;
  info?: string;
}

export async function signUpAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const ageConfirmed = formData.get("ageConfirmed");

  if (!fullName || !username || !email || !password) return { error: "Barcha maydonlarni to'ldiring." };
  if (password.length < 8) return { error: "Parol kamida 8 belgidan iborat bo'lishi kerak." };
  if (!ageConfirmed) return { error: "Davom etish uchun yosh tasdiqlanishi kerak." };

  const supabase = await createClient();

  const { data: usernameTaken } = await supabase.rpc("is_username_taken", { check_username: username });
  if (usernameTaken) return { error: "Bu foydalanuvchi nomi band." };

  // profiles/streaks/ruby_wallets/institution_students are provisioned by the
  // on_auth_user_created DB trigger (see migration auto_provision_new_user) --
  // it runs regardless of whether email confirmation leaves this client
  // signed in yet, which a client-side insert here could not guarantee.
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, username } },
  });
  if (error) {
    if (error.message.toLowerCase().includes("already registered")) return { error: "Bu email bilan hisob allaqachon mavjud." };
    return { error: error.message };
  }
  if (!data.user) return { error: "Hisob yaratilmadi, qayta urinib ko'ring." };

  if (!data.session) {
    return { info: "Hisob yaratildi. Email manzilingizga yuborilgan havolani tasdiqlang, so'ng kiring." };
  }

  redirect("/ilova");
}

export async function logInAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Email yoki parol noto'g'ri." };
  redirect("/ilova");
}

export async function logOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
