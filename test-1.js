'use strict';

(function () {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = ['a', 'b', 'c', 'd', 'e'];
  const array3 = [{ a: '1' }, { b: '2' }, { c: '3' }, { d: '5' }, { e: '6' }];
  const array4 = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 5 }, { key: 6 }];
  const obj1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  const obj2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };

  const map1 = array1.map((n) => n * 2);
  // console.log('map1 ', map1);

  const map2 = array2.map((n) => {
    return n.charCodeAt(0);
  });
  // console.log('map2 ', map2);

  let forEachSideEffect = 0;
  const forEach1 = array1.forEach((el) => {
    forEachSideEffect = el * 2;
    // console.log(forEachSideEffect);
  });
  // console.log(forEach1); // will return undefined always

  // for ... in
  const forIn = function (object) {
    for (const prop in object) {
      console.log(`${prop}: ${obj1[prop]}`);
    }
  };
  // console.log('for ...in', forIn(obj1));

  // for ..of
  const forOf = function (array) {
    for (let el of array) {
      el += 1;
      console.log(el);
    }
  };
  // console.log(forOf(array1));
})();
