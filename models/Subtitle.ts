
export class Subtitle {

  public id: string;
  public course_id: string;
  public resource_id: string;
  public content: string;
  public start_seconds: number;

  constructor(json: any) {
    let o: Subtitle = json;
    return o;
  }

}

export default Subtitle