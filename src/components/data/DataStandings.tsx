import standings_americas from '../data/standings_americas.json';
import standings_asia from '../data/standings_asia.json';
import standings_europe from '../data/standings_europe.json';

type Team = {
  standing: string;
  points: string;
  team: string;
  roster: String[];
  ranksdiff: number;
  pointsdiff: number;
};
const americasData: Team[] = standings_americas;
