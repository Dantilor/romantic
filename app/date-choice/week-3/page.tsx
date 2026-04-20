import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DateChoiceView } from "@/components/date-choice/DateChoiceView";
import { getQuizForWeek } from "@/data/quizzes";

export const metadata: Metadata = {
  title: "Свидание · Неделя 3",
};

export default function DateChoiceWeek3Page() {
  const quiz = getQuizForWeek(3);
  if (!quiz) notFound();
  return <DateChoiceView quiz={quiz} />;
}
