import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import Alert from 'components/Alert/Alert'
import Button from 'components/Button/Button'
import useAuthContext from 'contexts/AuthContext'
import useMembership from 'helper/useMembership'
import Course from 'models/Course'
import Organisation from 'models/Organisation'
import React from 'react'

type MembershipAlertProps<T> = (props: {
  value: T
}) => React.ReactElement;

export const StaffOrganisationMembershipAlert: MembershipAlertProps<Organisation> = ({ value }) => {
  const { authState } = useAuthContext();
  const { memberships } = authState;
  const membership = useMembership(memberships);
  return membership.hasStaffPermissionForOrganisation(value) ? (
    <Alert title={"You have staff permission."} icon={faClipboard} className={"permissions"}>
      <p className={"subtitle"}>You have permission to add and edit courses in this organisation.</p>
    </Alert>
  ) : <></>;
}

export const StaffCourseMembershipAlert: MembershipAlertProps<Course> = ({ value }) => {
  const { authState } = useAuthContext();
  const { memberships } = authState;
  const membership = useMembership(memberships);
  return membership.hasStaffPermissionForCourse(value) ? (
    <Alert title={"You have staff permission to edit this course."} icon={faClipboard} className={"permissions"}>
      <p className={"subtitle"}>You have permission to add events, resources and links, and manage discussion within this course.</p>
    </Alert>
  ) : <></>;
}

export const StaffDiscussionMembershipAlert: MembershipAlertProps<Course> = ({ value }) => {
  const { authState } = useAuthContext();
  const { memberships } = authState;
  const membership = useMembership(memberships);
  return membership.hasStaffPermissionForCourse(value) ? (
    <Alert title={"You have staff permission to edit this course."} icon={faGraduationCap} className={"permissions"}>
      <p className={"subtitle"}>You have permission to promote student’s links and comments, so that they appear with your links in the “Resources” tab.</p>
    </Alert>
  ) : <></>;
}

export const StudentCourseEnrollmentAlert: MembershipAlertProps<Course> = ({ value }) => {
  const { authState } = useAuthContext();
  const { memberships } = authState;
  const membership = useMembership(memberships);
  return membership.hasStudentMembershipToCourse(value) ? (
    <Alert title={"You are enrolled in this course."} icon={faGraduationCap} className={"permissions"}>
      <p className={"subtitle"}>You can comment in discussions and events will display in your feed.</p>
    </Alert>
  ) : <></>;
}

export const StudentCourseNewEnrollmentAlert: MembershipAlertProps<Course> = ({ value }) => {
  const { authState } = useAuthContext();
  const { memberships } = authState;
  const membership = useMembership(memberships);
  let student = membership.hasStudentMembershipToCourse(value);
  let staff = membership.hasStaffPermissionForCourse(value);
  return (!student && !staff) ? (
    <Alert title={"You are enrolled in this course."} icon={faGraduationCap} className={"permissions"}>
      <p className={"subtitle"}>You can comment in discussions and events will display in your feed.</p>
      <Button>
        Enroll in this course
      </Button>
    </Alert>
  ) : <></>;
}

export const StudentCourseNewEnrollmentLoginAlert = () => {
  const { isLoggedIn } = useAuthContext();
  return (!isLoggedIn) ? (
    <Alert title={"Login to enroll in this class."} icon={faGraduationCap} className={"permissions"}>
      <p className={"subtitle"}>You can contribute to discussions and leave feedback to others.</p>
    </Alert>
  ) : <></>;
}

export const StudentDiscussionMembershipAlert: MembershipAlertProps<Course> = ({ value }) => {
  const { authState } = useAuthContext();
  const { memberships } = authState;
  const membership = useMembership(memberships);
  return membership.hasStudentMembershipToCourse(value) ? (
    <Alert title={"You are enrolled in this course."} icon={faGraduationCap} className={"permissions"}>
      <p className={"subtitle"}>You can add links to other resources and reactions.</p>
    </Alert>
  ) : <></>;
}