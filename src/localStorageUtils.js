/* eslint-disable no-undef */
/**
 * Gets the deserialized object from local storage pointed to by storageKey,
 * or returns an empty object if one is not found
 * @param storageKey
 * @returns {{}|any}
 */
function getStorageObject(storageKey) {
  const storage = localStorage.getItem(storageKey)
  if (!storage) {
    return {}
  }
  return JSON.parse(storage)
}

/**
 * Sets the local storage object pointed to by storage key to JSON serialization of the value.
 * If value is "falsey", removes cleares the local storage item pointed to by the storage key
 * @param storageKey The key within local storage we're looking for
 * @param value the value to set it to
 */
function setStorageObject(storageKey, value) {
  if (value) {
    localStorage.setItem(storageKey, JSON.stringify(value))
  } else {
    localStorage.removeItem(storageKey)
  }
}

/**
 * Generated a reducer that backs all data with local storage.
 * @param localStorageKey the key to store the data under
 * @param reducer a reducer that outputs new states
 * @param defaultValue value to initialize to if nothing is stored locally
 * @returns a tuple containing
 * the transformed reducer that backs all resultant states by the local storage,
 * and any stored initial value for that reducer
 */
export function generateLocalStorageBackedReducer(
  localStorageKey,
  reducer,
  defaultValue
) {
  const storageBackedReducer = (state, action) => {
    const newState = reducer(state, action)
    setStorageObject(localStorageKey, newState)
    return newState
  }
  let initialValue = getStorageObject(localStorageKey)
  if (Object.keys(initialValue).length === 0 && defaultValue) {
    setStorageObject(localStorageKey, defaultValue)
    initialValue = defaultValue
  }
  return { storageBackedReducer, initialValue }
}

/**
 * Empties the storage for the given local storage key
 * @param localStorageKey the key to clear data for
 */
export function clearStorage(localStorageKey) {
  localStorage.removeItem(localStorageKey)
}
