import Clip from 'models/Clip'
import Resource from 'models/Resource'
import Event from 'models/Event'

export class Link {

  public id: string;
  public course_id: string;
  public subtitle_id: string;
  public link_type: "RESOURCE" | "EVENT" | "CLIP";
  public link_id: number;
  public link_other_count: number;
  public source_link: Resource | Event | Clip;
  public source_id: number;
  public link: Resource | Event | Clip;

  constructor(json: any) {
    if (!json) return null;
    this.id = json.id;
    this.course_id = json.course_id;
    this.subtitle_id = json.subtitle_id;
    this.link_type = json.link_type;
    this.link_id = json.link_id;
    this.link_other_count = json.link_other_count;
    this.source_id = json.source_id;
    this.link = json.link;
  }

}

export default Link;