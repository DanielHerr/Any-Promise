"use strict"

Promise.any = function(promises = []) {
 return(new Promise(function(resolve, reject) {
  let errors = [], promiseamount = 0
  for(let promise of promises) {
   promiseamount = promises.length || promiseamount + 1
   Promise.resolve(promise).then(resolve).catch(function(error) {
    errors.push(error)
    if(errors.length == promiseamount) {
     reject(errors)
} }) } })) }

Promise.some = function(promises = []) {
 return(new Promise(function(resolve, reject) {
  let results = [], errors = [], promiseamount = 0
  for(let promise of promises) {
   promiseamount = promises.length || promiseamount + 1
   function checkfinish() {
    if(results.length + errors.length == promiseamount) {
     if(results.length) {
      resolve(results)
     } else {
      reject(errors)
   } } }
   Promise.resolve(promise).then(function(result) {
    results.push(result)
    checkfinish()
   }).catch(function(error) {
    errors.push(error)
    checkfinish()
}) } })) }
