import React from 'react'

interface WorkflowSecret {
  secret?: string
  description?: string
}

interface WorkflowSecrets {
  workflow: string
}

const WorkflowSecretList: React.FC<WorkflowSecrets> = (props) => {
  const wf = require('yaml-loader!@site/.github/workflows/' + props.workflow)
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
