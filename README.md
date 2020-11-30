# js-fast-utils
Javascript utility functions

![npm](https://img.shields.io/npm/dy/js-fast-utils)


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


# Date functions

## isDate
Test a string if can be parsed to Date


# Other utility functions

## objectMap
Loop into object properties assigning to a new one using predicate function and get a new mapped object.

It's useful for rearranging objects:

```js
const daysOfWeek = {
  sun: { id: 0, name: 'Sunday', abbreviated: 'SUN' },
  mon: { id: 1, name: 'Monday', abbreviated: 'MON' },
  tue: { id: 2, name: 'Tuesday', abbreviated: 'TUE' },
  wed: { id: 3, name: 'Wednesday', abbreviated: 'WED' },
  thu: { id: 4, name: 'Thursday', abbreviated: 'THU' },
  fri: { id: 5, name: 'Friday', abbreviated: 'FRI' },
  sat: { id: 6, name: 'Saturday', abbreviated: 'SAT' }
}

const indexedDaysOfWeek = objectMap(daysOfWeek, ({ id, ...day }) => ({ [id]: day }))
/* indexedDaysOfWeek:
{
  0: {name: "Sunday", abbreviated: "SUN"}
  1: {name: "Monday", abbreviated: "MON"}
  2: {name: "Tuesday", abbreviated: "TUE"}
  3: {name: "Wednesday", abbreviated: "WED"}
  4: {name: "Thursday", abbreviated: "THU"}
  5: {name: "Friday", abbreviated: "FRI"}
  6: {name: "Saturday", abbreviated: "SAT"}
}
*/
```


## objectForeach
Loop into object properties sending key-value pairs to the predicate function. 

```js
const groupedByDayOfWeek = {
  monday: {
    detectedPeople: 754,
    inDeniedList: 0
  },
  tuesday: {
    detectedPeople: 548,
    inDeniedList: 2
  }
}

objectForeach(groupedByDayOfWeek, (detectionInfo, dayOfWeek) => {
  if (detectionInfo.inDeniedList > 0) {
    // Do something
  }
})
```


## objectToArrayMap
Convert object properties into array items using the predicate function.

```js
const groupedByDayOfWeek = {
  monday: {
    detectedPeople: 754,
    inDeniedList: 0
  },
  tuesday: {
    detectedPeople: 548,
    inDeniedList: 2
  }
}

const dataArray = objectToArrayMap(groupedByDayOfWeek, (detectionInfo, dayOfWeek) => ({detectionInfo, dayOfWeek}))
/* dataArray:
[
  {
    "detectionInfo":{
      "detectedPeople":754,
      "inDeniedList":0
    },
    "dayOfWeek":"monday"
  },
  {
    "detectionInfo":{
      "detectedPeople":548,
      "inDeniedList":2
    },
    "dayOfWeek":"tuesday"
  }
]
*/
```


## canBeNumber
Verify if can be converted to a Number.

```js
console.log(canBeNumber('1')) // true
console.log(canBeNumber(''), Number('')) // true, 0
console.log(canBeNumber('Not a number')) // false
```


## deleteKeys
Iterate object properties and delete them if they match the predicate.

```js
// For example, an object from a user page edit form that you want to delete the empty properties to not send them to backend api
const userForm = {
  username: 'tim@gmail.com',
  password: undefined, // the user did not change the password and the backend do not accept an empty value for this field

  // Other examples
  emptyStringPassword: '',
  emptyObject: {},
  nullValueProp: null
}

deleteKeys(userForm, value => value === undefined)
console.log(userForm) // { username: 'tim@gmail.com', emptyStringPassword: '', emptyObject: {}, nullValueProp: null }

// You can use isEmpty to reach undefined, null, empty strings '' and empty objects {}:
deleteKeys(userForm, value => isEmpty(value))
console.log(userForm) // { username: 'tim@gmail.com' }

// And them send the put request
const response = await axios.put(userFormApiUrl, { data: userForm })
```


## deleteKeysRecursive
Iterate object properties and delete them recursively if they match the predicate.

```js
// Using the same example in deleteKeys(). Take a look at it first.

const userForm = {
  username: 'tim@gmail.com',
  password: undefined, // the user did not change the password and the backend do not accept an empty value for this field

  // Will also delete this entire prop (unlike deleteEmptyKeys())
  objectWithEmptyProps: {
    emptyProp: ''
  }
}

deleteKeysRecursive(userForm, value => isEmpty(value))

console.log(userForm) // { username: 'tim@gmail.com' }
```


## mapAsync
Generate a new array by iterate through items and using a async predicate function modify them. The return will be a Promise.


# Changes

### Version 1.0.0

- Initial release functions


### Version 1.1.0

- Add deleteKeys function

- Add deleteKeysRecursive function

#### Breaking changes!

  1. Fix deleteEmptyKeys logic to delete undefined, null, empty strings '' and empty objects {} (before the function was just undefined and empty objects {}).

  2. Fix deleteEmptyKeysRecursive logic to delete undefined, null, empty strings '' and empty objects {} (before the function was just undefined and empty objects {}).


### Version 1.2.0

#### Breaking changes!

  1. Removed deprecated deleteEmptyKeys function (deleteKeys can be used instead)

  2. Removed deprecated deleteEmptyKeysRecursive function (deleteKeysRecursive can be used instead)


# TODOS:

- Fix some typescript typings

- Add unity tests