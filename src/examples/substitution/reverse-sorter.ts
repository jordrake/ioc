import ISorter from "./sorter";

export default class ReverseSorter implements ISorter {
  public sort(input: string[]) {
    return input.sort().reverse();
  }
}
