import React from 'react'

const MessageForm = ({ operation, data }: {
  operation: 'create' | 'update',
  data?: any
}) => {
  return (
    <div>MessageForm {operation}</div>
  )
}

export default MessageForm