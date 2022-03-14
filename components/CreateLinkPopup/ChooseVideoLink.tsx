import { faExclamationTriangle, faFileVideo, faHighlighter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChooseClipPreview from 'components/CreateLinkPopup/ChooseClipPreview'
import { ChooseResourceLinkPreview } from 'components/CreateLinkPopup/ChooseResourceLink'
import { HandleCreateVideoClipLinkProps } from 'components/CreateLinkPopup/CreateLink'
import LinkView from 'components/Link/LinkView'
import VideoComponent from 'components/Video/VideoComponent'
import useVideoContext from 'contexts/VideoContext'
import { formatHHMMSS } from 'helper/time'
import React, { useState } from 'react'
import Button from 'components/Button/Button'
import { Spacer } from 'components/GlobalStyles'
import Clip from 'models/Clip'
import { CreateLinkPopupProps } from 'components/CreateLinkPopup/CreateLinkPopup'
import Resource from 'models/Resource'
import CreateLinkStyle from './CreateLink.style'
import useGetClips from 'classroomapi/useGetClips'

interface ChooseVideoLinkProps {
  vid: Resource;
  deselectVid: () => void;
  handleSelectedResource: (res: Resource) => void;
  handleSelectedClip: (clip: Clip) => void
  handleCreateVideoClip: HandleCreateVideoClipLinkProps;
};

const ChooseVideoLink: React.FC<CreateLinkPopupProps & ChooseVideoLinkProps> = ({
  vid,
  deselectVid,
  course,
  selectedType,
  selectedId,
  handleSelectedResource,
  handleSelectedClip,
  handleCreateVideoClip,
}) => {

  const { videoState } = useVideoContext();
  const { playerSeconds } = videoState;

  const { data } = useGetClips({ courseId: course.id, resourceId: vid.id })
  let resources = data.filter(x => {
    if (selectedType === "RESOURCE") return selectedId != x.id;
    return true;
  });
  let clips = resources.filter(x => x.type == "VIDEO_CLIP");

  const addMarker = (seconds: number) => {
    handleCreateVideoClip(undefined, undefined, seconds, seconds);
  }

  return (
    <CreateLinkStyle.Container>

      <ChooseResourceLinkPreview resource={new Resource(vid)} />

      <div className={"video-container"}>
        <VideoComponent resource={vid} />
      </div>

      {clips.length > 0 && <CreateLinkStyle.ChoosePdf.Pages>
        <h2>Clips</h2>
        {clips.map(res => (
          <ChooseClipPreview key={res.id}
            clip={new Clip(res)}
            resource={vid}
            onClick={() => handleSelectedClip(res)} />
        ))}
      </CreateLinkStyle.ChoosePdf.Pages>}

      <Spacer />

      <div className={"buttons"}>
        <Button onClick={deselectVid}>
          Cancel
        </Button>
        <Spacer />
        <Button onClick={() => addMarker(playerSeconds)}>
          Add at {formatHHMMSS(playerSeconds)}
        </Button>
        <Button onClick={() => handleSelectedResource(vid)}>
          Use this video
        </Button>
      </div>
    </CreateLinkStyle.Container>
  )
}

export default ChooseVideoLink