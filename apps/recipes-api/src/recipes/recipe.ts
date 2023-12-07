export interface Recipe {
  "id": string;
  "name": string;
  "description": string;
  "pictureUrl": string;
  "steps": Array<string>;
  "ingredients": Array<string>
}
