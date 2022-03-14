import { faExclamationTriangle, faFileVideo, faHighlighter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinkView from 'components/Link/LinkView'
import { captionForVideoClipPreview, formatHHMMSS } from 'helper/time'
import Clip from 'models/Clip'
import Resource from 'models/Resource'
import React from 'react'

interface ChooseClipPreviewProps {
  clip: Clip;
  resource: Resource;
  onClick: () => void;
}

const ChooseClipPreview: React.FC<ChooseClipPreviewProps> = ({ clip, resource, onClick }) => {
  if (clip.type == "PDF_CLIP" && resource) {
    return (
      <LinkView light
        title={clip.description}
        subtitle={clip.isImage() ? null : clip.content}
        image={clip.isImage() ? clip.content : null}
        caption={<><FontAwesomeIcon icon={resource.getIcon()} />&nbsp;&nbsp;{resource.name}</>}
        icon={faHighlighter}
        color={"var(--primary-color)"}
        onClick={onClick}
      />
    )
  }

  if (clip.type == "PDF_PAGE" && resource) {
    let title = "Page " + clip.start_location.toString();
    if (clip.description)  title += ": " + clip.description;
    return (
      <LinkView light
        title={title}
        subtitle={clip.isImage() ? null : clip.content}
        image={clip.isImage() ? clip.content : null}
        caption={<><FontAwesomeIcon icon={resource.getIcon()} />&nbsp;&nbsp;{resource.name}</>}
        color={"var(--primary-color)"}
        onClick={onClick}
      />
    )
  }

  if (clip.type == "VIDEO_CLIP" && resource) {
    return (
      <LinkView light
        title={resource.name}
        subtitle={resource.description}
        caption={captionForVideoClipPreview(clip)}
        icon={faFileVideo}
        color={"var(--primary-color)"}
        onClick={onClick}
      />
    )
  }

  return (
    <LinkView light
      title={clip.description}
      subtitle={clip.type}
      icon={faExclamationTriangle}
      color={"orange"}
      onClick={onClick}
    />
  )
}

export default ChooseClipPreview