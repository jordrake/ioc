import ISorter from "./sorter"; // Depends on abstractions, not concretions!

export default class ArbitraryClassThatUsesSorter {
  private sorter: ISorter;

  constructor(sorter: ISorter) {
    this.sorter = sorter;
  }

  public sort(input: string[]) {
    return this.sorter.sort(input);
  }
}
