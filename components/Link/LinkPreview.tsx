import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import ClipPreview from 'components/Link/ClipPreview'
import LinkView from 'components/Link/LinkView'
import ResourcePreview from 'components/Link/ResourcePreview'
import Organisation from 'models/Organisation'
import React from 'react'
import Link from 'models/Link'

export type LinkPreviewProps = {
  link: Link;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ link}) => {

  if (link.link_type == "RESOURCE")
    return <ResourcePreview link={link} />

  if (link.link_type == "CLIP")
    return <ClipPreview link={link} />

  return (
    <LinkView
      title={"Not Found"}
      subtitle={""}
      icon={faExclamationTriangle}
      color={"orange"}
    />
  )
}

export default LinkPreview