import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'
import ChooseUrlLink from 'components/CreateLinkPopup/ChooseUrlLink'
import ChooseVideoLink from 'components/CreateLinkPopup/ChooseVideoLink'
import React, { useState } from 'react'
import { postNewVideoClipLink, postNewLink, postNewUrlLink } from 'classroomapi/postNewLink'
import ChoosePdfLink from 'components/CreateLinkPopup/ChoosePdfLink'
import ChooseResourceLink from 'components/CreateLinkPopup/ChooseResourceLink'
import useAuthContext from 'contexts/AuthContext'
import Clip from 'models/Clip'
import Resource from 'models/Resource'
import { CreateLinkPopupProps } from 'components/CreateLinkPopup/CreateLinkPopup'
import Button from 'components/Button/Button'
import { HorizontalStack, Spacer } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import CreateLinkStyle from 'components/CreateLinkPopup/CreateLink.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TABS = [
  { id: "VIDEO", label: "Videos" },
  { id: "DOCS", label: "Documents" },
  { id: "WEB", label: "Web links" },
]

export type HandleCreateVideoClipLinkProps = (
  content: string,
  description: string,
  start_location: number,
  end_location: number
) => void;

export type HandleCreateUrlLinkProps = (
  type: string,
  url: string,
  name: string,
  description: string,
) => void;

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

  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedVid, setSelectedVid] = useState(null);
  const [showWebLinkType, setShowWebLinkType] = useState(null);

  // --------------------------------------------------
  // API helpers
  // --------------------------------------------------

  const begin = () => {
    setLoading(true);
    setError(null);
  }

  const fail = (err = "Something went wrong creating this connection - please try again later.") => {
    setLoading(false);
    setError(err);
  }

  const respond = res => {
    if (res) {
      handleCreatedLink(res);
      closeModal();
    } else {
      fail();
    }
  }

  const createLinkProps = { subtitle_id: anchorSubtitleId, from_id: selectedId, from_type: selectedType };

  // --------------------------------------------------
  // POST requests
  // --------------------------------------------------

  const handleCreateLink = async (to_id: string, to_type: string) => {
    try {
      begin();
      let props = { ...createLinkProps, to_id, to_type };
      respond(await postNewLink(authState, course, props));
    } catch (e) { fail(e) }
  }
  const handleCreateVideoClipLink: HandleCreateVideoClipLinkProps = async (content, description, start_location, end_location) => {
    try {
      begin()
      let props = { ...createLinkProps, course_id: course.id, video_id: selectedVid.id.toString(), content, description, start_location, end_location, };
      respond(await postNewVideoClipLink(authState, props));
    } catch (e) { fail(e) }
  }
  const handleCreateUrlLink: HandleCreateUrlLinkProps = async (type, url, name, description) => {
    try {
      begin()
      let props = { ...createLinkProps, course_id: course.id, type, url, name, description };
      respond(await postNewUrlLink(authState, props));
    } catch (e) { fail(e) }
  }

  // --------------------------------------------------
  // Actions
  // --------------------------------------------------

  const handleSelectedResource = async (res: Resource, shouldExpand: boolean) => {
    if (shouldExpand && res.type === "PDF") {
      setSelectedPdf(new Resource(res));
    } else if (shouldExpand && res.type === "VID") {
      setSelectedVid(new Resource(res));
    } else {
      await handleCreateLink(res.id, "RESOURCE");
    }
  }

  const handleSelectedClip = async (clip: Clip) => {
    await handleCreateLink(clip.id, "CLIP");
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  const tabStyle = (tab: string) => filter == tab ? "inverse" : "primary";
  const handleFilter = (tab: string) => setFilter(filter == tab ? null : tab);

  if (selectedPdf || selectedVid || showWebLinkType) {
    return (
      <>
        {selectedPdf && <ChoosePdfLink {...props} {...{ loading, error }}
          pdf={selectedPdf}
          deselectPdf={() => setSelectedPdf(null)}
          handleSelectedClip={handleSelectedClip}
          handleSelectedResource={r => handleSelectedResource(r, false)} />}
        {selectedVid && <ChooseVideoLink {...props}
          vid={selectedVid}
          deselectVid={() => setSelectedVid(null)}
          handleSelectedClip={handleSelectedClip}
          handleSelectedResource={r => handleSelectedResource(r, false)}
          handleCreateVideoClip={handleCreateVideoClipLink} />}
        {showWebLinkType && <ChooseUrlLink {...props} loading={loading} error={error}
          type={showWebLinkType}
          deselect={() => setShowWebLinkType(null)}
          handleCreateUrlLink={handleCreateUrlLink} />}
      </>
    )
  }

  return (
    <CreateLinkStyle.Container>
      <HorizontalStack gap={16} style={{ padding: "0 20px 16px" }}>
        {TABS.map(item =>
          <Button key={item.id} onClick={e => handleFilter(item.id)} style={tabStyle(item.id)}>
            {item.label}
          </Button>
        )}
      </HorizontalStack>

      <div className={"scrollable"}>
        <ChooseResourceLink {...props}
          filter={filter}
          handleSelectedResource={r => handleSelectedResource(r, true)}
        />
      </div>

      {error && <span className={'error'}>{error}</span>}

      {!loading ? (
        <div className={'buttons'}>
          {filter ? (<>
            <Button onClick={e => setFilter(null)}>
              <FontAwesomeIcon icon={faFilter} />&nbsp;
              Clear
            </Button>
          </>) : (<>
            <Button onClick={e => setShowWebLinkType("URL")}>
              <FontAwesomeIcon icon={faPlus} />&nbsp;
              Web link
            </Button>
            <Button onClick={e => setShowWebLinkType("YT")}>
              <FontAwesomeIcon icon={faPlus} />&nbsp;
              YouTube
            </Button>
          </>)}
          <Spacer />
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