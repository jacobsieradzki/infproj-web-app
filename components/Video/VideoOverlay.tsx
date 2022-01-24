import { faRedoAlt, faUndoAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { VerticalStack } from 'components/GlobalStyles'
import { JUMP_INTERVAL } from 'components/Video/VideoComponent'
import VideoStyles from 'components/Video/VideoComponent.style'
import React, { useEffect } from 'react'

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
    case "JUMP_FORWARD": return "Forward " + JUMP_INTERVAL + " seconds";
    default: return "";
  }
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ state }) => {
  return (
    <VideoStyles.VideoOverlay className={state ? "visible" : ""}>
      <VerticalStack gap={8} align={"center"}>
        {state && <FontAwesomeIcon icon={iconForState(state)} color={'white'} size={'4x'} />}
        {state && <p>{labelForState(state)}</p>}
      </VerticalStack>
    </VideoStyles.VideoOverlay>
  )
}

export default VideoOverlay