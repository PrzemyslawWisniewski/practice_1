'use strict';

const customMessage = 'Not enough data';

const U = { id: 123132, gender: 'FEMALE' };

const N = [
  { id: 1, name: 'some brand 1' },
  { id: 2, name: 'some brand 2' },
  { id: 3, name: 'some brand 3' },
  { id: 4, name: 'some brand 4' },
];

const LikedBrands = [
  { id: 10, name: 'Liked brand 1' },
  { id: 20, name: 'Liked brand 2' },
  { id: 30, name: 'Liked brand 3' },
  { id: 40, name: 'Liked brand 4' },
];
// ['brand name 1', 'brand name 2'];

function getLikedBrands(id) {
  return new Promise((resolve) => {
    resolve(LikedBrands);
    // console.log('getLikedBrands', LikedBrands);
  });
}

function getTopBrandsForGender(gender) {
  return new Promise((resolve) => {
    resolve(N);
    // console.log('getTopBrandsForGender ', N);
  });
}

function CustomError(message) {
  return new Error(message);
}

function solution(U, N) {
  return new Promise((resolve, reject) => {
    const clearedList = (arrays) => Array.from(new Set(arrays));

    getLikedBrands(U.id).then((liked) => {
      // console.log(liked.slice(0, N.length).map((i) => i.name));
      console.log(liked.map((i) => i.name));

      liked.length >= N
        ? resolve(liked.slice(0, N.length).map((i) => i.name))
        : //? resolve(liked.map((i) => i.name))
          getTopBrandsForGender(U.gender).then((top) => {
            // console.log(top);

            const brands = clearedList([...liked, ...top].map((i) => i.name));
            // console.log(brands.slice(0, N));
            brands.length >= N.length ? resolve(brands.slice(0, N.length)) : reject(CustomError(customMessage));
          });
    });
  });
}

// solution(U, N);
console.log(solution(U, N));

/*  
/////////////////////////////////
*/

// function solution(U, N) {
//   return new Promise((resolve, reject) => {

//   });
// }

// solution(U, N);
// console.log(solution(U, N));

// function solution(U, N) {
//   return new Promise((resolve, reject) => {
//     getLikedBrands(U.id).then((liked) => {
//       if (liked.length >= N) {
//         resolve(liked.slice(0, N).map((i) => i.name));
//       } else {
//         getTopBrandsForGender(U.gender).then((top) => {
//           const brands = [ ...new Set(...liked, ...top)].map((i) => i.name);
//           brands.length >= N ? resolve(brands.slice(0, N)) : reject(customError(customMessage));
//         });
//       }
//     });
//   });
// }

// likedBrands.length >= N
//   ? // If liked brands are enough
//     resolve(likedBrands.slice(0, N).map((i) => i.name))
//   : // If not enough, get more brands
//     getTopBrandsForGender(U.gender).then((topBrands) => {
//       // Concat and unify brands list
//       const brands = clearedList([...likedBrands, ...topBrands].map((i) => i.name));

//       brands.length >= N
//         ? // If all brands are enough
//           resolve(brands.slice(0, N))
//         : // If still not enough
//           reject(customError(customMessage));
//     })
