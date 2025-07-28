import React from 'react'

// Define the type for the workflow inputs
interface ActionOutput {
  output?: string
  description?: string
}

// Define the type for the props
interface ActionOutputs {
  repository: string
}

const ActionOutputList: React.FC<ActionOutputs> = (props) => {
  // Check if repository prop is provided
  if (!props.repository) {
    return <p>Error: Repository not specified</p>
  }

  console.log('Repository path:', props.repository) // Debug log
  console.log('Full path would be:', `@site/${props.repository}/action.yml`) // Debug log
  const action = require(`yaml-loader!@site/${props.repository}/action.yml`)
  console.log('Loaded YAML:', action) // Debug log
  console.log('YAML default:', action.default) // Debug log
  console.log('YAML inputs:', action.default?.outputs) // Debug log
  const inputs: { [key: string]: ActionOutput } = action.default?.outputs

  if (inputs == null || inputs == undefined) {
    console.log('Inputs are null/undefined') // Debug log
    return <p>There are no inputs defined for this action</p>
  } else {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Output</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(inputs).map((value, idx) => {
            return (
              <tr key={idx}>
                <td className="input">{value}</td>
                <td className="inputDesc">{inputs[value].description || 'missing description'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default ActionOutputList
