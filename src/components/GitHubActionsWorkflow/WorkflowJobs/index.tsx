import React, { useEffect, useState } from 'react'
import yaml, { stringify } from 'yaml'

interface Step {
  id?: string
  name?: string
  uses?: string
  if?: string
}

interface Job {
  name?: string
  uses?: string
  steps?: Step[]
  if?: string
  needs?: string[]
}

interface Workflow {
  jobs?: { [key: string]: Job }
}

interface WorkflowJobProps {
  workflow: string
}

const WorkflowJobsList: React.FC<WorkflowJobProps> = (props) => {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const loadWorkflow = async () => {
      const wf = require('raw-loader!@site/.github/workflows/' + props.workflow).default
      const parsedWorkflow: Workflow = yaml.parse(wf)
      const jobsArray = Object.keys(parsedWorkflow.jobs).map((jobName) => ({
        ...parsedWorkflow.jobs[jobName],
        name: jobName
      }))
      setJobs(jobsArray)
    }

    loadWorkflow()
  }, [props.workflow])

  return (
    <div>
      {jobs.map((job, idx) => (
        <JobDetails key={idx} job={job} />
      ))}
    </div>
  )
}

const JobDetails: React.FC<{ job: Job }> = ({ job }) => {
  // Job has steps
  if (job.uses == null) {
    return (
      <div>
        <h3>{job.name}</h3>
        <p>
          This job performs the following steps. See links in <b>Uses</b> for actions used.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Step</th>
              <th>Uses</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {job.steps ? (
              job.steps.map((step, idx) => (
                <tr key={idx}>
                  <td>{step.id}</td>
                  <td>{step.name}</td>
                  <td>
                    {step.uses ? (
                      <a href={GetUsesLink(step.uses)} target="_blank" rel="noreferrer">
                        {step.uses}
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    <code>{step.if}</code>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No steps defined</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  } else {
    // Job reuses another workflow
    return (
      <div>
        <h3>{job.name}</h3>
        <p>This job uses another reusable workflow. See details below.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Uses</th>
              <th>Condition</th>
              <th>Needs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {job.uses ? (
                  <a href={GetUsesLink(job.uses)} target="_blank" rel="noreferrer">
                    {job.uses}
                  </a>
                ) : (
                  ''
                )}
              </td>
              <td>
                <code>{job.if}</code>
              </td>
              <td>
                <code>{GetNeedsList(job.needs)}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const GetUsesLink = (uses: string): string => {
  const parts = uses.split('@')
  const version = parts[1]
  const githubUrl = 'https://github.com/'
  if (parts[0].endsWith('.yml')) {
    if (parts[0].startsWith('.')) {
      // Return the GitHub URL for a workflow file within this repository
      return githubUrl.concat(`mikael-andersson91/rpa-devops/blob/main/${parts[0]}`)
    }
    // Return the GitHub URL for a workflow file from another repository
    const owner = parts[0].split('/')[0] + '/'
    const repo = parts[0].split('/')[1] + '/'
    const path = parts[0].split('/')[2]
    const workflowLinkPart = `blob/${version}/.github/workflows/${path}`
    return githubUrl.concat(owner, repo, workflowLinkPart)
  } else {
    // Return the GitHub URL for the repository of the action used
    return githubUrl.concat(parts[0], '/tree/', version)
  }
}

const GetNeedsList = (needs: string[]): string => {
  if (needs == null || needs == undefined) {
    return ''
  }
  console.log(needs)
  return needs.toString()
}

export default WorkflowJobsList
