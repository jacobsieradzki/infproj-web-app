import { useGetLinksForResource } from 'api/useGetLinks'
import { ResourceContainerProps, TabContent, TabItem, TabType } from 'components/Resource/ResourceContainer'
import SubtitleList from 'components/Subtitles/SubtitleList'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { HorizontalStack } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import VideoComponent from 'components/Video/VideoComponent'
import { generateCourseRoute, generateOrganisationRoute, HOME_ROUTE } from 'constants/navigation'

const VideoResourceContainer: React.FC<ResourceContainerProps> = ({
  organisation,
  course,
  event,
  resource
}) => {

  const [tab, setTab] = useState<TabType>("RESOURCES");
  const [currentTime, setCurrentTime] = useState(0);

  const { data: links } = useGetLinksForResource({ id: resource.id , courseId: course.id });

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceStyles.Header>
          <Breadcrumbs items={[
            { label: "Home", url: HOME_ROUTE },
            { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
            { label: course.name, url: generateCourseRoute(organisation.id, course.id) },
            { label: resource.getTypeLabel() },
          ]} />

          <h1>
            <FontAwesomeIcon icon={event.getIcon()} />&nbsp;&nbsp;
            {event.getTypeLabel()}: {event.name}
          </h1>
        </ResourceStyles.Header>

        <VideoComponent resource={resource} onCurrentTimeChange={setCurrentTime} />

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
            playerSeconds={currentTime}
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