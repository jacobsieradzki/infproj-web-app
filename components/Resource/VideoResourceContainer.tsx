import useGetClips from 'api/useGetClips'
import { useGetLinksForResource } from 'api/useGetLinks'
import ResourceHeader from 'components/Header/ResourceHeader'
import EventPreview from 'components/Link/EventPreview'
import LinkPreview from 'components/Link/LinkPreview'
import { ResourceContainerProps, TabContent, TabItem, TabType } from 'components/Resource/ResourceContainer'
import SubtitleList from 'components/Subtitles/SubtitleList'
import useVideoContext from 'contexts/VideoContext'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { HorizontalStack } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import VideoComponent from 'components/Video/VideoComponent'

const VideoResourceContainer: React.FC<ResourceContainerProps> = ({
  organisation,
  course,
  event,
  resource
}) => {

  const [tab, setTab] = useState<TabType>("RESOURCES");

  const { data: links } = useGetLinksForResource({ id: resource.id , courseId: course.id });
  let nonSubtitleLinks = links.filter(x => !x.subtitle_id && x.source_link?.type != "VIDEO_CLIP");

  console.log(resource);

  let shouldShowPrimaryEvents = !event && resource.parent_events.length > 0;

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceHeader {...{ organisation, course, event, resource }} />

        {shouldShowPrimaryEvents &&
          <ResourceStyles.Links>
            {resource.parent_events.map(event => (
              <div>
                <h3 className={"subheader"}>From {event.getTypeLabel()}:</h3>
                <EventPreview event={event} />
              </div>
            ))}
          </ResourceStyles.Links>
        }

        <VideoComponent resource={resource} />

        {nonSubtitleLinks.length > 0 &&
          <ResourceStyles.Links>
            <h2>Connections</h2>
            {nonSubtitleLinks.map((link, index) => (
              <LinkPreview key={index} link={link} />
            ))}
          </ResourceStyles.Links>
        }

      </ResourceStyles.Content>

      <ResourceStyles.Column>
        <HorizontalStack gap={16}>
          <TabItem tabId={"RESOURCES"} {...{ tab, setTab }}>
            Resources
          </TabItem>
          <TabItem tabId={"DISCUSSION"} {...{ tab, setTab }}>
            Discussion
          </TabItem>
        </HorizontalStack>
        <TabContent tabId={"RESOURCES"} tab={tab}>
          <SubtitleList
            course={course}
            resource={resource}
            links={links}
          />
        </TabContent>
        {/*<TabContent tabId={"DISCUSSION"} tab={tab}>*/}
          {/*<SubtitleList course={course} resource={resource} playerSeconds={currentTime} autoPlay={autoPlay} />*/}
        {/*</TabContent>*/}
      </ResourceStyles.Column>
    </ResourceStyles.Container>
  )
}

export default VideoResourceContainer