import React, { useState } from 'react'
import { postNewLink, PostNewLinkProps } from 'classroomapi/postNewLink'
import ChoosePdfLink from 'components/CreateLinkPopup/ChoosePdfLink'
import ChooseResourceLink from 'components/CreateLinkPopup/ChooseResourceLink'
import useAuthContext from 'contexts/AuthContext'
import Clip from 'models/Clip'
import Resource from 'models/Resource'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import { CreateLinkPopupProps } from 'components/CreateLinkPopup/CreateLinkPopup'
import Button from 'components/Button/Button'
import { Spacer } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import CreateLinkStyle from 'components/CreateLinkPopup/CreateLink.style'

const CreateLink: React.FC<CreateLinkPopupProps> = props => {
  const { authState } = useAuthContext();
  const {
    closeModal,
    course,
    selectedId,
    selectedType,
    anchorSubtitleId,
    handleCreatedLink
  } = props;

  const [tab, setTab] = useState("resources");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedVid, setSelectedVid] = useState(null);

  const handleCreate = async (to_id: string, to_type: string) => {
    setLoading(true);
    setError(null);
    try {
      let props = { subtitle_id: anchorSubtitleId, from_id: selectedId, from_type: selectedType, to_id, to_type };
      let response = await postNewLink(authState, course, props);
      if (response) {
        handleCreatedLink(response);
        console.log('NEW LINK!', response);
        closeModal();
      } else {
        setLoading(false);
        setError("Something went wrong creating this connection - please try again later.");
      }
    } catch (e) {
      setError(e.toString());
      setLoading(false);
    }
  }

  const handleSelectedResource = async (res: Resource, shouldExpand: boolean) => {
    if (shouldExpand && res.type === "PDF") {
      setSelectedPdf(new Resource(res));
    } else if (shouldExpand && res.type === "VID") {
      // setSelectedVid(new Resource(res));
      await handleCreate(res.id, "RESOURCE");
    } else {
      await handleCreate(res.id, "RESOURCE");
    }
  }

  const handleSelectedClip = async (clip: Clip) => {
    await handleCreate(clip.id, "CLIP");
  }

  if (selectedPdf) return <ChoosePdfLink {...props}
    pdf={selectedPdf}
    deselectPdf={() => setSelectedPdf(null)}
    handleSelectedClip={handleSelectedClip}
    handleSelectedResource={r => handleSelectedResource(r, false)} />

  console.log();

  return (
    <CreateLinkStyle.Container>
      {/*<HorizontalStack gap={16}>*/}
      {/*  <Button style={tab === "resources" ? "primary" : "primary"} onClick={() => setTab("resources")}>*/}
      {/*    Resources*/}
      {/*  </Button>*/}
      {/*  <Button style={"primary"} onClick={() => setTab("clips")}>*/}
      {/*    Clips*/}
      {/*  </Button>*/}
      {/*  <Button style={"primary"} onClick={() => setTab("events")}>*/}
      {/*    Events*/}
      {/*  </Button>*/}
      {/*</HorizontalStack>*/}

      <ResourceStyles.TabWrapper tab={tab}>
        <div className={"resources"}>
          <ChooseResourceLink handleSelectedResource={r => handleSelectedResource(r, true)} {...props} />
        </div>
        {/*<div className={"clips"}>*/}
        {/*  <ClipsList organisation={organisation} course={course} />*/}
        {/*</div>*/}
        {/*<div className={"links"}>*/}
        {/*  <ResourceList organisation={organisation} course={course} />*/}
        {/*</div>*/}
      </ResourceStyles.TabWrapper>

      {error && <span className={'error'}>{error}</span>}

      <Spacer />

      {!loading ? (
        <div className={'buttons'}>
          <Button onClick={closeModal} style={"inverse-neutral"}>
            Close
          </Button>
        </div>
      ) : (
        <div className={'buttons'}>
          <Spacer /><Loader size={24} color={"var(--background-color)"} /><Spacer />
        </div>
      )}
    </CreateLinkStyle.Container>
  )
}

export default CreateLink