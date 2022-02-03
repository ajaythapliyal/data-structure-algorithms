export class SuffixTree {
  private text: string[];
  private root = new Node();

  constructor(text: string[]) {
    this.text = text;
    this.text.push('$');
    this.build();
  }

  private build(): void {
    for (let textIndex = this.text.length - 1; textIndex > -1; textIndex--) {
      const suffix: string[] = [];
      for (let j = textIndex; j < this.text.length; j++) {
        suffix.push(this.text[j]);
      }

      const insert = (
        node: Node,
        unmatchedNodeIndex: number,
        suffixIndex: number
      ) => {
        let matchedNode: Node | undefined = undefined;
        let nodeIndex = -1;
        for (const nodeChild of node.children) {
          if (matchedNode) break;
          nodeIndex = 0;
          while (
            nodeIndex < nodeChild.textSlice.length &&
            nodeChild.textSlice[nodeIndex] === suffix[suffixIndex]
          ) {
            matchedNode = nodeChild;
            nodeIndex++;
            suffixIndex++;
          }
        }
        if (matchedNode) {
          insert(matchedNode, nodeIndex, suffixIndex);
        } else {
          if (
            unmatchedNodeIndex &&
            unmatchedNodeIndex < node.textSlice.length
          ) {
            let splitIndex = 0;
            const matchedNodeSlice: string[] = [];
            const unmatchedNodeSlice: string[] = [];
            while (splitIndex < node.textSlice.length) {
              splitIndex < unmatchedNodeIndex
                ? matchedNodeSlice.push(node.textSlice[splitIndex])
                : unmatchedNodeSlice.push(node.textSlice[splitIndex]);
              splitIndex++;
            }
            const unmatchedNode = new Node(unmatchedNodeSlice, node.textIndex);
            unmatchedNode.children = node.children;
            node.children = [];
            node.children.push(unmatchedNode);
            node.textSlice = matchedNodeSlice;
            node.textIndex = undefined;
          }
          const suffixNodeSlice: string[] = [];
          while (suffixIndex < suffix.length) {
            suffixNodeSlice.push(suffix[suffixIndex]);
            suffixIndex++;
          }
          return node.children.push(new Node(suffixNodeSlice, textIndex));
        }
      };
      insert(this.root, 0, 0);
    }
  }
}

class Node {
  public textSlice: string[] = [];
  public children: Node[] = [];
  public textIndex: number | undefined = undefined;

  constructor(textSlice?: string[], textIndex?: number) {
    textSlice && (this.textSlice = textSlice);
    this.textIndex = textIndex;
  }

  get isInternalNode(): boolean {
    return !!this.children.length;
  }

  get isLeaf(): boolean {
    return !this.children.length;
  }

  get isRoot(): boolean {
    return !this.textSlice.length;
  }
}
