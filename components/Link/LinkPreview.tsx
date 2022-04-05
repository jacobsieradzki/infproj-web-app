import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import ClipPreview from 'components/Link/ClipPreview'
import LinkView from 'components/Link/LinkView'
import ResourcePreview from 'components/Link/ResourcePreview'
import Clip from 'models/Clip'
import Resource from 'models/Resource'
import React from 'react'
import Link from 'models/Link'

export type LinkPreviewProps = {
  link: Link;
  reactions?: boolean;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ link, reactions = false}) => {

  if (link.link_type == "RESOURCE")
    return <ResourcePreview resource={new Resource(link.link)} reactions={reactions} />

  if (link.link_type == "CLIP")
    return <ClipPreview clip={new Clip(link.link)} reactions={reactions} />

  return (
    <LinkView
      title={"Not Found"}
      subtitle={""}
      icon={faExclamationTriangle}
      color={"orange"}
      reactions={reactions}
    />
  )
}

export default LinkPreview