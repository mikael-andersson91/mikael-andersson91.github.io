import React from 'react'
import CodeBlock from '@theme/CodeBlock'

interface WorkflowCodeBlockProps {
  workflow: string
  owner?: string
  repository?: string
  version?: string
}

const WorkflowCodeBlock: React.FC<WorkflowCodeBlockProps> = (props) => {
  const owner = props.owner || 'mikael-andersson91';
  const version = props.version || 'main';
  const repository = props.repository;
  
  const wfPath = (repository?.trim().length > 0) 
    ? `@site/${repository}/.github/workflows/${props.workflow}` 
    : `@site/.github/workflows/${props.workflow}`; 
  const wf = require('raw-loader!' + wfPath).default
  const workflowLink = `https://github.com/${owner}/${repository}/blob/${version}/.github/workflows/${props.workflow}`
  return (
    <CodeBlock language="yml" title=<a href={workflowLink}>{props.workflow}</a> showLineNumbers={true}>
      {wf}
    </CodeBlock>
  )
}

export default WorkflowCodeBlock
