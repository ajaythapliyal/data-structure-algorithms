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
    if (v1AdjacencyList && !v1AdjacencyList.includes(vertex2.id)) {
      v1AdjacencyList.push(vertex2.id);
    }
    if (v1AdjacencyList && !v2AdjacencyList.includes(vertex1.id)) {
      v2AdjacencyList.push(vertex1.id);
    }
  }

  public bfs(vertex: Vertex): { [key: number]: BfsVertex } | undefined {
    if (!this.adjacenyList[vertex.id]) return;
    const bfsVertices: { [key: number]: BfsVertex } = {};
    const q: Vertex[] = [];
    q.push(vertex);
    bfsVertices[vertex.id] = {
      color: COLOR.GREY,
      distance: 0,
      id: vertex.id,
      parentId: null
    };
    while (q.length) {
      const currentVertex = q.pop()!;
      const bfsCurrent = bfsVertices[currentVertex.id];
      const neighbours = this.adjacenyList[currentVertex.id];
      for (const neighbour of neighbours) {
        if (!bfsVertices[neighbour]) {
          q.push({ id: neighbour });
          bfsVertices[neighbour] = {
            color: COLOR.GREY,
            parentId: currentVertex.id,
            id: neighbour,
            distance: bfsCurrent.distance + 1
          };
        }
      }
      bfsCurrent.color = COLOR.BLACK;
    }
    return bfsVertices;
  }

  get isEmpty(): boolean {
    return !this.vertexCount;
  }
}

interface Vertex {
  id: number;
  name?: string;
}

enum COLOR {
  WHITE,
  GREY,
  BLACK
}

interface BfsVertex extends Vertex {
  color: COLOR;
  distance: number;
  parentId: number | null;
}
