"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeLessonAction } from "@/lib/actions/lessons";
import { Button } from "./ui";

export function CompleteLessonButton({ lessonId }: { lessonId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          await completeLessonAction(lessonId);
          router.push("/ilova");
        })
      }
    >
      {pending ? "Saqlanmoqda..." : "Darsni tugatish ✓"}
    </Button>
  );
}
