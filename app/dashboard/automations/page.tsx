import { columns} from "./columns"
import { DataTable } from "./data-table"
import { getResumes } from "./get-resumes"
import { getFitData } from "./get-fit-data"

// const fits: Fit[] = [
//   {
//     id: "fit-001",
//     role: "Senior Frontend Developer",
//     company: "TechNova Solutions",
//     resume: { id: "resume-001", name: "John_Doe_Resume.pdf" },
//     score: 92,
//     tracked: true,
//     createdAt: "2024-03-15T10:30:00Z"
//   },
//   {
//     id: "fit-002",
//     role: "Data Scientist",
//     company: "DataSphere Analytics",
//     resume: { id: "resume-002", name: "Sarah_Johnson_Resume.pdf" },
//     score: 85,
//     tracked: false,
//     createdAt: "2024-03-14T14:22:00Z"
//   },
//   {
//     id: "fit-003",
//     role: "DevOps Engineer",
//     company: "CloudScale Systems",
//     resume: { id: "resume-003", name: "Mike_Chen_Resume.pdf" },
//     score: 78,
//     tracked: true,
//     createdAt: "2024-03-13T09:15:00Z"
//   },
//   {
//     id: "fit-004",
//     role: "UX/UI Designer",
//     company: "DesignFlow Studio",
//     resume: { id: "resume-004", name: "Emily_Roberts_Resume.pdf" },
//     score: 96,
//     tracked: true,
//     createdAt: "2024-03-12T16:45:00Z"
//   },
//   {
//     id: "fit-005",
//     role: "Backend Developer",
//     company: "APIForge Technologies",
//     resume: { id: "resume-005", name: "David_Martinez_Resume.pdf" },
//     score: 81,
//     tracked: false,
//     createdAt: "2024-03-11T11:20:00Z"
//   },
//   {
//     id: "fit-006",
//     role: "Product Manager",
//     company: "InnovateHub Inc",
//     resume: { id: "resume-006", name: "Lisa_Wang_Resume.pdf" },
//     score: 89,
//     tracked: true,
//     createdAt: "2024-03-10T13:55:00Z"
//   },
//   {
//     id: "fit-007",
//     role: "Mobile App Developer",
//     company: "AppCraft Solutions",
//     resume: { id: "resume-007", name: "Tom_Harrison_Resume.pdf" },
//     score: 83,
//     tracked: true,
//     createdAt: "2024-03-09T08:40:00Z"
//   },
//   {
//     id: "fit-008",
//     role: "Security Analyst",
//     company: "CyberShield Corp",
//     resume: { id: "resume-008", name: "Rachel_Lee_Resume.pdf" },
//     score: 94,
//     tracked: false,
//     createdAt: "2024-03-08T15:10:00Z"
//   },
//   {
//     id: "fit-009",
//     role: "Database Administrator",
//     company: "DataVault Systems",
//     resume: { id: "resume-009", name: "Kevin_Brown_Resume.pdf" },
//     score: 77,
//     tracked: true,
//     createdAt: "2024-03-07T12:05:00Z"
//   },
//   {
//     id: "fit-010",
//     role: "Full Stack Engineer",
//     company: "WebSync Technologies",
//     resume: { id: "resume-010", name: "Amanda_Garcia_Resume.pdf" },
//     score: 91,
//     tracked: true,
//     createdAt: "2024-03-06T17:30:00Z"
//   },
//   {
//     id: "fit-011",
//     role: "Cloud Architect",
//     company: "Nimbus Cloud Services",
//     resume: { id: "resume-011", name: "Chris_Thompson_Resume.pdf" },
//     score: 86,
//     tracked: false,
//     createdAt: "2024-03-05T10:25:00Z"
//   },
//   {
//     id: "fit-012",
//     role: "Business Analyst",
//     company: "StrategyCore Consulting",
//     resume: { id: "resume-012", name: "Jennifer_White_Resume.pdf" },
//     score: 88,
//     tracked: true,
//     createdAt: "2024-03-04T14:50:00Z"
//   },
//   {
//     id: "fit-013",
//     role: "QA Engineer",
//     company: "QualityCheck Labs",
//     resume: { id: "resume-013", name: "Mark_Davis_Resume.pdf" },
//     score: 82,
//     tracked: true,
//     createdAt: "2024-03-03T11:35:00Z"
//   },
//   {
//     id: "fit-014",
//     role: "Systems Administrator",
//     company: "ITSecure Networks",
//     resume: { id: "resume-014", name: "Patricia_Miller_Resume.pdf" },
//     score: 79,
//     tracked: false,
//     createdAt: "2024-03-02T09:20:00Z"
//   },
//   {
//     id: "fit-015",
//     role: "AI/ML Engineer",
//     company: "NeuralNet Innovations",
//     resume: { id: "resume-015", name: "Robert_Jackson_Resume.pdf" },
//     score: 97,
//     tracked: true,
//     createdAt: "2024-03-01T16:15:00Z"
//   },
//   {
//     id: "fit-016",
//     role: "Technical Writer",
//     company: "DocuTech Solutions",
//     resume: { id: "resume-016", name: "Susan_Wilson_Resume.pdf" },
//     score: 84,
//     tracked: true,
//     createdAt: "2024-02-29T13:40:00Z"
//   },
//   {
//     id: "fit-017",
//     role: "Project Manager",
//     company: "AgilePath Projects",
//     resume: { id: "resume-017", name: "Daniel_Anderson_Resume.pdf" },
//     score: 90,
//     tracked: false,
//     createdAt: "2024-02-28T10:55:00Z"
//   },
//   {
//     id: "fit-018",
//     role: "Network Engineer",
//     company: "ConnectSphere Telecom",
//     resume: { id: "resume-018", name: "Michelle_Taylor_Resume.pdf" },
//     score: 87,
//     tracked: true,
//     createdAt: "2024-02-27T15:25:00Z"
//   },
//   {
//     id: "fit-019",
//     role: "Front end Developer",
//     company: "UIEvolution Design",
//     resume: { id: "resume-019", name: "James_Thomas_Resume.pdf" },
//     score: 80,
//     tracked: true,
//     createdAt: "2024-02-26T12:10:00Z"
//   },
//   {
//     id: "fit-020",
//     role: "Software Architect",
//     company: "CodeFramework Inc",
//     resume: { id: "resume-020", name: "Elizabeth_Moore_Resume.pdf" },
//     score: 95,
//     tracked: false,
//     createdAt: "2024-02-25T18:30:00Z"
//   }
// ]

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