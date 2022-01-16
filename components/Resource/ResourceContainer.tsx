import SubtitleList from 'components/Subtitles/SubtitleList'
import React, { useState } from 'react'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { Spacer } from 'components/GlobalStyles'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import VideoComponent from 'components/Video/VideoComponent'
import { COURSE_ROUTE, ORGANISATION_COURSES_ROUTE } from 'constants/navigation'
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

const ResourceContainer: React.FC<ResourceContainerProps> = ({
  organisation,
  course,
  event,
  resource
}) => {

  const [currentTime, setCurrentTime] = useState(0);

  let organisationUrl = ORGANISATION_COURSES_ROUTE.replace("[organisationId]", organisation.id);
  let courseUrl = COURSE_ROUTE
    .replace("[organisationId]", organisation.id)
    .replace("[courseId]", course.id);

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceStyles.Header>
          <Breadcrumbs items={[
            { label: organisation.name, url: organisationUrl },
            { label: course.name, url: courseUrl },
            { label: "Video" },
          ]} />

          <h1>
            <FontAwesomeIcon icon={faVideo} />&nbsp;
            Lecture: {event.name}
          </h1>
        </ResourceStyles.Header>

        {resource.url && resource.type == "VID" &&
          <VideoComponent resource={resource} onCurrentTimeChange={setCurrentTime} />
        }

        <div style={{ backgroundColor: "white" }}>
          <pre>{JSON.stringify(organisation, null, 2)}</pre>
          <pre>{JSON.stringify(course, null, 2)}</pre>
          <pre>{JSON.stringify(event, null, 2)}</pre>
          <pre>{JSON.stringify(resource, null, 2)}</pre>
        </div>
      </ResourceStyles.Content>
      <ResourceStyles.Column>
        <SubtitleList course={course} resource={resource} playerSeconds={currentTime} />
      </ResourceStyles.Column>
    </ResourceStyles.Container>
  )
}

export default ResourceContainer