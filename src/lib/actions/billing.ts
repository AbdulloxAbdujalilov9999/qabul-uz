"use server";

import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/session";
import { grantRubies, activateSubscription, getParentLink, createParentLink, markParentLinkPaid } from "@/lib/db";

// Demo top-up: stands in for a Click/Payme checkout. Swap the body for a real
// payment-provider redirect + webhook before launch.
export async function demoTopUpRubies(amount: number) {
  const userId = await getSessionUserId();
  if (!userId) return;
  await grantRubies(userId, amount, "purchase");
  revalidatePath("/ilova/hamyon");
}

export async function generateParentLink() {
  const userId = await getSessionUserId();
  if (!userId) return;
  const existing = await getParentLink(userId);
  if (existing && existing.status === "pending") return;
  await createParentLink(userId);
  revalidatePath("/ilova/hamyon");
}

// Demo: stands in for the parent completing Click/Payme checkout on the
// public /ota-ona/[token] page. No session here -- the token is the access
// control (see the parent_payment_links RLS policy notes in the migration).
export async function simulateParentPayment(token: string) {
  await markParentLinkPaid(token);
  revalidatePath(`/ota-ona/${token}`);
}

export async function demoActivateSubscription(plan: "monthly" | "annual") {
  const userId = await getSessionUserId();
  if (!userId) return;
  await activateSubscription(userId, plan);
  revalidatePath("/ilova/hamyon");
}
