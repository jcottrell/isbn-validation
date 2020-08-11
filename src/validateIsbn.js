import {init, last, multiply, sum, zipWith} from 'ramda'

const multipliersFor13 = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3]
const multipliersFor10 = [10, 9, 8, 7, 6, 5, 4, 3, 2]
const getMultipliers = targetLength =>
    targetLength === 10 ? multipliersFor10 : multipliersFor13

const multiplyThenSum = (xs, ys) => sum(zipWith(multiply, xs, ys))

const genericModulator = baseNumber =>
    summed => baseNumber - (summed % baseNumber)
const getConcreteModulator = targetLength =>
    genericModulator(targetLength === 10 ? 11 : 10 )

const sanitizeInput = unsanitized =>
    unsanitized
        .split('')
        .map(x => parseInt(x, 10))
        .filter(x => ! isNaN(x))

const checkIsbn = (modulator, multipliers, potentialIsbn) => {
    const allButCheckDigit = init(potentialIsbn)
    const checkDigit = last(potentialIsbn)
    const totalOfDigits = multiplyThenSum(multipliers, allButCheckDigit)

    return modulator(totalOfDigits) === checkDigit
}

const validateIsbn = unsanitized => {
    const targetLength = unsanitized.length
    const sanitized = sanitizeInput(unsanitized)

    if (sanitized.length !== targetLength) {
        return false
    }

    return checkIsbn(
        getConcreteModulator(targetLength),
        getMultipliers(targetLength),
        sanitized
    )
}

export default validateIsbn
