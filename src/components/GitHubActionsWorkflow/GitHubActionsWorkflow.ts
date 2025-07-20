import { WorkflowInput } from './WorkflowInput'
import { WorkflowOutput } from './WorkflowOutput'
import { WorkflowSecret } from './WorkflowSecret'
import { Job } from './Job'

export class GitHubActionsWorkflow {
  name: string
  fileName: string
  inputs: WorkflowInput[]
  outputs: WorkflowOutput[]
  secrets: WorkflowSecret[]
  jobs: Job[]
}
