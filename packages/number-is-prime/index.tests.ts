import isPrime from './index'

type returnType = boolean
let returnValue: returnType

// OK
returnValue = isPrime(4)
returnValue = isPrime(17)
isPrime(2.5) // throws

// Not OK
// @ts-expect-error
isPrime(undefined)
// @ts-expect-error
isPrime(null)
// @ts-expect-error
isPrime('js')
// @ts-expect-error
isPrime([])
// @ts-expect-error
isPrime({})
// @ts-expect-error
isPrime(function () { })
// @ts-expect-error
isPrime()