import React from 'react'

interface WorkflowOutput {
  output?: string
  description?: string
  value?: string
}

interface WorkflowOutputs {
  workflow: string
}

const WorkflowOutputList: React.FC<WorkflowOutputs> = (props) => {
  const wf = require('yaml-loader!@site/.github/workflows/' + props.workflow)
  const workflowCall = wf?.default?.on?.workflow_call
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
