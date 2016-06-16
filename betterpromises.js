"use strict"

Promise.any = function(promises = []) {
 return(new Promise(function(resolve, reject) {
  let errors = []
  let totalpromises = 0
  for(let promise of promises) {
   totalpromises = totalpromises + 1
   Promise.resolve(promise).then(resolve).catch(function(error) {
    errors.push(error)
    if(errors.length == totalpromises) {
     reject(errors)
} }) } })) }

Promise.some = function(promises = []) {
 return(new Promise(function(resolve, reject) {
  let totalpromises = 0
  let totalresults = 0
  let totalerrors = 0
  let results = []
  let errors = []
  for(let promise of promises) {
   let currentpromise = totalpromises
   totalpromises = totalpromises + 1
   Promise.resolve(promise).then(function(result) {
    results[currentpromise] = result
    errors[currentpromise] = undefined
    totalresults = totalresults + 1
   }).catch(function(error) {
    results[currentpromise] = undefined
    errors[currentpromise] = error
    totalerrors = totalerrors + 1
   }).then(function() {
    if(totalresults + totalerrors == totalpromises) {
     if(totalerrors == totalpromises) {
      reject(errors)
     } else {
      resolve({ results, errors })
} } }) } })) }