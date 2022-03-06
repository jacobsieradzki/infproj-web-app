import React from 'react'
import useGetResources from 'classroomapi/useGetResources'
import { CreateLinkPopupProps } from 'components/CreateLinkPopup/CreateLinkPopup'
import LinkView from 'components/Link/LinkView'
import Resource from 'models/Resource'

interface ChooseResourceLinkProps { handleSelectedResource: (res: Resource) => void };
const ChooseResourceLink: React.FC<CreateLinkPopupProps & ChooseResourceLinkProps> = ({
  course,
  selectedType,
  selectedId,
  handleSelectedResource,
}) => {


  const { data } = useGetResources({ courseId: course.id });
  let resources = data.filter(x => {
    if (selectedType === "RESOURCE") return selectedId != x.id;
    return true;
  });

  const handleClick = (resource: Resource) => handleSelectedResource(resource);

  return (
    <div>
      {resources.map(res => (
        <ChooseResourceLinkPreview key={res.id} resource={res} onClick={() => handleClick(res)} />
      ))}
    </div>
  )
}

interface ChooseResourceLinkPreviewProps { resource?: Resource; onClick?: () => void; }
export const ChooseResourceLinkPreview: React.FC<ChooseResourceLinkPreviewProps> = ({ resource: r, onClick }) => {
  let resource = new Resource(r);
  let title = resource.name;
  let subtitle = <><b>{resource.getTypeLabel()}</b> • {resource.description}</>;

  if (resource.type == "VID") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"var(--background-color)"}
        onClick={onClick}
      />
    )
  }

  if (resource.type == "PDF") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"var(--background-color)"}
        onClick={onClick}
      />
    )
  }

  if (resource.type == "IMG") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"var(--background-color)"}
        onClick={onClick}
      />
    )
  }

  if (resource.type == "YT") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"var(--background-color)"}
        onClick={onClick}
      />
    )
  }

  if (resource.type == "URL") {
    return (
      <LinkView
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"var(--background-color)"}
        onClick={onClick}
      />
    )
  }

  return (
    <LinkView
      title={title}
      subtitle={subtitle}
      icon={resource.getIcon()}
      color={"var(--background-color)"}
      onClick={onClick}
    />
  )
}

export default ChooseResourceLink