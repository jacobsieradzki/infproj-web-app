import { faExclamationTriangle, faFile, faFileVideo, faHighlighter, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateResourcePDFClipRoute, generateResourceVideoClipRoute } from 'constants/navigation'
import { captionForVideoClipPreview, formatHHMMSS } from 'helper/time'
import Clip from 'models/Clip'
import Resource from 'models/Resource'
import React from 'react'
import { useRouter } from 'next/router';
import { LinkPreviewProps } from 'components/Link/LinkPreview'
import LinkView from 'components/Link/LinkView'

interface ClipPreviewProps {
  clip: Clip;
  reactions?: boolean;
}

const ClipPreview: React.FC<ClipPreviewProps> = ({ clip, reactions = false }) => {

  const router = useRouter();
  const organisationId = router?.query?.organisationId?.toString() || "";

  let resource = new Resource(clip?.resource);

  if (clip.type == "PDF_CLIP" && resource) {
    return (
      <LinkView
        title={resource.name}
        subtitle={clip.isImage() ? null : clip.content}
        image={clip.isImage() ? clip.content : null}
        caption={"Excerpt from " + clip.description}
        icon={faHighlighter}
        color={"white"}
        href={generateResourcePDFClipRoute(clip, organisationId)}
        reactions={reactions}
      />
    )
  }

  if (clip.type == "PDF_PAGE" && resource) {
    let title = "Page " + clip.start_location.toString();
    if (clip.description)  title += ": " + clip.description;
    return (
      <LinkView
        title={resource.name}
        subtitle={clip.isImage() ? null : clip.content}
        image={clip.isImage() ? clip.content : null}
        caption={title}
        icon={clip.isImage() ? null : resource.getIcon()}
        color={"white"}
        href={generateResourcePDFClipRoute(clip, organisationId)}
        reactions={reactions}
      />
    )
  }

  if (clip.type == "VIDEO_CLIP" && resource) {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        caption={captionForVideoClipPreview(clip)}
        icon={faFileVideo}
        color={"white"}
        href={generateResourceVideoClipRoute(clip, organisationId)}
        reactions={reactions}
      />
    )
  }

  return (
    <LinkView
      title={clip.description}
      subtitle={clip.type}
      icon={faExclamationTriangle}
      color={"orange"}
      reactions={reactions}
    />
  )
}

export default ClipPreview