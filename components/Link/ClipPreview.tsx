import { faExclamationTriangle, faHighlighter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateResourcePDFClipRoute } from 'constants/navigation'
import Clip from 'models/Clip'
import Resource from 'models/Resource'
import React from 'react'
import { useRouter } from 'next/router';
import { LinkPreviewProps } from 'components/Link/LinkPreview'
import LinkView from 'components/Link/LinkView'

const ClipPreview: React.FC<LinkPreviewProps> = ({ link }) => {

  const router = useRouter();
  const organisationId = router?.query?.organisationId?.toString() || "";

  let clip = new Clip(link.link);
  let resource = new Resource(clip?.resource);

  if (["PDF_CLIP", "PDF_PAGE"].includes(clip.type) && resource) {
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

  if (clip.type == "VIDEO_CLIP" && resource) {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={resource.getIcon()}
        color={"white"}
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