import { IKnownFor } from "./KnownFor";

export interface ISearchPerson {
  adult: boolean;
  knownFor: IKnownFor[];
  name: string;
  profilePath: string;
  id: number;
  mediaType: number;
  popularity: number;
}
