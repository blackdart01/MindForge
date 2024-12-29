import React from 'react'

const PDFInlineView = ({url}) => {
    url =  url.replace("view?", "preview?");
    
  return (
      <iframe src={url} width="800" height="600"></iframe>
)
}

export default PDFInlineView