'use strict';

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
      console.log(
        'getLikedBrands resolve ',
        liked.slice(0, N).map((i) => i.name)
      );

      liked.length >= N
        ? resolve(liked.slice(0, N).map((i) => i.name))
        : getTopBrandsForGender(U.gender).then((top) => {
            const brands = clearedList([...liked, ...top].map((i) => i.name));

            console.log('getTopBrandsForGender resolve ', brands.slice(0, N));

            brands.length >= N ? resolve(brands.slice(0, N)) : reject(CustomError(customMessage));
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
console.log(solution(U, 5));
