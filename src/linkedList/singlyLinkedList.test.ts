import { SinglyLinkedList } from './singlyLinkedList';

describe('SinglyLinkedList', () => {
  let singlyLinkedList: SinglyLinkedList<number>;
  beforeEach(() => {
    singlyLinkedList = new SinglyLinkedList<number>();
  });

  it('should append item in the linkedlist', () => {
    expect(singlyLinkedList.size).toBe(0);
    const itr1 = singlyLinkedList.values();
    expect(itr1.next()).toStrictEqual({ done: true, value: undefined });
    const list = [4, 2, 0];
    let listIndex = 0;
    list.forEach((item) => singlyLinkedList.append(item));
    for (const item of singlyLinkedList.values()) {
      expect(item).toBe(list[listIndex]);
      listIndex++;
    }
    expect(singlyLinkedList.size).toBe(3);
  });

  it('should prepend item to the linkedlist', () => {
    [4, 2, 0].forEach((item) => singlyLinkedList.append(item));
    singlyLinkedList.prepend(8);
    singlyLinkedList.append(19);
    const expectedList = [8, 4, 2, 0, 19];
    let expectedIndex = 0;
    for (const item of singlyLinkedList.values()) {
      expect(item).toBe(expectedList[expectedIndex]);
      expectedIndex++;
    }
    expect(singlyLinkedList.size).toBe(5);
  });

  it('should insert the item at the right position', () => {
    singlyLinkedList.insert(1, 10);
    singlyLinkedList.insert(2, 0);
    singlyLinkedList.insert(3, 1);
    singlyLinkedList.insert(4, 2);
    singlyLinkedList.insert(5, 4);
    const expectedList = [3, 4, 1, 5, 2];
    let expectIndex = 0;
    for (const item of singlyLinkedList.values()) {
      expect(item).toBe(expectedList[expectIndex]);
      expectIndex++;
    }
    expect(singlyLinkedList.size).toBe(5);
  });

  it('should remove the head item of the linkedlist', () => {
    expect(singlyLinkedList.size).toBe(0);
    singlyLinkedList.removeFirst();
    singlyLinkedList.append(1);
    expect(singlyLinkedList.size).toBe(1);
    singlyLinkedList.removeFirst();
    const itr = singlyLinkedList.values();
    expect(itr.next()).toStrictEqual({ done: true, value: undefined });
    const appendList = [43, 44, 45];
    const expectList = appendList.slice(1);
    appendList.forEach((item) => singlyLinkedList.append(item));
    let expectIndex = 0;
    singlyLinkedList.removeFirst();
    expect(singlyLinkedList.size).toBe(2);
    for (const item of singlyLinkedList.values()) {
      expect(item).toBe(expectList[expectIndex]);
      expectIndex++;
    }
  });

  it('should remove last item from linkedlist', () => {
    expect(singlyLinkedList.size).toBe(0);
    singlyLinkedList.removeLast();
    expect(singlyLinkedList.size).toBe(0);
    const appendList = [43, 44, 45];
    const expectList = appendList.slice(0, appendList.length - 1);
    let expectIndex = 0;
    appendList.forEach((item) => singlyLinkedList.append(item));
    singlyLinkedList.removeLast();
    for (const item of singlyLinkedList.values()) {
      expect(item).toBe(expectList[expectIndex]);
      expectIndex++;
    }
  });

  it('should remove item for given position', () => {
    const appendList = [43, 44, 45, 46, 47];
    const expectList = [44, 46];
    let expectIndex = 0;
    appendList.forEach((item) => singlyLinkedList.append(item));
    singlyLinkedList.remove(-1);
    singlyLinkedList.remove(10);
    expect(singlyLinkedList.size).toBe(5);
    singlyLinkedList.remove(3);
    singlyLinkedList.remove(1);
    singlyLinkedList.remove(singlyLinkedList.size);
    for (const item of singlyLinkedList.values()) {
      expect(item).toBe(expectList[expectIndex]);
      expectIndex++;
    }
  });
});
