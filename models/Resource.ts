
export class Resource {

  public id: string;
  public course_id: string;
  public name: string;
  public description: string;
  public type: "VID" | "YT" | "PDF" | "URL" | "IMG";
  public url: string;
  public status: "PROCESSING" | "READY" | "ERROR";

  constructor(json: any) {
    this.id = json.id;
    this.course_id = json.course_id;
    this.name = json.name;
    this.description = json.description;
    this.type = json.type;
    this.url = json.url;
    this.status = json.status;
  }

  public getTypeLabel(): string {
    switch (this.type) {
      case "VID": return "Video";
      case "YT": return "YouTube";
      case "PDF": return "PDF";
      case "URL": return "URL";
      case "IMG": return "Image";
      default: return "Resource"
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