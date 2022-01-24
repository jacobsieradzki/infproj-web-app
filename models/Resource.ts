import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { faFile, faFileAlt, faImage, faLink, faPlayCircle, faVideo } from '@fortawesome/free-solid-svg-icons'
import Course from 'models/Course'
import Event from 'models/Event'

export class Resource {

  public id: string;
  public course_id: string;
  public course?: Course;
  public name: string;
  public description: string;
  public type: "VID" | "YT" | "PDF" | "URL" | "IMG";
  public url: string;
  public status: "PROCESSING" | "READY" | "ERROR";
  public parent_events: Event[];

  constructor(json: any) {
    if (!json) return;
    this.id = json.id;
    this.course_id = json.course_id;
    this.course = json.course;
    this.name = json.name;
    this.description = json.description;
    this.type = json.type;
    this.url = json.url;
    this.status = json.status;
    this.parent_events = json.parent_events?.map(x => new Event(x)) || [];
  }

  public getTypeLabel(): string {
    switch (this.type) {
      case "VID": return "Video";
      case "YT": return "YouTube";
      case "PDF": return "PDF";
      case "URL": return "URL";
      case "IMG": return "Image";
      default: return "Resource";
    }
  }

  public getIcon(): IconDefinition {
    switch (this.type) {
      case "VID": return faVideo;
      case "YT": return faPlayCircle;
      case "PDF": return faFileAlt;
      case "URL": return faLink;
      case "IMG": return faImage;
      default: return faFile;
    }
  }

  public getStatusLabel(): string {
    switch (this.status) {
      case "READY": return "Ready";
      case "PROCESSING": return "Processing";
      case "ERROR": return "Error";
    }
  }

}

export default Resource;