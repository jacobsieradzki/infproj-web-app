import { faFileVideo } from '@fortawesome/free-solid-svg-icons'
import { captionForVideoClipPreview, formatHHMMSS } from 'helper/time'
import Link from 'models/Link'
import React from 'react'
import { useRouter } from 'next/router';
import { LinkPreviewProps } from 'components/Link/LinkPreview'
import LinkView from 'components/Link/LinkView'
import { generateEventRoute, generateResourceRoute, generateResourceVideoClipRoute, RESOURCE_ROUTE } from 'constants/navigation'
import Resource from 'models/Resource'

interface ResourcePreviewProps {
  link?: Link;
  resource?: Resource;
  reactions?: boolean;
}

const ResourcePreview: React.FC<ResourcePreviewProps> = ({ link, resource, reactions = false, }) => {

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
        href={generateResourceRoute(organisationId, resource.course_id, resource.id)}
        reactions={reactions}
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
        reactions={reactions}
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
        reactions={reactions}
      />
    )
  }

  if (resource.type == "YT") {
    return (
      <LinkView
        title={title}
        subtitle={resource.description}
        icon={resource.getIcon()}
        href={resource.url}
        openInNewTab={true}
        color={"white"}
        reactions={reactions}
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
        reactions={reactions}
      />
    )
  }

  return (
    <LinkView
      title={title}
      subtitle={subtitle}
      icon={resource.getIcon()}
      color={"white"}
      reactions={reactions}
    />
  )
}

export default ResourcePreview