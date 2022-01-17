import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { faFileAlt, faGraduationCap, faVideo } from '@fortawesome/free-solid-svg-icons'
import Course from 'models/Course'
import Resource from 'models/Resource'

enum EventType {
  LECTURE = "Lecture",
  WORKSHOP = "Workshop",
  ASSIGNMENT = "Assignment",
}

export class Event {

  public id: string;
  public course_id: string;
  public course?: Course;
  public primary_resource_id: number;
  public primary_resource: Resource;
  public name: string;
  public description: string;
  public type: EventType;
  private readonly start_date: string;
  private readonly end_date: string;

  constructor(json: any) {
    this.id = json.id;
    this.course_id = json.course_id;
    this.course = json.course;
    this.primary_resource_id = json.primary_resource_id;
    this.primary_resource = json.primary_resource;
    this.name = json.name;
    this.description = json.description;
    this.type = EventType[json.type];
    this.start_date = json.start_date;
    this.end_date = json.end_date;
  }

  public getTypeLabel(): string {
    switch (this.type) {
      case EventType.LECTURE: return "Lecture";
      case EventType.WORKSHOP: return "Workshop";
      case EventType.ASSIGNMENT: return "Assignment";
      default: return this.type;
    }
  }

  public getIcon(): IconDefinition {
    switch (this.type) {
      case EventType.LECTURE: return faVideo;
      case EventType.WORKSHOP: return faGraduationCap;
      case EventType.ASSIGNMENT: return faFileAlt;
      default: return this.type;
    }
  }

  public getStartDate(): Date {
    return new Date(this.start_date);
  }

  public getEndDate(): Date {
    return new Date(this.end_date);
  }

}

export default Event;