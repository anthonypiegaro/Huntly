import { Button } from "@/components/ui/button"
import { getFit } from "./get-fit.action"
import { Fit } from "./fit"

export default function Automations() {
  // have promise.all that grabs our resumes
  // or our fit data

  return (
    <>
      <h1 className="text-3xl font-semibold">
        Automations
      </h1>
      <Fit />
    </>
  )
}