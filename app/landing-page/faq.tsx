import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const faqs = [
  {
    question: "What is Huntly?",
    answer:
      "Huntly is a job application tracker that helps you stay organized, automate repetitive tasks, and gain insights into your job search. It’s built to handle thousands of applications without slowing down.",
  },
  {
    question: "Is Huntly really free?",
    answer:
      "Yes! Huntly is 100% free to use. There are no paywalls, hidden fees, or premium tiers—just tools that work.",
  },
  {
    question: "How does the automation work?",
    answer:
      "Huntly uses AI to generate tailored cover letters, fill in repetitive application questions, and streamline the application process. You provide your resume and job description, and Huntly handles the busywork.",
  },
  {
    question: "Can I track multiple resumes?",
    answer:
      "Absolutely. You can upload and manage multiple resumes, then quickly match the right one to the right job application.",
  },
  {
    question: "What kind of insights will I get?",
    answer:
      "Huntly analyzes your job search history to show you what’s working, what’s not, and how to improve your chances. You’ll see trends, success rates, and actionable recommendations.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation required. Huntly runs in your browser, giving you a smooth, native-like experience without downloads or setup.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your job applications, resumes, and personal information are stored securely. Huntly never sells your data to third parties.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="w-full px-2 md:px-8 lg:px-12 xl:px-18 2xl:px-24 pb-18 lg:pb-24">
      <h2 className="text-center text-4xl 2xl:text-6xl font-semibold mb-12">Frequently asked questions</h2>
      <div className="w-full flex flex-col gap-y-4">
        {faqs.map((faq, i) => (
          <QA question={faq.question} answer={faq.answer} key={i} />
        ))}
      </div>
    </section>
  )
}

function QA({
  question,
  answer
}: {
  question: string
  answer: string
}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={question} className="rounded-md bg-card px-4 border max-w-4xl mx-auto">
        <AccordionTrigger className="text-lg sm:text-2xl font-medium">{question}</AccordionTrigger>
        <AccordionContent className="font-medium text-muted-foreground">{answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
