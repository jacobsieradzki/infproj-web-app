import ChooseClipPreview from 'components/CreateLinkPopup/ChooseClipPreview'
import React from 'react'
import { ChooseResourceLinkPreview } from 'components/CreateLinkPopup/ChooseResourceLink'
import Button from 'components/Button/Button'
import { Spacer } from 'components/GlobalStyles'
import Clip from 'models/Clip'
import { CreateLinkPopupProps } from 'components/CreateLinkPopup/CreateLinkPopup'
import Resource from 'models/Resource'
import CreateLinkStyle from './CreateLink.style'
import useGetClips from 'classroomapi/useGetClips'

interface ChoosePdfLinkProps {
  loading: boolean;
  error: any;
  pdf: Resource;
  deselectPdf: () => void;
  handleSelectedResource: (res: Resource) => void;
  handleSelectedClip: (clip: Clip) => void
};

const ChoosePdfLink: React.FC<CreateLinkPopupProps & ChoosePdfLinkProps> = ({
  loading,
  error,
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
      <div className={"scrollable"}>
        <ChooseResourceLinkPreview resource={new Resource(pdf)} />

        {pages.length > 0 && <CreateLinkStyle.ChoosePdf.Pages>
          <h2>Pages</h2>
          <CreateLinkStyle.ChoosePdf.PageGrid>
            {pages.map(res => (
              <CreateLinkStyle.ChoosePdf.Page key={res.id} onClick={() => handleSelectedClip(res)}>
                <p>Page {res.start_location}</p>
                <p>{res.description}</p>
                <img src={res.content} alt={res.description} />
              </CreateLinkStyle.ChoosePdf.Page>
            ))}
          </CreateLinkStyle.ChoosePdf.PageGrid>
        </CreateLinkStyle.ChoosePdf.Pages>}

        {clips.length > 0 && <>
          <CreateLinkStyle.Header>
            <h2>Clips</h2>
          </CreateLinkStyle.Header>
          {clips.map(res => (
            <ChooseClipPreview key={res.id}
              clip={new Clip(res)}
              resource={pdf}
              onClick={() => handleSelectedClip(res)} />
          ))}
        </>}
      </div>
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

export default ChoosePdfLink