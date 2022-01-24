import React from 'react'

type HighlightPopupProps = {
  comment: {
    text: string;
    emoji: string;
  };
}
export const HighlightPopup = ({ comment }: HighlightPopupProps) => {
  if (comment.text) {
    return (
      <div className="Highlight__popup">
        {comment.emoji} {comment.text}
      </div>
    )
  } else {
    return null;
  }
}