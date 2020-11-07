/**
 * Javascript type verification functions
 */

/**
 * Check if is not undefined.
 * @param {*} ref Any
 */
export const isDefined = (ref: any) => typeof ref !== 'undefined'

/**
 * Check if is an Object.
 * @param {*} obj Any
 */
export const isObject = (obj: any) => obj?.constructor && obj.constructor === Object

/**
 * Check if is a String.
 * @param {*} str Any
 */
export const isString = (str: any) => str?.constructor && str.constructor === String

// TODO: Include isAsyncFunction in isFunction verification?
/**
 * Check if is a Function.
 * @param {*} fn Any
 */
export const isFunction = (fn: any) => fn?.constructor && fn.constructor === Function

/**
 * Check if is a Array.
 * @param {*} arr Any
 */
export const isArray = (arr: any) => arr?.constructor && arr.constructor === Array

/**
 * Check if is a Number.
 * @param {*} n Any
 */
export const isNumber = (n: any) => n?.constructor && n.constructor === Number

/**
 * Check if is a RegExp.
 * @param {*} r Any
 */
export const isRegex = (r: any) => r?.constructor && r.constructor === RegExp

/**
 * Check if is null.
 * @param {*} ref Any
 */
export const isNull = (ref: any) => ref === null

/**
 * Check if is an async function.
 * @param {*} fn Any
 */
export const isAsyncFunction = (fn: any) => fn && fn[Symbol.toStringTag] === 'AsyncFunction'

/**
 * Check if is an Object and has no properties.
 * @param {*} obj Any
 */
export const isEmptyObject = (obj: any) => isObject(obj) && Object.keys(obj).length === 0

/**
 * Check if is equal to an empty string.
 * @param {*} str Any
 */
export const isEmptyString = (str: any) => str === ''

/**
 * Check if is an Array and has zero items.
 * @param {*} arr Any
 */
export const isEmptyArray = (arr: any) => isArray(arr) && arr.length === 0

/**
 * Check if is null, not defined or a type with no elements/properties/items even if it is defined.
 * @param {*} ref Any
 */
export const isEmpty = (ref: any) => isNull(ref) || !isDefined(ref) || isEmptyString(ref) || isEmptyArray(ref) || isEmptyObject(ref)


/**
 * Other utility functions
 */

/**
 * Loop into object properties assigning to a new one using predicate function.
 * @param {Object} object Object to loop into properties.
 * @param {Function} predicate Predicate function that will iterate in object properties.
 * @param {Object} outInto Object that will be assigned with new key value pairs from the predicate.
 */
export const objectMap = (object: any, predicate = (value: any, key: string) => ({ [key]: value }), outInto = {}) => {
  Object.keys(object).forEach(key => (<any>Object).assign(outInto, predicate(object[key], key)))
  return outInto
}

/**
 * Loop into object properties sending key-value pairs to the predicate function.
 * @param {Object} object Object to loop into properties.
 * @param {Function} predicate Predicate function that will iterate in object properties.
 */
export const objectForeach = (object: any, predicate = (_value: any, _key: string) => {}) => { Object.keys(object).forEach(key => predicate(object[key], key)) }

/**
 * Convert object properties into array items using the predicate function.
 * @param {Object} object Object to loop into properties.
 * @param {Function} predicate Predicate function that will iterate in object properties.
 */
export const objectToArrayMap = (object: any, predicate = (value: any, key: string) => ({ [key]: value })) => {
  const arr: any[] = []
  Object.keys(object).forEach(key => arr.push(predicate(object[key], key)))
  return arr
}

/**
 * Verify if can be converted to a Number.
 * @param {*} n Any
 */
export const canBeNumber = (n: any) => Number(n).toString() !== 'NaN'

/**
 * Iterate object properties and delete them if they match the predicate.
 * @param {Object} obj Object
 * @param {Function} deletePredicate Predicate function that will iterate through the object's properties, deciding when to delete.
 */
export const deleteKeys = (obj: any, deletePredicate: (value: any, key?: string) => boolean) => (Object.keys(obj).map((key: any) => deletePredicate(obj[key]) && delete obj[key]) || true) && obj

/**
 * Iterate object properties and delete them recursively if they match the predicate.
 * @param {Object} obj Object
 * @param {Function} deletePredicate Predicate function that will iterate through the object's properties, deciding when to delete.
 */
export const deleteKeysRecursive = (obj: any, deletePredicate: (value: any, key?: string) => boolean) => {
  Object.keys(obj).forEach(key => {
    if (isObject(obj[key])) deleteKeysRecursive(obj[key], deletePredicate)
    else if (deletePredicate(obj[key])) delete obj[key]

    // Reapplying predicate delete to the original object (in case that the predicate specifies to delete empty objects) 
    if (deletePredicate(obj[key])) delete obj[key]
  })
  return obj
}

/**
 * Iterate object properties and delete them if they are empty (undefined, null, empty string '' or empty object {}) or another specified condition.
 * @param {Object} obj Object
 * @param {Function} deletePredicate Predicate function that specifies another condition to delete properties.
 */
export const deleteEmptyKeys = (obj: any, deletePredicate?: (value: any, key?: string) => boolean) => deleteKeys(obj, (value, key) => isEmpty(value) || (!!deletePredicate && deletePredicate(value, key)))

/**
 * Iterate object properties and delete them if they are empty (undefined, null, empty string '' or empty object {}) or another specified condition recursively.
 * @param {Object} obj Object
 * @param {Function} deletePredicate Predicate function that specifies another condition to delete properties.
 */
export const deleteEmptyKeysRecursive = (obj: any, deletePredicate?: (value: any, key?: string) => boolean) => deleteKeysRecursive(obj, (value, key) => isEmpty(value) || (!!deletePredicate && deletePredicate(value, key)))

/**
 * Generate a new array by iterate through items and using a async predicate function modify them. The return will be a Promise.
 * @param {Array} array Array
 * @param {Function} asyncPredicate A promise or async function
 */
export const mapAsync = async (array: any, asyncPredicate: Function) => {
  if (!isArray(array)) return array
  return Promise.all(array.map((item: any) => asyncPredicate(item)))
}

// export const stateArrayPush = (stateArray, stateArraySetter, newItem) => stateArraySetter([...stateArray, newItem])
