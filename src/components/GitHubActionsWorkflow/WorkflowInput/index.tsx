import React from 'react'

// Define the type for the workflow inputs
interface WorkflowInput {
  input?: string
  type?: string
  description?: string
  required?: boolean
  default?: string
}

// Define the type for the props
interface WorkflowInputs {
  workflow: string
}

const WorkflowInputList: React.FC<WorkflowInputs> = (props) => {
  const wf = require('yaml-loader!@site/.github/workflows/' + props.workflow)
  const workflowCall = wf?.default?.on?.workflow_call
  const inputs: { [key: string]: WorkflowInput } = workflowCall?.inputs

  if (inputs == null || inputs == undefined) {
    return <p>There are no inputs defined in this workflow</p>
  } else {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Input</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(inputs).map((value, idx) => {
            return (
              <tr key={idx}>
                <td className="input">{value}</td>
                <td className="type">{inputs[value].type || 'not set'}</td>
                <td className="inputDesc">{inputs[value].description || 'missing description'}</td>
                <td className="inputRequired">
                  {inputs[value].required !== undefined ? inputs[value].required.toString() : 'false'}
                </td>
                <td className="inputDefault">
                  <code>{inputs[value].default !== undefined ? inputs[value].default.toString() : 'null'}</code>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default WorkflowInputList
