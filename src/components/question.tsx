"use client";

import { motion } from "framer-motion";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useRef, useState } from "react";

interface QuestionProps {
  question: string;
  correctAnswers: string[];
  randomAnswers: string[];
}

const FormSchema = z.object({
  items: z.array(z.string()).min(4, {
    message: "Você precisa organizar os 4 itens.",
  }),
});

export function Question({
  question,
  correctAnswers,
  randomAnswers,
}: QuestionProps) {
  const COUNTDOWN_TIME = 15;

  const startTime = useRef(Date.now());
  const targetTime = useRef(Date.now() + COUNTDOWN_TIME * 1000);

  const [timer, setTimer] = useState(COUNTDOWN_TIME);

  const timeLeft = () => {
    const now = Date.now();
    return Math.max(0, Math.floor((targetTime.current - now) / 1000));
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timeLeft());
    }, 1000);

    if (timer <= 0) {
      toast.error("O tempo acabou!");
      clearInterval(interval);
    }

    if (form.formState.isSubmitSuccessful) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [form.formState.isSubmitSuccessful, timer]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const isCorrect = data.items.every((item, index) => {
      return item === correctAnswers[index];
    });

    if (!isCorrect) {
      toast.error("Você errou, tente novamente!");
      return;
    }

    toast.success(
      `Parabéns, você organizou todos os itens em ${
        (Date.now() - startTime.current) / 1000
      } segundos!`
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">{question}</FormLabel>
              </div>
              {randomAnswers.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex items-center pl-4 border rounded-md border-dashed transition-colors [&:has([data-state='checked'])]:border-blue-500 [&:has([data-state='checked'])]:bg-blue-500/10"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  );
                            }}
                            disabled={
                              timer <= 0 || form.formState.isSubmitSuccessful
                            }
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal w-full min-h-12">
                          {item}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full relative transition-colors bg-green-600 text-white hover:bg-green-600"
          disabled={timer <= 0 || form.formState.isSubmitSuccessful}
        >
          <motion.div
            className="absolute inset-0 left-0 top-0 bottom-0 bg-green-700 rounded-l-md"
            animate={{
              width: `${(timer / COUNTDOWN_TIME) * 100}%`,
            }}
            transition={{
              duration: 1,
              ease: "linear",
            }}
          />
          <span className="relative z-10">
            {timer <= 0 ? "Tempo Esgotado" : `Enviar (${timer})`}
          </span>
        </Button>
      </form>
    </Form>
  );
}
