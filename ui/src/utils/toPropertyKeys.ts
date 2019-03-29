interface Result {
  [key: string]: any
}

type Parameter = {
  [key: string]: any
}[]

export default function toPropertyKeys(arr: Parameter, property: string): Result {
  const result = {}

  arr.forEach((obj) => {
    result[obj[property]] = obj
  })

  return result
}