import { useGetLinksForResource } from 'api/useGetLinks'
import SubtitleList from 'components/Subtitles/SubtitleList'
import React, { useState } from 'react'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { HorizontalStack, Spacer } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import VideoComponent from 'components/Video/VideoComponent'
import { COURSE_ROUTE, HOME_ROUTE, ORGANISATION_COURSES_ROUTE } from 'constants/navigation'
import Course from 'models/Course'
import Event from 'models/Event'
import Organisation from 'models/Organisation'
import Resource from 'models/Resource'

type ResourceContainerProps = {
  organisation?: Organisation;
  course?: Course;
  event?: Event;
  resource?: Resource;
}

type TabType = "RESOURCES" | "DISCUSSION";
const TabItem = ({ tabId, tab, setTab, children }) => (
  <ResourceStyles.ColumnTab
    id={tab.toLowerCase() + "_key"}
    className={tab == tabId ? "selected" : ""}
    onClick={() => setTab(tabId)}
  >{children}</ResourceStyles.ColumnTab>
)

const TabContent = ({ tabId, tab, children }) => (
  <ResourceStyles.ColumnContent
    className={tab == tabId ? "" : "hidden"}
  >{children}</ResourceStyles.ColumnContent>
)

const ResourceContainer: React.FC<ResourceContainerProps> = ({
  organisation,
  course,
  event,
  resource
}) => {

  const [tab, setTab] = useState<TabType>("RESOURCES");

  const [currentTime, setCurrentTime] = useState(0);

  const { data: links, loading, error } = useGetLinksForResource({ id: resource.id , courseId: course.id });

  let organisationUrl = ORGANISATION_COURSES_ROUTE.replace("[organisationId]", organisation.id);
  let courseUrl = COURSE_ROUTE.replace("[organisationId]", organisation.id).replace("[courseId]", course.id);

  let isLectureVideo = resource.url && resource.type == "VID";


  console.log(resource)
  console.log(resource.getTypeLabel)
  console.log(resource.getTypeLabel())
  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceStyles.Header>
          <Breadcrumbs items={[
            { label: "Home", url: HOME_ROUTE },
            { label: organisation.name, url: organisationUrl },
            { label: course.name, url: courseUrl },
            { label: resource.getTypeLabel() },
          ]} />

          <h1>
            <FontAwesomeIcon icon={event.getIcon()} />&nbsp;&nbsp;
            {event.getTypeLabel()}: {event.name}
          </h1>
        </ResourceStyles.Header>

        {isLectureVideo && <VideoComponent resource={resource} onCurrentTimeChange={setCurrentTime} />}

        <div style={{ backgroundColor: "white" }}>
          <pre>{JSON.stringify(organisation, null, 2)}</pre>
          <pre>{JSON.stringify(course, null, 2)}</pre>
          <pre>{JSON.stringify(event, null, 2)}</pre>
          <pre>{JSON.stringify(resource, null, 2)}</pre>
        </div>
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
          {isLectureVideo && <SubtitleList
            course={course}
            resource={resource}
            links={links}
            playerSeconds={currentTime}
          />}
        </TabContent>
        <TabContent tabId={"DISCUSSION"} tab={tab}>
          {/*<SubtitleList course={course} resource={resource} playerSeconds={currentTime} autoPlay={autoPlay} />*/}
        </TabContent>
      </ResourceStyles.Column>
    </ResourceStyles.Container>
  )
}

export default ResourceContainer