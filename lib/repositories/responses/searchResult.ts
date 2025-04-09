import Repository from './repository';

export default interface SearchResult {
  lastPage: number;
  repositories: Repository[];
}
