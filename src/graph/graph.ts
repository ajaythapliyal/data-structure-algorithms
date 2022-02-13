export class Graph {
  private adjacenyList: { [key: number]: Array<number> } = {};
  public vertexCount = 0;
  public addVertex(vertex: Vertex): void {
    this.adjacenyList[vertex.id] = [];
    this.vertexCount++;
  }

  public addEdge(vertex1: Vertex, vertex2: Vertex): void {
    const v1AdjacencyList = this.adjacenyList[vertex1.id];
    const v2AdjacencyList = this.adjacenyList[vertex2.id];
    if (!v1AdjacencyList.includes(vertex2.id)) {
      v1AdjacencyList.push(vertex2.id);
    }
    if (!v2AdjacencyList.includes(vertex1.id)) {
      v2AdjacencyList.push(vertex1.id);
    }
  }

  get isEmpty(): boolean {
    return !this.vertexCount;
  }
}

interface Vertex {
  id: number;
  name?: string;
}
