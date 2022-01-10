import React from 'react'

export interface OrganisationModel {
  id: string;
  name: string;
  imageUrl: string;
}

export class Organisation implements OrganisationModel {

  id: string;
  name: string;
  imageUrl: string;

  constructor(json: any) {
    let o: Organisation = json;
    return o;
  }

}

export default Organisation;