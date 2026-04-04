import React, { useEffect, useState } from 'react';

const ReplacePeriodsWithLineBreaks = ({ text }) => {
  const [modifiedText, setModifiedText] = useState('');

  useEffect(() => {
    // Replace periods with line breaks
    const newText = text.replace(/\./g, '.<br>');
    setModifiedText(newText);
  }, [text]);

  return (
    <div>
      <p dangerouslySetInnerHTML={{ __html: modifiedText }} />
    </div>
  );
}

export default ReplacePeriodsWithLineBreaks;
