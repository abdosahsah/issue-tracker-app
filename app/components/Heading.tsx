import React from 'react'

interface HeadingProps {
    title: string
}

function Heading({ title } : HeadingProps) {
  return (
    <h1 className="text-2xl font-bold mb-8">{title}</h1>
  )
}

export default Heading