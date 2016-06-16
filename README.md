# Better Promises
Adds Promise.any and Promise.some functions.

Usage:
```
Promise.any([
 new Promise(function(resolve) {
  setTimeout(resolve, 100, "something")
 }), Promise.reject()
]).then(function(result) {
 console.log(result)
})
  
Promise.any([
 new Promise(function(resolve, reject) {
  setTimeout(reject, 100, "something")
 }), Promise.reject("something")
]).catch(function(errors) {
 console.log(errors)
})

Promise.some([
 new Promise(function(resolve) {
  setTimeout(resolve, 100, "something")
 }), Promise.reject("something")
]).then(function({ results, errors }) {
 console.log(results, errors)
})

Promise.some([
 new Promise(function(resolve, reject) {
  setTimeout(reject, 100, "something")
 }), Promise.reject("something")
]).catch(function(errors) {
 console.log(errors)
})
```
