import Organisation from 'models/Organisation'

export class Course {

  public id: string;
  public organisation_id: string;
  public organisation: Organisation;
  public name: string;
  private start_date: string;
  private end_date: string;

  constructor(json: any) {
    let o: Course = json;
    return o;
  }

  public getStartDate(): Date {
    return new Date(this.start_date);
  }

  public getEndDate(): Date {
    return new Date(this.end_date);
  }

}

export default Course;