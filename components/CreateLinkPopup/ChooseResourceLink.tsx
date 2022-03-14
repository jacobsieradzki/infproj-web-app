import React from 'react'
import useGetResources from 'classroomapi/useGetResources'
import { CreateLinkPopupProps } from 'components/CreateLinkPopup/CreateLinkPopup'
import LinkView from 'components/Link/LinkView'
import Resource from 'models/Resource'

export type ChooseResourceFilter = "VIDEO" | "DOCS" | "WEB";
interface ChooseResourceLinkProps {
  filter: ChooseResourceFilter;
  handleSelectedResource: (res: Resource) => void;
}
const ChooseResourceLink: React.FC<CreateLinkPopupProps & ChooseResourceLinkProps> = ({
  course,
  selectedType,
  selectedId,
  filter = null,
  handleSelectedResource,
}) => {

  const { data } = useGetResources({ courseId: course.id });
  let resources = data.filter(x => {
    let isSame = false;
    if (selectedType === "RESOURCE") isSame = selectedId == x.id;
    switch (filter || "") {
      case "VIDEO": return ["VID", "YT"].includes(x.type) && !isSame;
      case "DOCS": return ["PDF"].includes(x.type) && !isSame;
      case "WEB": return ["URL", "YT"].includes(x.type) && !isSame;
      default: return true && !isSame;
    }
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
export const ChooseResourceLinkPreview: React.FC<ChooseResourceLinkPreviewProps> = ({ resource: r, onClick = null }) => {
  let resource = new Resource(r);
  let title = resource.name;
  let subtitle = <><b>{resource.getTypeLabel()}</b> • {resource.description}</>;

  if (resource.type == "VID") {
    return (
      <LinkView light
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
      <LinkView light
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
      <LinkView light
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
      <LinkView light
        title={title}
        subtitle={subtitle}
        icon={resource.getIcon()}
        color={"var(--background-color)"}
        onClick={onClick}
      />
    )
  }

  return (
    <LinkView light
      title={title}
      subtitle={subtitle}
      icon={resource.getIcon()}
      color={"var(--background-color)"}
      onClick={onClick}
    />
  )
}

export default ChooseResourceLink