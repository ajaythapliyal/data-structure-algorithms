export class SuffixTree {
  private doc: string[];
  private root = new Node();

  constructor(doc: string[]) {
    this.doc = doc;
    this.doc.push('$');
    this.build();
  }

  private build(): void {
    for (let index = this.doc.length - 1; index > -1; index--) {
      const suffix: string[] = [];
      for (let j = index; j < this.doc.length; j++) {
        suffix.push(this.doc[j]);
      }

      const insert = (
        node: Node,
        matchedCount: number,
        suffixIndex: number
      ): void => {
        const [childNode, count] = this.findChild(node, suffix, suffixIndex);

        if (!childNode) {
          this.splitRequired(node, matchedCount) &&
            this.split(node, matchedCount);
          return this.addChild(node, suffix, suffixIndex, index);
        }
        return insert(childNode, count, suffixIndex + count);
      };
      insert(this.root, 0, 0);
    }
  }

  private findChild(
    node: Node,
    suffix: string[],
    suffixIndex: number
  ): [Node | undefined, number] {
    let matchedNode: Node | undefined = undefined;
    let suffixIndexCpy = suffixIndex;
    let index = 0;
    for (const child of node.children) {
      if (matchedNode) break;
      index = 0;
      while (
        index < child.text.length &&
        child.text[index] === suffix[suffixIndexCpy]
      ) {
        matchedNode = child;
        index++;
        suffixIndexCpy++;
      }
    }
    return [matchedNode, index];
  }

  private splitRequired(node: Node, matchedCount: number): boolean {
    return !!matchedCount && matchedCount < node.text.length;
  }

  private split(node: Node, matchedCount: number): void {
    let index = 0;
    const matchedText: string[] = [];
    const unmatchedText: string[] = [];
    while (index < node.text.length) {
      index < matchedCount
        ? matchedText.push(node.text[index])
        : unmatchedText.push(node.text[index]);
      index++;
    }
    const unmatchedNode = new Node(unmatchedText, node.docIndex);
    unmatchedNode.children = node.children;
    node.children = [];
    node.children.push(unmatchedNode);
    node.text = matchedText;
    node.docIndex = undefined;
  }

  private addChild(
    node: Node,
    suffix: string[],
    suffixIndex: number,
    docIndex: number
  ): void {
    const text: string[] = [];
    while (suffixIndex < suffix.length) {
      text.push(suffix[suffixIndex]);
      suffixIndex++;
    }
    node.children.push(new Node(text, docIndex));
    return;
  }
}

class Node {
  public text: string[] = [];
  public children: Node[] = [];
  public docIndex: number | undefined = undefined;

  constructor(text?: string[], docIndex?: number) {
    text && (this.text = text);
    this.docIndex = docIndex;
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
