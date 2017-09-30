import ISorter from "./sorter";

export default class RegularSorter implements ISorter {
  public sort(input: string[]) {
    return input.sort();
  }
}
