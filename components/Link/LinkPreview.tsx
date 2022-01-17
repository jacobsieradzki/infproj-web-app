import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import LinkView from 'components/Link/LinkView'
import ResourcePreview from 'components/Link/ResourcePreview'
import React from 'react'
import Link from 'models/Link'

export type LinkPreviewProps = {
  link: Link;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ link}) => {

  if (link.link_type == "RESOURCE") {
    return <ResourcePreview link={link} />
  }

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