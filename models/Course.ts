import Organisation from 'models/Organisation'

export class Course {

  public id: string;
  public organisation_id: string;
  public organisation: Organisation;
  public name: string;
  private readonly start_date: string;
  private readonly end_date: string;

  constructor(json: any) {
    this.id = json.id;
    this.organisation_id = json.organisation_id;
    this.organisation = json.organisation;
    this.name = json.name;
    this.start_date = json.start_date;
    this.end_date = json.end_date;
  }

  public getStartDate(): Date {
    return new Date(this.start_date);
  }

  public getEndDate(): Date {
    return new Date(this.end_date);
  }

}

export default Course;