import {
  faFile,
  faFileAlt, faImage,
  faLink,
  faPlayCircle,
  faVideo,
} from '@fortawesome/free-solid-svg-icons'
import { LinkPreviewProps } from 'components/Link/LinkPreview'
import LinkView from 'components/Link/LinkView'
import Resource from 'models/Resource'
import React from 'react'

const ResourcePreview: React.FC<LinkPreviewProps> = ({ link}) => {

  let resource = link.link as Resource;

  if (resource.type == "VID") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={faVideo}
        color={"white"}
      />
    )
  }

  if (resource.type == "PDF") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={faFileAlt}
        color={"white"}
      />
    )
  }

  if (resource.type == "IMG") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={faImage}
        color={"white"}
      />
    )
  }

  if (resource.type == "YT") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={faPlayCircle}
        color={"white"}
      />
    )
  }

  if (resource.type == "URL") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={faLink}
        href={resource.url}
        openInNewTab={true}
        color={"white"}
      />
    )
  }

  return (
    <LinkView
      title={resource.name}
      subtitle={resource.description}
      icon={faFile}
      color={"white"}
    />
  )
}

export default ResourcePreview