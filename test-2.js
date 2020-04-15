'use strict';

/*
///////////////////////
// First test question
///////////////////////
*/

// Given problem - for arr1 the function solution shoud return: -2 for arr2 of range [-1000 ..1000] should return: -1000
// function solution(A) {
//   var ans = 0;
//   for (i = 1; i < A.length; i++) {
//       if (ans > A[i]) {
//           ans = A[i];
//       }
//   }
//   return ans;
// }

const arr1 = [2, -2, 1, -1];

function range(size, startAt) {
  return [...Array(size).keys()].map((i) => i + startAt);
}
const arr2 = range(2001, -1000);

// solution where only one line of code could be modified.
function solution_1(A) {
  var ans = 0;
  for (let i = 0; i < A.length; i++) {
    if (ans > A[i]) {
      ans = A[i];
    }
  }
  return ans;
}
// console.log('First test question min value of arr2 = [-1000 ..1000]: ', solution_1(arr2));

// better way to deal with it
function solution_2(A) {
  return A.reduce((acc, cur) => Math.min(acc, cur), []);
}
// console.log('Better solution for First test question: ', solution_2(arr2));

/*
///////////////////////
// Second test question
///////////////////////
*/

const customMessage = 'Not enough data';

const U = { id: 123132, gender: 'FEMALE' };

const likedBrands = [
  { id: 1, name: 'Logestyx' },
  { id: 10, name: 'Gladlear' },
];

const topBrands = [
  { id: 1, name: 'Logestyx' },
  { id: 6, name: 'Burylaze Slapgalt' },
  { id: 7, name: 'Izapure' },
];

function getLikedBrands(id) {
  return new Promise((resolve) => {
    resolve(likedBrands);
  });
}

function getTopBrandsForGender(gender) {
  return new Promise((resolve) => {
    resolve(topBrands);
  });
}

function CustomError(message) {
  return new Error(message);
}

function solution(U, N) {
  return new Promise((resolve, reject) => {
    const clearedList = (arrays) => Array.from(new Set(arrays));

    getLikedBrands(U.id).then((liked) => {
      // console.log('getLikedBrands resolve ',liked.slice(0, N).map((i) => i.name));
      liked.length >= N
        ? resolve(liked.slice(0, N).map((i) => i.name))
        : getTopBrandsForGender(U.gender).then((top) => {
            const brands = clearedList([...liked, ...top].map((i) => i.name));
            // console.log('getTopBrandsForGender resolve ', brands.slice(0, N));
            brands.length >= N ? resolve(brands.slice(0, N)) : reject(new CustomError(customMessage));
          });
    });
  });
}

// parallel promises

function solution_0a(U, N) {
  const promise1 = getLikedBrands(U.id).then((liked) => {
    liked.length >= N ? resolve(liked.slice(0, N).map((i) => i.name)) : reject(new CustomError(customMessage));
  });

  const clearedList = (arrays) => Array.from(new Set(arrays));

  const promise2 = getTopBrandsForGender(U.gender).then((top) => {
    const brands = clearedList([...liked, ...top].map((i) => i.name));
    brands.length >= N ? resolve(brands.slice(0, N)) : reject(new CustomError(customMessage));
  });

  return new Promise((resolve, reject) => {
    resolve(promise1, promise2), reject(new CustomError(customMessage));
  }).all([promise1, promise2]);
}

// ***************************************************

// function solution_00(U,N) {
//   return new Promise((resolve, reject) = {

//   })
// }

// ***************************************************

// const promise1 = getLikedBrands(U.id).then((liked) => {
//   if (liked.length >= N) {
//     resolve(liked.slice(0, N).map((i) => i.name));
//   }
// });

// const clearedList = (arrays) => Array.from(new Set(arrays));

// const promise2 = getTopBrandsForGender(U.gender).then((top) => {
//   const brands = clearedList([...liked, ...top].map((i) => i.name));
//   if (brands.length >= N) {
//     resolve(brands.slice(0, N));
//   }
// });

// reject(new CustomError(customMessage));

// function solution_0b(U, N) {
//   return new Promise((resolve, reject) => {

//   });
// }

function solution_0b(U, N) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('from result'), 1000);
  });
  // .finally(() => alert('Promis ready'))
  // .then((res) => alert(res))
  // .catch((err) => alert(err));
}

/* 
For N = 1 
arr = ['Logestyx']

For N = 3
arr = ['Logestyx','Gladlear', 'Burylaze Slapgalt']

For N = 4
arr = ['Logestyx','Gladlear', 'Burylaze Slapgalt','Izapure']

For N = 5
CustomError
*/

// solution(U, 3);

const iterator = [1, , 3, 4, 5];
for (let i = 0; i < iterator.length; i++) {
  // console.log(`Second test question promises for N: ${iterator[i]} `, solution(U, iterator[i]));
  // console.log(`Second test question parallel promises for N: ${iterator[i]} `, solution_0a(U, iterator[i]));
  // console.log(`Second test question parallel promises for N: ${iterator[i]} `, solution_0b(U, iterator[i]));
}

/*
///////////////////////
// Promise 
///////////////////////
*/

// abstract parallel promise

function promise(index) {
  return new Promise((resolve) => {
    const delay = Math.random() * 5000; // between 0 and 5 seconds
    console.log(`${index}. Waiting ${delay}`);
    setTimeout(() => {
      console.log(`${index}. Done waiting ${delay}`);
      resolve();
    }, delay);
  });
}
// Promise.all([promise(1), promise(2), promise(3), promise(4), promise(5)]).then(() => console.log('All done!'));

function watchTutorialCallback(callback, errorCallback) {
  let userLeft = false;
  let userWatchingCatMeme = false;

  if (userLeft) {
    errorCallback({
      name: 'User Left',
      message: ':(',
    });
  } else if (userWatchingCatMeme) {
    errorCallback({
      name: 'User Watching Cat Meme',
      message: 'WebDevSimplified < Cat',
    });
  } else {
    callback('Thumbs up and Subscribe');
  }
}

function watchTutorialPromise() {
  let userLeft = false;
  let userWatchingCatMeme = false;
  return new Promise((resolve, reject) => {
    if (userLeft) {
      reject({
        name: 'User Left',
        message: ':(',
      });
    } else if (userWatchingCatMeme) {
      reject({
        name: 'User Watching Cat Meme',
        message: 'WebDevSimplified < Cat',
      });
    } else {
      resolve('Thumbs up and Subscribe');
    }
  });
}

// watchTutorialCallback(
//   (message) => {
//     console.log(message);
//   },
//   (error) => {
//     console.log(error.name + ' ' + error.message);
//   }
// );

// watchTutorialPromise()
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.log(error.name + ' ' + error.message);
//   });

const recordVideoOne = new Promise((resolve, reject) => {
  resolve('Video 1 Recorded');
});

const recordVideoTwo = new Promise((resolve, reject) => {
  resolve('Video 2 Recorded');
});

const recordVideoThree = new Promise((resolve, reject) => {
  resolve('Video 3 Recorded');
});

// Promise.all([recordVideoOne, recordVideoTwo, recordVideoThree]).then((messages) => {
//   console.log(messages);
// });

// Promise.race([recordVideoOne, recordVideoTwo, recordVideoThree]).then((message) => {
//   console.log(message);
// });

/*
///////////////////////
// Palindrome
///////////////////////
*/

// /[\W_]/g and /[^A-Za-z0–9]/g - do the same here, escape special characters

function palindrome_1(str) {
  const re = /[\W_]/g;
  const lowRegStr = str.toLowerCase().replace(re, '');
  console.log(lowRegStr);
  const reverseStr = lowRegStr.split('').reverse().join('');
  return reverseStr === lowRegStr;
}
// console.log('palindrome 1', palindrome_1('A man, a plan, a canal. Panama'));

function palindrome_2(str) {
  const re = /[^A-Za-z0-9]/g;
  str = str.toLowerCase().replace(re, '');
  // console.log(str);
  const len = str.length;
  for (var i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}
// console.log('palindrome 2', palindrome_2('A man, a plan, a canal. Panama'));

const str = 'A man, a plan, a canal. Panama';
const re = /[\W_]/g;
const re2 = /[^A-Za-z0–9]/g;

const arrOfStrings = [
  'A man, a plan, a canal. Panama',
  'dod',
  'abcde',
  'efghi',
  '_owo_',
  '(abcba)',
  '_o:q:o_',
  'dog god',
  '-(%;!@#$)-',
  'sefgadshae',
  '42fgIU(Y#',
  '(&%)H)DF',
];

function palindrome_3(str) {
  const re = /[\W_]/g;
  const lowerCaseStr = str.toLowerCase();
  const lowRegStr = lowerCaseStr.replace(re, '');

  // if (lowRegStr === '') {
  //   const revlowC = lowerCaseStr.split('').reverse().join('');
  //   return lowerCaseStr == revlowC;
  // } else {
  //   const reverseStr = lowRegStr.split('').reverse().join('');
  //   return reverseStr === lowRegStr;
  // }

  return lowRegStr === '' ? lowerCaseStr == lowerCaseStr.split('').reverse().join('') : lowRegStr == lowRegStr.split('').reverse().join('');
}

console.log(arrOfStrings.filter((arr) => palindrome_3(arr)));
