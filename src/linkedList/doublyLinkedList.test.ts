import { DoublyLinkedList } from './doublyLinkedList';

describe('DoublyLinkedList', () => {
  let doublyLinkedList: DoublyLinkedList<string>;

  beforeEach(() => {
    doublyLinkedList = new DoublyLinkedList<string>();
  });

  it('should append item to linked list', () => {
    expect(doublyLinkedList.size).toBe(0);
    const itr1 = doublyLinkedList.values();
    expect(itr1.next()).toStrictEqual({ done: true, value: undefined });
    const list = ['Michael', 'Jim,', 'Dwight'];
    let listIndex = 0;
    list.forEach((item) => doublyLinkedList.append(item));
    for (const item of doublyLinkedList.values()) {
      expect(item).toBe(list[listIndex]);
      listIndex++;
    }
    expect(doublyLinkedList.size).toBe(3);
  });

  it('should prepend item to the linkedlist', () => {
    ['Michael', 'Jim,', 'Dwight'].forEach((item) =>
      doublyLinkedList.append(item)
    );
    doublyLinkedList.prepend('Pam');
    const expectedList = ['Pam', 'Michael', 'Jim,', 'Dwight'];
    let expectedIndex = 0;
    for (const item of doublyLinkedList.values()) {
      expect(item).toBe(expectedList[expectedIndex]);
      expectedIndex++;
    }
    expect(doublyLinkedList.size).toBe(4);
  });

  it('should insert items in linkedlist', () => {
    doublyLinkedList.insert('Michael', 10);
    doublyLinkedList.insert('Dwight', 0);
    doublyLinkedList.insert('Jim', 1);
    doublyLinkedList.insert('Pam', 2);
    doublyLinkedList.insert('Creed', 4);
    const expectedList = ['Jim', 'Pam', 'Michael', 'Creed', 'Dwight'];
    let expectIndex = 0;
    for (const item of doublyLinkedList.values()) {
      expect(item).toBe(expectedList[expectIndex]);
      expectIndex++;
    }
    expect(doublyLinkedList.size).toBe(5);
  });

  it('should remove the head item of the linkedlist', () => {
    expect(doublyLinkedList.size).toBe(0);
    doublyLinkedList.removeFirst();
    doublyLinkedList.append('Michael');
    expect(doublyLinkedList.size).toBe(1);
    doublyLinkedList.removeFirst();
    const itr = doublyLinkedList.values();
    expect(itr.next()).toStrictEqual({ done: true, value: undefined });
    const appendList = ['Michael', 'Dwight', 'Jim'];
    const expectList = appendList.slice(1);
    appendList.forEach((item) => doublyLinkedList.append(item));
    let expectIndex = 0;
    doublyLinkedList.removeFirst();
    expect(doublyLinkedList.size).toBe(2);
    for (const item of doublyLinkedList.values()) {
      expect(item).toBe(expectList[expectIndex]);
      expectIndex++;
    }
  });

  it('should remove last item from linkedlist', () => {
    expect(doublyLinkedList.size).toBe(0);
    doublyLinkedList.removeLast();
    expect(doublyLinkedList.size).toBe(0);
    const appendList = ['Michael', 'Dwight', 'Pam'];
    const expectList = appendList.slice(0, appendList.length - 1);
    let expectIndex = 0;
    appendList.forEach((item) => doublyLinkedList.append(item));
    doublyLinkedList.removeLast();
    for (const item of doublyLinkedList.values()) {
      expect(item).toBe(expectList[expectIndex]);
      expectIndex++;
    }
  });

  it('should remove item for given position', () => {
    const appendList = ['Michael', 'Jim', 'Dwight', 'Pam', 'Andy'];
    const expectList = ['Jim', 'Pam'];
    let expectIndex = 0;
    appendList.forEach((item) => doublyLinkedList.append(item));
    doublyLinkedList.remove(-1);
    doublyLinkedList.remove(10);
    expect(doublyLinkedList.size).toBe(5);
    doublyLinkedList.remove(3);
    doublyLinkedList.remove(1);
    doublyLinkedList.remove(doublyLinkedList.size);
    for (const item of doublyLinkedList.values()) {
      expect(item).toBe(expectList[expectIndex]);
      expectIndex++;
    }
  });

  describe('removeItem', () => {
    it('should remove the given element', () => {
      const appendList = ['Michael', 'Jim', 'Dwight', 'Pam', 'Andy'];
      const expectList = ['Michael', 'Dwight', 'Pam', 'Andy'];
      let expectIndex = 0;
      appendList.forEach((item) => doublyLinkedList.append(item));
      expect(doublyLinkedList.size).toBe(appendList.length);
      doublyLinkedList.removeItem('Jim');
      for (const item of doublyLinkedList.values()) {
        expect(item).toBe(expectList[expectIndex]);
        expectIndex++;
      }
      expect(doublyLinkedList.size).toBe(expectList.length);
    });

    it('should not mutate if given item is not present', () => {
      const appendList = ['Michael', 'Jim', 'Dwight', 'Pam', 'Andy'];
      let expectIndex = 0;
      appendList.forEach((item) => doublyLinkedList.append(item));
      expect(doublyLinkedList.size).toBe(appendList.length);
      doublyLinkedList.removeItem('Jetha');
      for (const item of doublyLinkedList.values()) {
        expect(item).toBe(appendList[expectIndex]);
        expectIndex++;
      }
      expect(doublyLinkedList.size).toBe(appendList.length);
    });
  });

  it('should reverse traversal correctly', () => {
    const appendList = ['Michael', 'Dwight', 'Pam'];
    appendList.forEach((item) => doublyLinkedList.append(item));
    const expectList = appendList.slice().reverse();
    let expectIndex = 0;
    for (const item of doublyLinkedList.reverseValues()) {
      expect(item).toBe(expectList[expectIndex]);
      expectIndex++;
    }
  });
});
