import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizView } from "@/components/quiz/QuizView";
import { getQuizForWeek } from "@/data/quizzes";

export const metadata: Metadata = {
  title: "Квиз · Неделя 3",
};

export default function QuizWeek3Page() {
  const quiz = getQuizForWeek(3);
  if (!quiz) notFound();
  return <QuizView quiz={quiz} />;
}
