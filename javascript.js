'use strict';

(function () {
  /*
  *******************************
  // function mix() // return ['a', 1, 'b', 2, 'c', 3];
  *******************************
  */

  const letters = ['a', 'b', 'c'];
  const numbers = [1, 2, 3];

  function mix(a, b) {
    const c = a.reduce((acc, cur, i) => {
      return [...acc, cur, b[i]];
    }, []);
    return c;
  }
  console.log('mix()', mix(letters, numbers));

  function mix2(a, b) {
    return a.reduce((acc, cur, i) => {
      return [...acc, cur, b[i]];
    }, []);
  }
  console.log('mix2() ', mix2(letters, numbers));

  // with a for loop - old way
  var newList = function (a, b) {
    let l = a.length + b.length;
    let r = [];
    let j = 0,
      k = 0;
    for (let i = 0; i < l; i++) {
      // console.log(i, 'i');
      // console.log(i % 2 == 0, 'i % 2 == 0');
      if (i % 2 == 0) {
        r[i] = a[j++];
      } else {
        r[i] = b[k++];
      }
    }
    return r;
  };
  console.log('old way mix', newList(letters, numbers));

  /*
  *******************************
  // function add() // return ['a','b','c', 1,2,3];
  *******************************
  */

  function add() {
    const a = console.log('add 1 ', letters.concat(numbers));
    const b = console.log('add 2 ', [...letters, ...numbers]);
    return a, b;
  }
  add();

  /*
  *******************************
  // function times() // return [2,4,6];
  *******************************
  */

  function times(arr) {
    return arr.map((n) => n * 2);
  }
  console.log('times()', times(numbers));

  /*
  *******************************
  // fix this - var to let
  *******************************
  */
  for (let i = 0; i < 5; i++) {
    setTimeout(console.log(i, 'timer'), 0);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i, 'timer 2');
    }, 0);
  }

  /*
  *******************************
  // multiply(5)(3); // return 15
  *******************************
  */

  function multiply(a) {
    return (b) => {
      return a * b;
    };
  }
  console.log('multiply: ', multiply(5)(3));

  // with a curry the second number is optional
  function curry(fn, ...args) {
    return (..._arg) => {
      return fn(...args, ..._arg);
    };
  }

  function multi(a, b) {
    // if (b) {
    //   return a * b;
    // } else {
    //   return a;
    // }
    return b ? a * b : a;
  }

  const mul = curry(multi, 5);

  console.log('mul0', mul());
  console.log('mul1', mul(3, 0.5));

  /*
  *******************************
  // // Make this pure

  // const oneeighty = impure(2);

  // function impure(arg) {
  //     something = 90
  //     return arg * something
  // }

  *******************************
  */

  const oneeighty = impure(2);

  function impure(arg) {
    const something = 90;
    return arg * something;
  }

  console.log('oneeighty', oneeighty);

  /*
  *******************************

  //   const student = {
  //     name: 'John Doe',
  //     age: 16,
  //     scores: {
  //         maths: 74,
  //         english: 63
  //     }
  // };
  // console.log(`${name} scored ${maths} in Maths and ${science} in Elementary Science.`);

  // Set science to whatever, make this work

  *******************************
  */

  const student = {
    name: 'John Doe',
    age: 16,
    scores: {
      maths: 74,
      english: 63,
      something: function () {
        console.log(`student obj maths: ${this.maths}`);
      },
      hello: function () {
        console.log('hello this: ', this);
      },
      hello2: () => {
        console.log('hello2 this', this);
      },
    },
  };

  const {
    name,
    scores: { maths },
    scores: { science = 99 },
    ...rest
    // scores: { ...rest },
  } = student;
  // console.log('Obj destr: ', `${name}  in Elementary Science.`);
  console.log('Obj destr: ', `${name} scored ${maths} in Maths and ${science} in Elementary Science.`);
  console.log('rest', rest);

  // this

  student.scores.something();
  student.scores.hello();
  student.scores.hello2();

  function wow() {
    return this.name;
  }
  const resu = wow.call(student);
  console.log('resu ', resu);

  const resu2 = wow.bind(student);
  console.log('resu2 ', resu2());

  const resu3 = wow.apply(student);
  console.log('resu3 ', resu3);
})();

// const one = Rx.Observable(1,2,3,4,5);
// const two = Rx.Observable('a', 'b', 'c', 'd', 'e');

// const letterNumber = // return 1a2b3c4d5e ;
// const oneThanTwo = // return 12345abcde ;
// const ohMyThan = // return Oh My Heavens than 12345

// letterNumber.subscribe(val => console.log(val));
// oneThanTwo.subscribe(val => console.log(val));

// function ohMyHeavens() {
//   console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
// }
