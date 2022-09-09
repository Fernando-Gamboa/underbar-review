(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    // return val parameter
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n <= 0 ? [] : n >= array.length ? array : n === undefined ? array[array.length - 1] : array.slice(n);


    // Fernando Solution ---
    // return if n equals undefined gives last value of array
    // OR if n is greater than array length give array
    // OR if n equals zero give empty array or return array sliced at n
    // return n === undefined ? array[array.length - 1] : n > array.length ? array : n === 0 ? [] : array.slice(n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      // iterate through collection array
      for (var i = 0; i < collection.length; i++) {
        // use iterator on each value
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
    // if (Array.isArray(collection)) {
    //   for (let i = 0; i < collection.length; i++) {
    //     iterator(collection[i], i, collection);
    //   }
    // } else {
    //   for (let key in collection) {
    //     iterator(collection[key], key, collection);
    //   }
    // }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // Fernando's Code ------------------
    // declare result variable set to empty array
    // let result = [];
    // // iterate through array collection
    // _.each(collection, function(currentValue, index, collection) {
    //   // if test is true
    //   if (test(currentValue)) {
    //     // push value to result
    //     result.push(currentValue);
    //   }
    // });
    // // return result
    // return result;

    //Brian's code------------------------
    //iterate each element
    //return new array that was iterated
    var answer = [];

    _.each(collection, function(item) {
      if (test(item)) {
        answer.push(item);
      }
    });
    return answer;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    // Fernando's Code ------------------
    // iterate through array collection
    return _.filter(collection, function(currentValue, index, collection) {
      // if test is false
      if (!test(currentValue)) {
        // push value to result
        return currentValue;
      }
    });

    //Brian's code----------------------------
    // let answer = [];

    // return _.filter(collection, function(item) {
    //   if (!test(item)) {
    //     return item;
    //   }
    // });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    // Fernando's Code ------------------
    // declare variable result
    var result = [];
    var iteratorTest = [];
    // iterate through array collection
    _.each(array, function(currentValue, index, collection) {
      // if test is not undefined
      if (iterator !== undefined) {
        // check if array contains iterator value and if not
        if (iteratorTest.indexOf(iterator(currentValue)) === -1) {
          // push value to result and iteratorTest
          iteratorTest.push(iterator(currentValue));
          result.push(currentValue);
        }
      } else if (iterator === undefined) { // if iterator us undefined
        // if result array does not contain value
        if (result.indexOf(currentValue) === -1) {
          // push value to result
          result.push(currentValue);
        }
      }
    });
    // return result array
    return result;

    //Brian's Code ----------------
    //declare return array
    //loop through each element
    //find indexOf element in array
    //if indexOf is not found push element to array

    // let answerUnique = [];
    // let answerIterated = [];
    // _.each(array, function(item) {
    //   if (typeof iterator === 'function') {
    //     if (_.indexOf(answerIterated, iterator(item)) === -1) {
    //       answerUnique.push(item);
    //       answerIterated.push(iterator(item));
    //     }
    //   } else {
    //     if (_.indexOf(answerUnique, item) === -1) {
    //       answerUnique.push(item);
    //     }
    //   }
    // });
    // return answerUnique;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    // Fernando's Code -----------------------------
    // delcare result variable
    var result = [];
    // iterate array
    _.each(collection, function(currentValue, index, collection) {
      // push iterator value into result
      result.push(iterator(currentValue));
    });
    // retrun result
    return result;

    //Brian's solution -----------------------------------
    // push each argument into array
    // apply iterator on array and push to result
    // let answer = [];
    // _.each(collection, function() {
    //   let input = Array.prototype.slice.call(arguments);
    //   answer.push(iterator.apply(this, input));
    // });
    // return answer;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // Fernando's Code ----------
    // if accumulator is undefined
    if (accumulator === undefined) {
      // accumulator is equal to first value
      accumulator = collection[0];
      // collection is sliced out of first value
      collection = collection.slice(1);
    }
    // iterate through collection array OR object
    for (var key in collection) {
      // make iterator function equal accumulator
      accumulator = iterator(accumulator, collection[key]);
    }
    // return accumulator array
    return accumulator;





    //declare variable
    //set variable to accumulator if exists
    //for each element in collection apply iterator
    //each iterator(element) is applied to accumulator
    //

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    // Fernando's Code ----------
    // iterate collection array
    return _.reduce(collection, function(accumulator, currentValue, collection) {
      // if iterator is defined
      if (iterator !== undefined) {
        // if iterator value does not equal true
        if (!iterator(currentValue)) {
          // return false
          return false;
        }
      } else { // otherwise
        // check if current value is false
        if (currentValue === false) {
          // return false
          return false;
        }
      }
      // return accumulator
      return accumulator;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    // Fernando's Code ----------
    // retrun every as not while iterating through array
    return !_.every(collection, function(currentValue, index, collection) {
      // if a iterator exist AND current iterator value is not equal true OR current value is not equal true
      if ((iterator !== undefined && !iterator(currentValue)) || !currentValue === true) {
        // return true
        return true;
      }
    });
    // return false
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // Fernando's Code ---------
    // declare arguments
    var args = Array.prototype.slice.call(arguments);
    // skip first argument
    args = args.slice(1);
    // iterate through arguments array
    return _.reduce(args, function(accumulator, currentValue, collection) {
      // iterate through each object
      for (var key in currentValue) {
        // create properties in object from each argument
        accumulator[key] = currentValue[key];
      }
      // return accumulator
      return accumulator;
    }, obj); // accumulator equals to first input
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // Fernando's Code ---------
    // declare arguments
    var args = Array.prototype.slice.call(arguments);
    // skip first argument
    args = args.slice(1);
    // iterate through arguments array
    return _.reduce(args, function(accumulator, currentValue, collection) {
      // iterate through each object
      for (let key in currentValue) {
        // if key does not exist
        if (accumulator[key] === undefined) {
          // create properties in object from each argument
          accumulator[key] = currentValue[key];
        }
      }
      // return accumulator
      return accumulator;
    }, obj); // accumulator equals to first input
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // Fernando's Code ----------
    // declare result object
    var result = {};

    return function() {
      // create array from arguments and make them into string
      var args = JSON.stringify(Array.prototype.slice.call(arguments));

      // if the string args doesnt exist as key in result obj
      if (!result[args]) {
        // create the key and assing its value to the func with all arguments passed back as objects/arrays
        result[args] = func.apply(this, JSON.parse(args));
      }
      // return the func value
      return result[args];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // Fernando's Code ----------
    // declare args
    var args = Array.prototype.slice.call(arguments);
    // slice the array to start at index 2 and on
    args = args.slice(2);
    // use seTimeOut
    setTimeout(function() {
      // apply all arguments in array to function using apply()
      var run = func.apply(this, args);
      // return the function
      return run;
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    // Fernando's Code ----------
    // clone array
    var clone = array.slice();
    // declare result and indexes
    var result = [];
    var indexes = [];

    // iterate through input array length
    for (let i = 0; i < array.length; i++) {
      // randomize index values starting from 0 to its length
      var random = Math.floor(Math.random() * ((array.length - 1) - 0 + 1)) + 0;
      // if random number does not exist inside indexes array
      if (indexes.indexOf(random) === -1) {
        // push it to array
        indexes.push(random);
        // grab index of each value in array and push to result
        result.push(array[indexes[i]]);
      } else { // else
        // subtract from i
        i--;
      }
    }
    // return result
    return result;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
