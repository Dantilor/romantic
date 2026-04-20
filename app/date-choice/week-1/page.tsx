import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DateChoiceView } from "@/components/date-choice/DateChoiceView";
import { getQuizForWeek } from "@/data/quizzes";

export const metadata: Metadata = {
  title: "Свидание · Неделя 1",
};

export default function DateChoiceWeek1Page() {
  const quiz = getQuizForWeek(1);
  if (!quiz) notFound();
  return <DateChoiceView quiz={quiz} />;
}
