import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DateChoiceView } from "@/components/date-choice/DateChoiceView";
import { getQuizForWeek } from "@/data/quizzes";

export const metadata: Metadata = {
  title: "Свидание · Неделя 2",
};

export default function DateChoiceWeek2Page() {
  const quiz = getQuizForWeek(2);
  if (!quiz) notFound();
  return <DateChoiceView quiz={quiz} />;
}
