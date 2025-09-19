import { getResumes } from "./get-resumes";
import { Resumes } from "./resumes";

export default async function Page() {
  const resumes = await getResumes()

  return <Resumes initResumes={resumes} />
}