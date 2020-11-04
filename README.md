# js-utils
Javascript utility functions


# Javascript type verification functions

## isDefined
Check if is not undefined.

## isObject
Check if is an Object.

## isString
Check if is a String.

## isFunction
Check if is a Function.

## isArray
Check if is a Array.

## isNumber
Check if is a Number.

## isRegex
Check if is a RegExp.

## isNull
Check if is null.

## isAsyncFunction
Check if is an async function.

## isEmptyObject
Check if is an Object and has no properties.

## isEmptyString
Check if is equal to an empty string.

## isEmptyArray
Check if is an Array and has zero items.

## isEmpty
Check if is null, not defined or a type with no elements/properties/items even if it is defined.


# Other utilities

## objectMap
Loop into object properties assigning to a new one using predicate function.

## objectForeach
Loop into object properties sending key-value pairs to the predicate function.

## objectToArrayMap
Convert object properties into array items using the predicate function.

## canBeNumber
Verify if can be converted to a Number.

## deleteEmptyKeys
Iterate object properties and delete them if they are empty.

## deleteEmptyKeysRecursive
Iterate object properties and delete them if they are empty or another condition (using a predicate) recursively.

## mapAsync
Generate a new array by iterate through items and using a async predicate function modify them. The return will be a Promise.
