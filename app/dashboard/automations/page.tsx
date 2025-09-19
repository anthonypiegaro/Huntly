import { Button } from "@/components/ui/button"
import { getFit } from "./get-fit.action"
import { Fit } from "./fit"

export default function Automations() {
  return (
    <>
      <h1 className="text-3xl font-semibold">
        Automations
      </h1>
      <Fit />
    </>
  )
}