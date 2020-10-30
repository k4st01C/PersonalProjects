const toDos = [];
let query;

while (query !== 'quit') {
    const query = prompt('What do you want to do?');
  if (query === 'new') {
    const newToDo = prompt('please add to do');
    toDos.push(newToDo);
  } else if (query === 'list') {
    toDos.forEach((e, i) => console.log(`** ${i} - ${e} **`));
  } else if (query === 'delete') {
    const delIdx = prompt('which one');
    toDos.splice(delIdx, 1);
    toDos.forEach((e, i) => console.log(`** ${i} - ${e} **`));
  }
}
