import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizView } from "@/components/quiz/QuizView";
import { getQuizForWeek } from "@/data/quizzes";

export const metadata: Metadata = {
  title: "Квиз · Неделя 2",
};

export default function QuizWeek2Page() {
  const quiz = getQuizForWeek(2);
  if (!quiz) notFound();
  return <QuizView quiz={quiz} />;
}
