import { PDF_DOCUMENT_HASH_ID_PREFIX, PDF_DOCUMENT_HASH_PAGE_ID_PREFIX } from 'helper/pdfDocument'
import Clip from 'models/Clip'

export const HOME_ROUTE = '/'
export const ALL_ORGANISATIONS_ROUTE = '/'
export const ORGANISATION_COURSES_ROUTE = '/organisation/[organisationId]'
export const COURSE_ROUTE = '/organisation/[organisationId]/course/[courseId]';
export const EVENT_ROUTE = '/organisation/[organisationId]/course/[courseId]/event/[eventId]';
export const RESOURCE_ROUTE = '/organisation/[organisationId]/course/[courseId]/resource/[resourceId]';

export const generateOrganisationRoute = (organisationId: string): string => {
  return ORGANISATION_COURSES_ROUTE
    .replace("[organisationId]", organisationId);
}

export const generateCourseRoute = (organisationId: string, courseId: string): string => {
  return COURSE_ROUTE
    .replace("[organisationId]", organisationId)
    .replace("[courseId]", courseId);;
}

export const generateEventRoute = (organisationId: string, courseId: string, eventId: string) => {
  return EVENT_ROUTE
    .replace('[organisationId]', organisationId)
    .replace('[courseId]', courseId)
    .replace('[eventId]', eventId);
}

export const generateResourceRoute = (organisationId: string, courseId: string, resourceId: string): string => {
  return RESOURCE_ROUTE
    .replace('[organisationId]', organisationId)
    .replace('[courseId]', courseId)
    .replace('[resourceId]', resourceId);
}

export const generateResourcePDFClipRoute = (clip: Clip, organisationId: string): string => {
  let basePath = generateResourceRoute(organisationId, clip.course_id, clip.resource?.id);
  if (clip.type == "PDF_CLIP" && !!clip.highlight) {
    let clipHash = "#" + PDF_DOCUMENT_HASH_ID_PREFIX + clip.highlight?.id?.toString();
    return basePath + clipHash;
  } else if (clip.type == "PDF_PAGE") {
    let clipHash = "#" + PDF_DOCUMENT_HASH_PAGE_ID_PREFIX + clip.start_location;
    return basePath + clipHash;
  } else {
    return basePath;
  }
}

export const generateResourceVideoClipRoute = (clip: Clip, organisationId: string): string => {
  let basePath = generateResourceRoute(organisationId, clip.course_id, clip.resource?.id);
  if (clip.type == "VIDEO_CLIP" && !!clip.highlight) {
    let clipHash = "?start=" + clip.start_location;
    if (clip.end_location > 0) clipHash += "&end=" + clip.end_location;
    return basePath + clipHash;
  } else {
    return basePath;
  }
}