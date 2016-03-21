"use strict"

Promise.any = function(promises = []) {
 return(new Promise(function(resolve, reject) {
  let errors = []
  for(let promise of promises) {
   promise.then(resolve).catch(function(error) {
    errors.push(error)
    if(promises.length == errors.length) {
     reject(errors)
} }) } })) }