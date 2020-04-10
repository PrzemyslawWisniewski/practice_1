'use strict';

/*
/////////////////////
Second test question
/////////////////////
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
      // console.log(
      //   'getLikedBrands resolve ',
      //   liked.slice(0, N).map((i) => i.name)
      // );

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
  console.log(`Second test question promises for N: ${iterator[i]} `, solution(U, iterator[i]));
}

/*
/////////////////////
First test question
/////////////////////
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
console.log('First test question min value of arr2 = [-1000 ..1000]: ', solution_1(arr2));

// better way to deal with it
function solution_2(A) {
  return A.reduce((acc, cur) => Math.min(acc, cur), []);
}
console.log('Better solution for First test question: ', solution_2(arr2));
