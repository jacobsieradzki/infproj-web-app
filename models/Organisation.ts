
export class Organisation {

  id: string;
  name: string;
  image_url: string;

  constructor(json: any) {
    if (!json) return;
    this.id = json.id;
    this.name = json.name;
    this.image_url = json.image_url;
  }

}

export default Organisation;