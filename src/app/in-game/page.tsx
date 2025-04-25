import allQuestions from "./questions.json";
import { Question } from "@/components/question";

export const dynamic = "force-dynamic";

export default async function InGame() {
  const questions = allQuestions as unknown as {
    question: string;
    answers: string[];
  }[];

  const { question, answers } =
    questions[Math.floor(Math.random() * questions.length)];

  const randomAnswers = [...answers].sort(() => Math.random() - 0.5);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Question
        question={question}
        correctAnswers={answers}
        randomAnswers={randomAnswers}
      />
    </div>
  );
}
