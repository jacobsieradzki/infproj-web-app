import React from 'react'
import { useRouter } from 'next/router';
import { LinkPreviewProps } from 'components/Link/LinkPreview'
import LinkView from 'components/Link/LinkView'
import { generateEventRoute, generateResourceRoute, RESOURCE_ROUTE } from 'constants/navigation'
import Resource from 'models/Resource'

interface ResourcePreviewProps {
  resource?: Resource;

}

const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resource }) => {

  const router = useRouter();
  const organisationId = router?.query?.organisationId?.toString() || "";

  if (resource.type == "VID") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={resource.getIcon()}
        color={"white"}
        href={generateEventRoute(organisationId, resource.course_id, resource.id)}
      />
    )
  }

  if (resource.type == "PDF") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={resource.getIcon()}
        color={"white"}
        href={generateResourceRoute(organisationId, resource.course_id, resource.id)}
      />
    )
  }

  if (resource.type == "IMG") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={resource.getIcon()}
        color={"white"}
      />
    )
  }

  if (resource.type == "YT") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={resource.getIcon()}
        color={"white"}
      />
    )
  }

  if (resource.type == "URL") {
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        icon={resource.getIcon()}
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
      icon={resource.getIcon()}
      color={"white"}
    />
  )
}

export default ResourcePreview