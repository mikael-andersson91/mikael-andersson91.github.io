import React from 'react'

// Define the type for the workflow inputs
interface ActionInput {
  input?: string
  description?: string
  required?: boolean
  default?: string
}

// Define the type for the props
interface ActionInputs {
  repository: string
}

const ActionInputList: React.FC<ActionInputs> = (props) => {
  // Check if repository prop is provided
  if (!props.repository) {
    return <p>Error: Repository not specified</p>
  }

  console.log('Repository path:', props.repository) // Debug log
  console.log('Full path would be:', `@site/${props.repository}/action.yml`) // Debug log
  const action = require(`yaml-loader!@site/${props.repository}/action.yml`)
  console.log('Loaded YAML:', action) // Debug log
  console.log('YAML default:', action.default) // Debug log
  console.log('YAML inputs:', action.default?.inputs) // Debug log
  const inputs: { [key: string]: ActionInput } = action.default?.inputs

  if (inputs == null || inputs == undefined) {
    console.log('Inputs are null/undefined') // Debug log
    return <p>There are no inputs defined for this action</p>
  } else {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Input</th>
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

export default ActionInputList
