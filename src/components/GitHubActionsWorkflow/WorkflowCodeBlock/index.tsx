import React from 'react'
import CodeBlock from '@theme/CodeBlock'

interface WorkflowCodeBlockProps {
  workflow: string
}

const WorkflowCodeBlock: React.FC<WorkflowCodeBlockProps> = (props) => {
  const wf = require('raw-loader!@site/.github/workflows/' + props.workflow).default
  const workflowLink = `https://github.com/mikael-andersson91/rpa-devops/blob/main/.github/workflows/${props.workflow}`
  return (
    <CodeBlock language="yml" title=<a href={workflowLink}>{props.workflow}</a> showLineNumbers={true}>
      {wf}
    </CodeBlock>
  )
}

export default WorkflowCodeBlock
