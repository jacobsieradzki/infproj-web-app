import { faExclamationTriangle, faFile, faFileVideo, faHighlighter, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateResourcePDFClipRoute, generateResourceVideoClipRoute } from 'constants/navigation'
import Clip from 'models/Clip'
import Resource from 'models/Resource'
import React from 'react'
import { useRouter } from 'next/router';
import { LinkPreviewProps } from 'components/Link/LinkPreview'
import LinkView from 'components/Link/LinkView'

interface ClipPreviewProps {
  clip: Clip;
}

const ClipPreview: React.FC<ClipPreviewProps> = ({ clip }) => {

  const router = useRouter();
  const organisationId = router?.query?.organisationId?.toString() || "";

  let resource = new Resource(clip?.resource);

  if (clip.type == "PDF_CLIP" && resource) {
    return (
      <LinkView
        title={clip.description}
        subtitle={clip.isImage() ? null : clip.content}
        image={clip.isImage() ? clip.content : null}
        caption={<><FontAwesomeIcon icon={resource.getIcon()} />&nbsp;&nbsp;{resource.name}</>}
        icon={faHighlighter}
        color={"white"}
        href={generateResourcePDFClipRoute(clip, organisationId)}
      />
    )
  }

  if (clip.type == "PDF_PAGE" && resource) {
    let title = "Page " + clip.start_location.toString();
    if (clip.description)  title += ": " + clip.description;
    return (
      <LinkView
        title={title}
        subtitle={clip.isImage() ? null : clip.content}
        image={clip.isImage() ? clip.content : null}
        caption={<><FontAwesomeIcon icon={resource.getIcon()} />&nbsp;&nbsp;{resource.name}</>}
        color={"white"}
        href={generateResourcePDFClipRoute(clip, organisationId)}
      />
    )
  }

  if (clip.type == "VIDEO_CLIP" && resource) {
    let timeDifference = clip.end_location - clip.start_location;
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        caption={`${timeDifference} second clip`}
        icon={faFileVideo}
        color={"white"}
        href={generateResourceVideoClipRoute(clip, organisationId)}
      />
    )
  }

  return (
    <LinkView
      title={clip.description}
      subtitle={clip.type}
      icon={faExclamationTriangle}
      color={"orange"}
    />
  )
}

export default ClipPreview