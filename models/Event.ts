
export class Event {

  public id: string;
  public course_id: string;
  public primary_resource_id: number;
  public name: string;
  public description: string;
  public type: string;
  private start_date: string;
  private end_date: string;

  constructor(json: any) {
    let o: Event = json;
    return o;
  }

  public getStartDate(): Date {
    return new Date(this.start_date);
  }

  public getEndDate(): Date {
    return new Date(this.end_date);
  }

}

export default Event;