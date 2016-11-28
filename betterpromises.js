"use strict"

Promise.fulfillers = function() {
 let resolve, reject, promise = new Promise(function(resolver, rejector) {
  resolve = resolver, reject = rejector
 })
 return(Object.assign([ promise, resolve, reject ], { promise, resolve, reject }))
}

Promise = new Proxy(Promise, {
 construct(target, inputs) {
  if(inputs.length) {
   return(Reflect.construct(target, inputs))
  } else {
   return(Promise.fulfillers())
} } })

Promise.any = function(promises = []) {
 promises = Array.from(promises)
 if(promises.length) {
  return(new Promise(function(resolve, reject) {
   let errors = []
   for(let promise of promises) {
    Promise.resolve(promise).then(resolve).catch(function(error) {
     errors.push(error)
     if(errors.length == promises.length) {
      reject(errors)
  } }) } }))
 } else {
  throw(Error("No iterable inputs."))
} }

Promise.some = function(promises = []) {
 promises = Array.from(promises)
 if(promises.length) {
  return(new Promise(function(resolve, reject) {
   let results = [], errors = []
   let totalresults = 0, totalerrors = 0
   for(let currentpromise = 0; currentpromise < promises.length; currentpromise++) {
    let promise = promises[currentpromise]
    Promise.resolve(promise).then(function(result) {
     results[currentpromise] = result
     errors[currentpromise] = undefined
     totalresults = totalresults + 1
    }).catch(function(error) {
     results[currentpromise] = undefined
     errors[currentpromise] = error
     totalerrors = totalerrors + 1
    }).then(function() {
     if(totalerrors == promises.length) {
      reject(errors)
     } else if(totalresults + totalerrors == promises.length) {
      resolve(Object.assign([ results, errors ], { results, errors }))
  } }) } }))
 } else {
  throw(Error("No iterable inputs."))
} }