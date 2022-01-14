
export class Organisation {

  id: string;
  name: string;
  image_url: string;

  constructor(json: any) {
    let o: Organisation = json;
    return o;
  }

}

export default Organisation;