import React from 'react'

interface WorkflowSecret {
  secret?: string
  description?: string
}

interface WorkflowSecrets {
  workflow: string
  repository?: string
  owner?: string
  version?: string
}

const WorkflowSecretList: React.FC<WorkflowSecrets> = (props) => {
  const repository = props.repository;
  const owner = props.owner || 'mikael-andersson91';
  const version = props.version || 'main';
  const wfPath = (repository?.trim().length > 0) 
    ? `@site/${repository}/.github/workflows/${props.workflow}` 
    : `@site/.github/workflows/${props.workflow}`;  // Using yaml-loader to load the workflow file
  const wf = require('yaml-loader!' + wfPath)
  const workflowCall = wf?.default?.on?.workflow_call
  const secrets: { [key: string]: WorkflowSecret } | undefined = workflowCall?.secrets

  if (secrets == undefined) {
    return <p>There are no secrets defined in this workflow</p>
  } else {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Secret</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(secrets).map((value, idx) => {
            return (
              <tr key={idx}>
                <td className="secret">{value}</td>
                <td className="secretDesc">{secrets[value].description || 'missing description'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default WorkflowSecretList
