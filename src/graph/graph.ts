export class Graph {
  private adjacenyList: { [key: number]: Array<number> | undefined } = {};
  public size = 0;
  public addVertex(vertex: Vertex): void {
    this.adjacenyList[vertex.id] = undefined;
  }

  public addEdge(adjacentVertex1: Vertex, adjacentVertex2: Vertex): void {
    this.adjacenyList[adjacentVertex1.id]?.push(adjacentVertex2.id);
    this.adjacenyList[adjacentVertex2.id]?.push(adjacentVertex1.id);
  }

  get isEmpty(): boolean {
    return !this.size;
  }
}

interface Vertex {
  id: number;
  name?: string;
}
