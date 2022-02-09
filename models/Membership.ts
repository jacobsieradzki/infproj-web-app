
export class Membership {

  public id: string;
  public organisation_id: string;
  public course_id: string;
  public user_id: string;
  public role: "STAFF" | "STUDENT";
  created_at: string;
  updated_at: string;

  constructor(json: any) {
    if (!json) return;
    this.id = json.id;
    this.organisation_id = json.organisation_id;
    this.course_id = json.course_id;
    this.user_id = json.user_id;
    this.role = json.role;
    this.created_at = json.created_at;
    this.updated_at = json.updated_at;
  }

}

export default Membership;