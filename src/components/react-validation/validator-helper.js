
export const invalidChars = function (string, regex) {
  let arr = string.split('')
  let invalids = []
  for (let i = 0; i < arr.length; i++) {
    if (!regex.test(arr[i])) {
      invalids.push(arr[i])
    }
  }
  return invalids
}

