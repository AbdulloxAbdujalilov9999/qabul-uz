import Link from "next/link";
import { getSessionUserId } from "@/lib/session";
import { getCollegeList } from "@/lib/db";
import { schools } from "@/lib/seed-data";
import { CompareTable } from "@/components/compare-table";

export default async function ComparePage() {
  const userId = (await getSessionUserId())!;
  const entries = await getCollegeList(userId);
  const listedSchools = entries
    .map((e) => schools.find((s) => s.id === e.schoolId))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-extrabold text-ink-950">Solishtirish</h1>
      <p className="mt-1 text-sm text-ink-600">Ro&apos;yxatingizdan 3 tagacha dasturni yonma-yon solishtiring.</p>

      {listedSchools.length === 0 ? (
        <p className="mt-6 text-sm text-ink-500">
          Ro&apos;yxatingiz bo&apos;sh. Avval <Link href="/ilova/royxatim" className="font-medium text-brand-700 hover:underline">Dasturlarim</Link> sahifasidan dastur qo&apos;shing.
        </p>
      ) : (
        <CompareTable schools={listedSchools} />
      )}
    </div>
  );
}
