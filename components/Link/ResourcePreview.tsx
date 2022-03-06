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

  let title = resource.name;
  let subtitle = <><b>{resource.getTypeLabel()}</b> • {resource.description}</>;

  if (resource.type == "VID") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"white"}
        href={generateEventRoute(organisationId, resource.course_id, resource.id)}
      />
    )
  }

  if (resource.type == "PDF") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"white"}
        href={generateResourceRoute(organisationId, resource.course_id, resource.id)}
      />
    )
  }

  if (resource.type == "IMG") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"white"}
      />
    )
  }

  if (resource.type == "YT") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"white"}
      />
    )
  }

  if (resource.type == "URL") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        href={resource.url}
        openInNewTab={true}
        color={"white"}
      />
    )
  }

  return (
    <LinkView
      title={title}
      subtitle={subtitle}
      icon={resource.getIcon()}
      color={"white"}
    />
  )
}

export default ResourcePreview