import React, { useState } from 'react'
import CreatePDFPopup from 'components/CreatePDF/CreatePDFPopup'
import Resource from 'models/Resource'
import {
  generateResourceRoute,
  generateRoute,
  NEW_ASSIGNMENT_ROUTE,
  NEW_LECTURE_ROUTE,
  NEW_RES_PDF_ROUTE, NEW_RES_ROUTE, NEW_RES_URL_ROUTE,
  NEW_RES_VIDEO_ROUTE, NEW_RES_YOUTUBE_ROUTE,
  NEW_WORKSHOP_ROUTE, RESOURCE_ROUTE
} from 'constants/navigation'
import { faCopy, faFileAlt, faGraduationCap, faImage, faLink, faPlayCircle, faVideo } from '@fortawesome/free-solid-svg-icons'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import Loader from 'components/Loader/Loader'
import useGetCourse from 'classroomapi/useGetCourse'
import useGetOrganisation from 'classroomapi/useGetOrganisation'
import NewMenu from 'components/NewMenu/NewMenu'
import { useRouter } from 'next/router'

interface NewMenuRootProps {
  menu: "EVENT" | "RESOURCE";
}

const NewMenuRoot: React.FC<NewMenuRootProps> = ({ menu }) => {

  const [pdfPopup, setPdfPopup] = useState(false);

  const router = useRouter();
  const organisationId = router.query.organisationId?.toString() || "";
  const courseId = router.query.courseId?.toString() || "";

  const { data: organisation, loading: organisationLoading } = useGetOrganisation({ organisationId });
  const { data: course, loading: courseLoading } = useGetCourse({ courseId });

  const handleCreatedPDF = (resource: Resource) => {
    router.replace(RESOURCE_ROUTE, generateResourceRoute(organisationId, courseId, resource.id));
  }

  if (organisationLoading || courseLoading) return (
    <ContentCenterInPage>
      <Loader />
    </ContentCenterInPage>
  )

  if (!organisation || !course) return (
    <ContentCenterInPage>
      <p>Error</p>
    </ContentCenterInPage>
  )

  if (menu === "EVENT") return (
    <NewMenu title={"Create new event"}
      organisation={organisation}
      course={course}
      items={[
        { label: "Lecture", url: generateRoute(NEW_LECTURE_ROUTE, organisationId, courseId), icon: faVideo },
        { label: "Workshop", url: generateRoute(NEW_WORKSHOP_ROUTE, organisationId, courseId), icon: faGraduationCap },
        { label: "Assignment", url: generateRoute(NEW_ASSIGNMENT_ROUTE, organisationId, courseId), icon: faFileAlt },
      ]}
    />
  )

  if (menu === "RESOURCE") return (
    <>
      <CreatePDFPopup
        isOpen={pdfPopup}
        closeModal={() => setPdfPopup(false)}
        courseId={courseId}
        handleCreatedResource={handleCreatedPDF} />
      <NewMenu title={"Create new resource"}
        organisation={organisation}
        course={course}
        items={[
          { label: "Video", url: generateRoute(NEW_RES_VIDEO_ROUTE, organisationId, courseId), icon: faVideo },
          { label: "PDF", onClick: () => setPdfPopup(true), icon: faCopy },
          { label: "URL", url: generateRoute(NEW_RES_URL_ROUTE, organisationId, courseId), icon: faLink },
          { label: "YouTube", url: generateRoute(NEW_RES_YOUTUBE_ROUTE, organisationId, courseId), icon: faPlayCircle },
          { label: "Image", url: generateRoute(NEW_RES_ROUTE, organisationId, courseId), icon: faImage },
        ]}
      />
    </>
  )

  return (
    <NewMenu title={"Create"}
      organisation={organisation}
      course={course}
      items={[]}
    />
  )
}

export default NewMenuRoot