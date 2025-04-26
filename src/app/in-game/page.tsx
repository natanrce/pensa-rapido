import allQuestions from "./questions.json";
import { Question } from "@/components/question";

export const dynamic = "force-dynamic";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default async function InGame() {
  const questions = allQuestions as unknown as {
    question: string;
    answers: string[];
  }[];

  const { question, answers } =
    questions[Math.floor(Math.random() * questions.length)];

  const randomAnswers = shuffle(answers);

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Question
        question={question}
        correctAnswers={answers}
        randomAnswers={randomAnswers}
      />
    </div>
  );
}
