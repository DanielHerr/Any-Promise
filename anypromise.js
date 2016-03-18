"use strict"

Promise.any = function(promises = []) {
 return(new Promise(function(resolve, reject) {
  let failed = 0
  for(let promise of promises) {
   promise.then(resolve).catch(function(error) {
    failed = failed + 1
    if(failed == promises.length) {
     reject(error)
} }) } })) }