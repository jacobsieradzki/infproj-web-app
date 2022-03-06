import { faExclamationTriangle, faFileVideo, faHighlighter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChooseResourceLinkPreview } from 'components/CreateLinkPopup/ChooseResourceLink'
import LinkView from 'components/Link/LinkView'
import React, { useState } from 'react'
import Button from 'components/Button/Button'
import { Spacer } from 'components/GlobalStyles'
import Clip from 'models/Clip'
import { CreateLinkPopupProps } from 'components/CreateLinkPopup/CreateLinkPopup'
import Resource from 'models/Resource'
import CreateLinkStyle from './CreateLink.style'
import useGetClips from 'classroomapi/useGetClips'

interface ChoosePdfLinkProps {
  pdf: Resource;
  deselectPdf: () => void;
  handleSelectedResource: (res: Resource) => void;
  handleSelectedClip: (clip: Clip) => void
};

const ChoosePdfLink: React.FC<CreateLinkPopupProps & ChoosePdfLinkProps> = ({
  pdf,
  deselectPdf,
  course,
  selectedType,
  selectedId,
  handleSelectedResource,
  handleSelectedClip,
}) => {

  const { data } = useGetClips({ courseId: course.id, resourceId: pdf.id })
  let resources = data.filter(x => {
    if (selectedType === "RESOURCE") return selectedId != x.id;
    return true;
  });

  let pages = resources.filter(x => x.type == "PDF_PAGE");
  let clips = resources.filter(x => x.type != "PDF_PAGE");

  return (
    <CreateLinkStyle.Container>

      <ChooseResourceLinkPreview resource={new Resource(pdf)} />

      {pages.length > 0 && <CreateLinkStyle.ChoosePdf.Pages>
        <h2>Pages</h2>
        <CreateLinkStyle.ChoosePdf.PageGrid>
          {pages.map(res => (
            <CreateLinkStyle.ChoosePdf.Page onClick={() => handleSelectedClip(res)}>
              <p>Page {res.start_location}</p>
              <p>{res.description}</p>
              <img src={res.content} alt={res.description} />
            </CreateLinkStyle.ChoosePdf.Page>
          ))}
        </CreateLinkStyle.ChoosePdf.PageGrid>
      </CreateLinkStyle.ChoosePdf.Pages>}

      {clips.length > 0 && <CreateLinkStyle.ChoosePdf.Pages>
        <h2>Clips</h2>
        {clips.map(res => (
          <ChoosePdfClipPreview clip={new Clip(res)} resource={pdf} onClick={() => handleSelectedClip(res)} />
        ))}
      </CreateLinkStyle.ChoosePdf.Pages>}

      <Spacer />

      <div className={"buttons"}>
        <Button onClick={deselectPdf}>
          Cancel
        </Button>
        <Spacer />
        <Button onClick={() => handleSelectedResource(pdf)}>
          Use this PDF
        </Button>
      </div>
    </CreateLinkStyle.Container>
  )
}

interface ChoosePdfClipPreviewProps { clip: Clip; resource: Resource; onClick: () => void; };
const ChoosePdfClipPreview: React.FC<ChoosePdfClipPreviewProps> = ({ clip, resource, onClick }) => {
  if (clip.type == "PDF_CLIP" && resource) {
    return (
      <LinkView
        title={clip.description}
        subtitle={clip.isImage() ? null : clip.content}
        image={clip.isImage() ? clip.content : null}
        caption={<><FontAwesomeIcon icon={resource.getIcon()} />&nbsp;&nbsp;{resource.name}</>}
        icon={faHighlighter}
        color={"var(--primary-color)"}
        onClick={onClick}
      />
    )
  }

  if (clip.type == "PDF_PAGE" && resource) {
    let title = "Page " + clip.start_location.toString();
    if (clip.description)  title += ": " + clip.description;
    return (
      <LinkView
        title={title}
        subtitle={clip.isImage() ? null : clip.content}
        image={clip.isImage() ? clip.content : null}
        caption={<><FontAwesomeIcon icon={resource.getIcon()} />&nbsp;&nbsp;{resource.name}</>}
        color={"var(--primary-color)"}
        onClick={onClick}
      />
    )
  }

  if (clip.type == "VIDEO_CLIP" && resource) {
    let timeDifference = clip.end_location - clip.start_location;
    return (
      <LinkView
        title={resource.name}
        subtitle={resource.description}
        caption={`${timeDifference} second clip`}
        icon={faFileVideo}
        color={"var(--primary-color)"}
        onClick={onClick}
      />
    )
  }

  return (
    <LinkView
      title={clip.description}
      subtitle={clip.type}
      icon={faExclamationTriangle}
      color={"orange"}
      onClick={onClick}
    />
  )
}

export default ChoosePdfLink