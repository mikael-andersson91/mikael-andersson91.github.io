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
  repository?: string
  owner?: string
  version?: string
}

const WorkflowInputList: React.FC<WorkflowInputs> = (props) => {
  const repository = props.repository;
  const owner = props.owner || 'mikael-andersson91';
  const version = props.version || 'main'; // Default version, can be changed if needed
  
  console.log('Repository:', repository); // Debug log
  console.log('Workflow:', props.workflow); // Debug log
  
  // For now, let's just try the simple @site path and handle errors gracefully
  let wf, workflowCall;
  try {
    wf = require(`yaml-loader!@site/.github/workflows/${props.workflow}`)
    workflowCall = wf?.default?.on?.workflow_call
  } catch (error) {
    console.error('Error loading workflow file:', error)
    return <p>Error: Could not load workflow file. Please check that the file exists and is accessible.</p>
  }

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
