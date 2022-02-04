export class SuffixTree {
  private doc: string[];
  private root = new Node();

  constructor(doc: string[]) {
    this.doc = doc;
    this.doc.push('$');
    this.build();
  }

  private build(): void {
    for (let docIndex = this.doc.length - 1; docIndex > -1; docIndex--) {
      const suffix: string[] = [];
      for (let j = docIndex; j < this.doc.length; j++) {
        suffix.push(this.doc[j]);
      }

      const insert = (
        node: Node,
        matchCount: number,
        suffixIndex: number
      ): void => {
        const [childNode, count] = node.findChild(suffix, suffixIndex);

        if (!childNode) {
          node.splitRequired(matchCount) && node.split(matchCount);
          return node.addChild(suffix, suffixIndex, docIndex);
        }
        return insert(childNode, count, suffixIndex + count);
      };

      insert(this.root, 0, 0);
    }
  }

  public search(pattern: string[]): number[] {
    let childNode: Node | undefined = this.root,
      parentNode: Node | undefined,
      matchCount: number,
      patternIndex = 0;
    do {
      parentNode = childNode;
      [childNode, matchCount] = childNode.findChild(pattern, patternIndex);
      patternIndex += matchCount;
    } while (childNode);
    if (!parentNode) return [];
    else return parentNode.docIndexes();
  }
}

class Node {
  private text: string[] = [];
  private children: Node[] = [];
  private docIndex: number | undefined = undefined;

  constructor(text?: string[], docIndex?: number) {
    text && (this.text = text);
    this.docIndex = docIndex;
  }

  public findChild(
    suffix: string[],
    suffixIndex: number
  ): [Node | undefined, number] {
    let matchNode: Node | undefined = undefined;
    let suffixIndexCpy = suffixIndex;
    let childIndex = 0;
    for (const child of this.children) {
      if (matchNode) break;
      childIndex = 0;
      while (
        childIndex < child.text.length &&
        child.text[childIndex] === suffix[suffixIndexCpy]
      ) {
        matchNode = child;
        childIndex++;
        suffixIndexCpy++;
      }
    }
    return [matchNode, childIndex];
  }

  public splitRequired(matchCount: number): boolean {
    return !!matchCount && matchCount < this.text.length;
  }

  public split(matchedCount: number): void {
    let index = 0;
    const matchedText: string[] = [];
    const unmatchedText: string[] = [];
    while (index < this.text.length) {
      index < matchedCount
        ? matchedText.push(this.text[index])
        : unmatchedText.push(this.text[index]);
      index++;
    }
    const unmatchedNode = new Node(unmatchedText, this.docIndex);
    unmatchedNode.children = this.children;
    this.children = [];
    this.children.push(unmatchedNode);
    this.text = matchedText;
    this.docIndex = undefined;
  }

  public addChild(
    suffix: string[],
    suffixIndex: number,
    docIndex: number
  ): void {
    const text: string[] = [];
    while (suffixIndex < suffix.length) {
      text.push(suffix[suffixIndex]);
      suffixIndex++;
    }
    this.children.push(new Node(text, docIndex));
    return;
  }

  public docIndexes(): number[] {
    const docIndexes: number[] = [];
    function internalDocIndex(node: Node): void {
      if (node.isLeaf) docIndexes.push(node.docIndex!);
      else node.children.forEach((child) => internalDocIndex(child));
    }
    internalDocIndex(this);
    return docIndexes;
  }

  get isInternalNode(): boolean {
    return !!this.children.length;
  }

  get isLeaf(): boolean {
    return !this.children.length;
  }

  get isRoot(): boolean {
    return !this.text.length;
  }
}
