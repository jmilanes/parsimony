import { IObject } from "@parsimony/types";
import { IStateService } from "./state.service";

export type FilterFn = (obj: IObject) => boolean;

class FilterService {
  filters: Record<string, FilterFn>;
  fromLink: boolean;
  stateManagement: IStateService;
  constructor(stateManager: IStateService) {
    this.filters = {};
    this.fromLink = false;
    this.stateManagement = stateManager;
  }

  clear = () => {
    this.filters = {};
    console.log("CLEAR");
    this.stateManagement.updateState();
  };
  filter = <G>(data: G[]): G[] =>
    data.filter((d) =>
      Object.values(this.filters).every((fn) => fn(d as IObject))
    );
  addFilter = (key: string, fn: FilterFn) => (this.filters[key] = fn);
  removeFilter = (key: string) => delete this.filters[key];
  setFromLink = () => (this.fromLink = true);
}

export default FilterService;
