import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { getProfile } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard-shell";

export default async function IlovaLayout({ children }: LayoutProps<"/ilova">) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/kirish?return_to=/ilova");
  const profile = await getProfile(userId);
  if (!profile) redirect("/kirish?return_to=/ilova");

  return <DashboardShell profile={profile}>{children}</DashboardShell>;
}
