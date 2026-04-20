import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizView } from "@/components/quiz/QuizView";
import { getQuizForWeek } from "@/data/quizzes";

export const metadata: Metadata = {
  title: "Квиз · Неделя 4",
};

export default function QuizWeek4Page() {
  const quiz = getQuizForWeek(4);
  if (!quiz) notFound();
  return <QuizView quiz={quiz} />;
}
