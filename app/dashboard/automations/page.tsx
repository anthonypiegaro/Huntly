import { columns} from "./columns"
import { DataTable } from "./data-table"
import { getResumes } from "./get-resumes"
import { getFitData } from "./get-fit-data"

export type Resume = {
  id: string
  name: string
}

export default async function Automations() {
  const [resumes, fitData] = await Promise.all([
    getResumes(),
    getFitData()
  ])

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} initData={fitData} resumes={resumes} />
    </div>
  )
}