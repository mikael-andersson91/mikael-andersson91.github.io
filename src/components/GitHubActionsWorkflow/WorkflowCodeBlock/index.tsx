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
  const wf = require('raw-loader!@site/.github/workflows/' + props.workflow).default
  const workflowLink = `https://github.com/${owner}/${props.repository}/blob/${version}/.github/workflows/${props.workflow}`
  return (
    <CodeBlock language="yml" title=<a href={workflowLink}>{props.workflow}</a> showLineNumbers={true}>
      {wf}
    </CodeBlock>
  )
}

export default WorkflowCodeBlock
