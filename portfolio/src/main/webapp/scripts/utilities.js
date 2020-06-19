/**
 * Ensures that the stated arguments are present. 
 * @param {...(NodeList|HTMLCollection|HTML element|string|Array)} args
 *    Arguments to be checked.
 */
function ensureNonNull(... args) {
  /**
   * Indicates error type.
   * @enum {string}
   */
  const ErrorType = {
    NULL_VALUE: 'Null value',
    EMPTY_STR: 'Empty string',
    EMPTY_COLL_OR_LIST: 'Empty HTMLCollection/NodeList',
    EMPTY_ARR: 'Empty array'
  };
  Object.freeze(ErrorType);

  /** @type {ErrorType} The type of error, if any. */
  let err = null;

  for (arg of args) {
    if (arg === null) {
      err = ErrorType.NULL_VALUE;
    } else if (typeof arg === 'string' && arg === '') {
      err = ErrorType.EMPTY_STR;
    } else if ((arg instanceof HTMLCollection || arg instanceof NodeList) &&
        arg.length === 0) {
          err= ErrorType.EMPTY_COLL_OR_LIST;
    } else if (Array.isArray(arg) && arg.length === 0) {
      err = ErrorType.EMPTY_ARR;
    }

    if (err !== null) {
<<<<<<< HEAD
      console.error(`Missing desired element: ${err}`);
      break;
    }
  }
=======
      break;
    }
  }

  console.assert(err !== null, `Missing desired element: ${err}`);
>>>>>>> 5bbb7e93d9c61bed62ebf9c1cef03dc30f237652
}

/** Ensures that the element has the stated class. */
function ensureHasClass(element, statedClass) {
  if (!element.classList.contains(statedClass)) {
    throw new Error(`Element does not have ${statedClass} class`);
  }
}
