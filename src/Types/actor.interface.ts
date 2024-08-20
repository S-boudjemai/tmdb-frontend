export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  biography: string;
  birthday?: string;
  place_of_birth?: string;
  popularity: number;
}
export interface Credits {
  cast: Actor[];
}
