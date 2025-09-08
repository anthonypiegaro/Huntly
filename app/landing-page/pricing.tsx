import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section id="pricing" className="w-full flex flex-col items-center px-2 md:px-8 lg:px-12 xl:px-18 2xl:px-24 pb-18 lg:pb-24">
      <h2 className="text-center text-4xl 2xl:text-6xl font-semibold mb-12">Pricing</h2>
      <div className="p-4 rounded-md border bg-card">
        <h3 className="text-xl font-medium mb-2">
          Free
        </h3>
        <h3 className="text-center text-3xl font-medium mb-2">
          $0/month
        </h3>
        <p className="font-medium text-muted-foreground mb-4">You shouldn&apos;t have to pay for trying to find a job, so don&apos;t.</p>
        <Button className="mb-4 font-bold w-full py-5">Start Hunting Your Next Job</Button>
        <h3 className="text-muted-foreground mb-2 font-medium">Comes with:</h3>
        <ul className="text-muted-foreground font-medium">
          <li className="list-disc list-inside">Unlimited Applications</li>
          <li className="list-disc list-inside">Unlimited Resumes</li>
          <li className="list-disc list-inside">Unlimited Cover Letters</li>
          <li className="list-disc list-inside">Unlimited Resume Question Answers</li>
          <li className="list-disc list-inside">Analytics Access</li>
        </ul>
      </div>
    </section>
  )
}