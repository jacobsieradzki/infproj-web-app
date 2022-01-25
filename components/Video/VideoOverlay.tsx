import { faRedoAlt, faUndoAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { VerticalStack } from 'components/GlobalStyles'
import { JUMP_INTERVAL } from 'components/Video/VideoComponent'
import VideoStyles from 'components/Video/VideoComponent.style'
import React, { useEffect, useState } from 'react'

export const VIDEO_OVERLAY_ANIMATION_TIME_MS = 0.3;

export type VideoOverlayType = "JUMP_BACK" | "JUMP_FORWARD";

type VideoOverlayProps = {
  state: VideoOverlayType;
}

const iconForState = (state: VideoOverlayType): IconDefinition => {
  switch (state) {
    case "JUMP_BACK": return faUndoAlt;
    case "JUMP_FORWARD": return faRedoAlt;
    default: return null;
  }
}

const labelForState = (state: VideoOverlayType): string => {
  switch (state) {
    case "JUMP_BACK": return "Rewind " + JUMP_INTERVAL + " seconds";
    case "JUMP_FORWARD": return "Jump " + JUMP_INTERVAL + " seconds";
    default: return "";
  }
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ state: _state }) => {

  const [state, setState] = useState(_state);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!!_state && visible) return;
    if (!_state && !visible) return;
    if (!!_state && !visible) {
      setState(_state);
      setTimeout(() => setVisible(true), 10);
    }
    if (!_state && visible) {
      setVisible(false);
      setTimeout(() => setState(null), 10);
    }
  }, [_state]);

  return (
    <VideoStyles.VideoOverlay className={visible ? "visible" : ""}>
      <VerticalStack gap={20} align={"center"}>
        {state && <FontAwesomeIcon icon={iconForState(state)} color={'white'} size={'4x'} />}
        {state && <p>{labelForState(state)}</p>}
      </VerticalStack>
    </VideoStyles.VideoOverlay>
  )
}

export default VideoOverlay