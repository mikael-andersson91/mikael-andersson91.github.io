import React from 'react'

interface WorkflowOutput {
  output?: string
  description?: string
  value?: string
}

interface WorkflowOutputs {
  workflow: string
  repository?: string
  owner?: string
  version?: string
}

const WorkflowOutputList: React.FC<WorkflowOutputs> = (props) => {
  const repository = props.repository;
  const owner = props.owner || 'mikael-andersson91';
  const version = props.version || 'main';
  const wfPath = (repository?.trim().length > 0) 
    ? `@site/${repository}/.github/workflows/${props.workflow}` 
    : `@site/.github/workflows/${props.workflow}`;  const wf = require('yaml-loader!' + wfPath).default
  const workflowCall = wf?.on?.workflow_call
  const outputs: { [key: string]: WorkflowOutput } | undefined = workflowCall?.outputs

  if (outputs == undefined) {
    return <p>There are no outputs defined in this workflow</p>
  } else {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Output</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(outputs).map((value, idx) => {
            return (
              <tr key={idx}>
                <td className="output">{value}</td>
                <td className="outputDesc">{outputs[value].description || 'missing description'}</td>
                <td className="outputValue">
                  <code>{outputs[value].value !== undefined ? outputs[value].value.toString() : 'null'}</code>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default WorkflowOutputList
