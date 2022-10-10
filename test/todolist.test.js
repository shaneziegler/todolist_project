const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray returns an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first returns first element', () => {
    expect(list.first()).toBe(todo1);
  });

  test('last returns last element', () => {
    expect(list.last()).toBe(todo3);
  });

  test('shift removes first element from list', () => {
    expect(list.shift()).toBe(todo1);
    expect(list.size()).toBe(2);
    expect(list.first()).toBe(todo2);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop removes last element from list', () => {
    expect(list.pop()).toBe(todo3);
    expect(list.size()).toBe(2);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('is list done?', () => {
    expect(list.isDone()).toBe(false);
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    expect(list.isDone()).toBe(true);
  });

  test('does add allow incorrect types to be added?', () => {
    expect(() => list.add()).toThrow(TypeError);
    expect(() => list.add(4)).toThrow(TypeError);
    expect(() => list.add('test')).toThrow(TypeError);
    expect(() => list.add({})).toThrow(TypeError);
  });

  test('itemAt', () => {
    expect(() => list.itemAt(99)).toThrow(ReferenceError);
    expect(() => list.itemAt()).toThrow(ReferenceError);
    expect(() => list.itemAt(-1)).toThrow(ReferenceError);
    expect(list.itemAt(1)).toBe(todo2);
    expect(list.itemAt(0)).toBe(todo1);
  });


  test('markDoneAt', () => {
    expect(() => list.markDoneAt(99)).toThrow(ReferenceError);
    expect(() => list.markDoneAt()).toThrow(ReferenceError);
    expect(() => list.markDoneAt(-1)).toThrow(ReferenceError);
    list.markDoneAt(1);
    expect(todo2.isDone()).toBe(true);
    expect(todo1.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
  });


  test('markUndoneAt', () => {
    expect(() => list.markUndoneAt(99)).toThrow(ReferenceError);
    expect(() => list.markUndoneAt()).toThrow(ReferenceError);
    expect(() => list.markUndoneAt(-1)).toThrow(ReferenceError);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);

  });

  test('markAllDone', () => {
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt()', () => {
    expect(() => list.removeAt(99)).toThrow(ReferenceError);
    expect(() => list.removeAt()).toThrow(ReferenceError);
    expect(() => list.removeAt(-1)).toThrow(ReferenceError);
    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    expect(list.toString()).toBe(string);

    list.markDoneAt(1);
    string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;
  expect(list.toString()).toBe(string);

  list.markAllDone();
    string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('forEach()', () => {
    list.forEach((todo => todo.markDone()));
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
  });

  test('filter()', () => {
    let filteredList = list.filter((todo => todo.title === todo2.title));
    expect(filteredList.title).toEqual(list.title);
    expect(filteredList.toArray()).toEqual([todo2]);
  });

});