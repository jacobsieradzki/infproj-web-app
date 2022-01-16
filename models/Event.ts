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
  private start_date: string;
  private end_date: string;

  constructor(json: any) {
    let o: Event = json;
    return o;
  }

  public getTypeLabel(): string {
    switch (this.type) {
      case EventType.LECTURE: return "Lecture";
      case EventType.WORKSHOP: return "Workshop";
      case EventType.ASSIGNMENT: return "Assignment";
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