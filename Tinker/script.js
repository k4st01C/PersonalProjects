// const toDos = [];

// while (true) {
//     query = prompt('What do you want to do?');
//   if (query === 'new') {
//     const newToDo = prompt('please add to do');
//     toDos.push(newToDo);
//   } else if (query === 'list') {
//     toDos.forEach((e, i) => console.log(`** ${i} - ${e} **`));
//   } else if (query === 'delete') {
//     const delIdx = prompt('which one');
//     toDos.splice(delIdx, 1);
//     toDos.forEach((e, i) => console.log(`** ${i} - ${e} **`));
//   } else if (query==='quit') {
//       break;
//   }
// }

// const isUniform = arr => arr.every((e, i, a) => a[0] === e);

// b=isUniform([1,1,1])
// console.log(b);

// const reverseArr = (arr) => {
//   const arr2 = [];
//   arr.forEach((e) => arr2.unshift(e));
//   console.log(arr2);
// };

ar = [1, 7, 3, 4];

// reverseArr(ar);
// c = ar.reduce((a, e) => (a > e ? a : e));

// console.log(c);


const fe=((arr,fn)=>{
    for (let index = 0; index < arr.length; index++) {
        fn(arr[index]);
        
    }
})

fe(ar,console.log);