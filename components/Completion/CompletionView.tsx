import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/Button/Button'
import LinkPreview from 'components/Link/LinkPreview'
import { generateCourseRoute } from 'constants/navigation'
import Course from 'models/Course'
import Link from 'models/Link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CompletionViewStyle from 'components/Completion/CompletionView.style'
import Slider from 'react-slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PROGRESS_VALUE = 65;

interface CompletionViewProps {
  course: Course;
  links: Link[];
  onCancel: () => void;
}

const CompletionView: React.FC<CompletionViewProps> = ({ course, links, onCancel }) => {

  const router = useRouter();

  const navigateToCourse = () => {
    router.push(generateCourseRoute(course.organisation_id, course.id));
  }

  return (
    <CompletionViewStyle.Container>
      <p className={"message"}>
        Well done!
      </p>
      <p>{"Let's see how you are doing compared with your class."}</p>

      <CompletionViewStyle.Slider>
        <Slider
          type="range"
          min={0}
          max={100}
          value={PROGRESS_VALUE}
          onChange={console.log}
          className="slider"
          disabled
          renderThumb={(props, state) => (
            <div {...props}>
              <FontAwesomeIcon icon={faGraduationCap} color={"white"} size={"lg"} />
            </div>
          )}
        />
      </CompletionViewStyle.Slider>

      <p className={"message"}>
        {"If you're finished, have a go at adding a new resource?"}
      </p>
      {/*<p>{"Adding connections can deepen understanding of the content, and help your class community."}</p>*/}
      {/*<p>{"Try to find a resource that can help to support a topic in this lecture."}</p>*/}
      {/*<p>{"This can deepen your understanding and help your class community."}</p>*/}
      <p>{"This is optional to do, but it will help your class to collaborate in discussion."}</p>

      <CompletionViewStyle.Actions>
        <Button variant={"filled"} style={"secondary"} onClick={onCancel}>
          Go back
        </Button>
        <Button variant={"filled"} onClick={navigateToCourse}>
          Next lecture
        </Button>
      </CompletionViewStyle.Actions>

      <CompletionViewStyle.Links>
        {links.map(link => (
          <LinkPreview key={link.id} link={link} />
        ))}
      </CompletionViewStyle.Links>
    </CompletionViewStyle.Container>
  )
}

export default CompletionView