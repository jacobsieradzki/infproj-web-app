import { useGetLinksForResource } from 'classroomapi/useGetLinks'
import CompletionView from 'components/Completion/CompletionView'
import ResourceHeader from 'components/Header/ResourceHeader'
import EventPreview from 'components/Link/EventPreview'
import LinkPreview from 'components/Link/LinkPreview'
import { StaffDiscussionMembershipAlert } from 'components/Membership/MembershipAlerts'
import { ResourceContainerProps, TabItem, TabType } from 'components/Resource/ResourceContainer'
import SubtitleList from 'components/Subtitles/SubtitleList'
import VideoReactions from 'components/Video/VideoReactions'
import useVideoContext from 'contexts/VideoContext'
import React, { useState } from 'react'
import { HorizontalStack } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import VideoComponent from 'components/Video/VideoComponent'

const VideoResourceContainer: React.FC<ResourceContainerProps> = ({
  organisation,
  course,
  event,
  resource
}) => {

  const [tab, setTab] = useState<TabType>("DISCUSSION");
  const { videoState, setPlayerFinished } = useVideoContext();
  const { isFinished } = videoState;

  const { data: links, refresh } = useGetLinksForResource({ id: resource.id , courseId: course.id });
  let nonSubtitleLinks = links.filter(x => !x.subtitle_id && x.source_link?.type != "VIDEO_CLIP");

  let shouldShowPrimaryEvents = !event && resource.parent_events.length > 0;

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceHeader {...{ organisation, course, event, resource }} />

        {isFinished ? (
          <CompletionView course={course} links={links} onCancel={() => setPlayerFinished(false)} />
        ) : (<>
          <VideoComponent resource={resource} />
          <VideoReactions />
        </>)}

        {shouldShowPrimaryEvents &&
          <ResourceStyles.Links>
            {resource.parent_events.map(event => (
              <div key={event.id}>
                <h3 className={"subheader"}>From {event.getTypeLabel()}:</h3>
                <EventPreview event={event} />
              </div>
            ))}
          </ResourceStyles.Links>
        }

        {nonSubtitleLinks.length > 0 &&
          <ResourceStyles.Links>
            <h2>Connections</h2>
            {nonSubtitleLinks.map(link => (
              <LinkPreview key={link.id} link={link} />
            ))}
          </ResourceStyles.Links>
        }

      </ResourceStyles.Content>

      {!isFinished && <ResourceStyles.Column>
        <HorizontalStack gap={16}>
          <TabItem tabId={'DISCUSSION'} {...{ tab, setTab }}>
            Discussion
          </TabItem>
          <TabItem tabId={'SUBTITLES'} {...{ tab, setTab }}>
            Subtitles
          </TabItem>
        </HorizontalStack>
        <ResourceStyles.ColumnContent className={'with-tabs border'}>
          {tab === 'DISCUSSION' && (
            <SubtitleList
              course={course}
              resource={resource}
              links={links}
              refreshLinks={refresh}
              isDiscussion={false}
            />
          )}
          {tab === 'SUBTITLES' && (
            <SubtitleList
              course={course}
              resource={resource}
              links={[]}
              refreshLinks={refresh}
            />
          )}
        </ResourceStyles.ColumnContent>
      </ResourceStyles.Column>}
    </ResourceStyles.Container>
  )
}

export default VideoResourceContainer