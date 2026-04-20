import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizView } from "@/components/quiz/QuizView";
import { getQuizForWeek } from "@/data/quizzes";

export const metadata: Metadata = {
  title: "Квиз · Неделя 1",
};

export default function QuizWeek1Page() {
  const quiz = getQuizForWeek(1);
  if (!quiz) notFound();
  return <QuizView quiz={quiz} />;
}
