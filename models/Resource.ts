
export class Resource {

  public id: string;
  public course_id: string;
  public name: string;
  public description: string;
  public type: "VID" | "YT" | "PDF" | "URL" | "IMG";
  public url: string;
  public status: "PROCESSING" | "READY" | "ERROR";

  constructor(json: any) {
    let o: Resource = json;
    return o;
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