export class Job {
  id: string
  name: string
  steps: Step[]
}

export class Step {
  id: string
  name: string
  uses: string
  script: boolean
}
