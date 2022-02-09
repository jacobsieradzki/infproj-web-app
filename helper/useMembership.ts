import Course from 'models/Course'
import Membership from 'models/Membership'
import Organisation from 'models/Organisation'

export type UseMembershipCallbackProps = {
  memberships: Membership[];
  hasStaffPermissionForOrganisation: (organisation: Organisation) => boolean;
  hasStaffPermissionForCourse: (course: Course) => boolean;
  hasStudentMembershipToCourse: (course: Course) => boolean;
}

const useMembership = (memberships: Membership[]): UseMembershipCallbackProps => {


  const _isSameOrganisationAsCourse = (c: Course, m: Membership): boolean =>
    m.organisation_id == c.organisation_id || m.organisation_id == c.organisation?.id;


  const hasStaffPermissionForOrganisation = (organisation: Organisation): boolean => {
    return memberships.some(x => {
      return x.organisation_id == organisation.id
        && x.course_id == null
        && x.role === "STAFF";
    });
  }

  const hasStaffPermissionForCourse = (course: Course): boolean => {
    return memberships.some(x => {
      return _isSameOrganisationAsCourse(course, x)
        && x.course_id == course.id
        && x.role === "STAFF";
    });
  }

  const hasStudentMembershipToCourse = (course: Course): boolean => {
    return memberships.some(x => {
      return _isSameOrganisationAsCourse(course, x)
        && x.course_id == course.id
        && x.role === "STUDENT";
    });
  }

  return {
    memberships,
    hasStaffPermissionForOrganisation,
    hasStaffPermissionForCourse,
    hasStudentMembershipToCourse
  }
}

export default useMembership