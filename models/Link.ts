import Resource from 'models/Resource'
import Event from 'models/Event'

export class Link {

  public id: string;
  public course_id: string;
  public subtitle_id: string;
  public link_type: "RESOURCE" | "EVENT";
  public link_id: number;
  public link_other_count: number;
  public link: Resource | Event;

  constructor(json: any) {
    let o: Link = json;
    return o;
  }

}

export default Link;