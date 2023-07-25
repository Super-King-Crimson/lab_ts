//god i HATE exports
export default assert;

export class AssertionError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "AssertionError";
    }
}

export function assert(expression: boolean) {
    if (!expression) {
        throw new AssertionError("Assertion failed: \
            condition evaluated to false");
    }
}

/**
 * # Usage
 * Tests if `val1 === val2`, throwing an Error if it doesn't.
 * 
 * Don't worry, nobody uses == anyways.
 */
export function eq(val1: any, val2: any) {
    if (val1 !== val2) {
        throw new AssertionError(`Assertion failed: \
            ${val1} !== ${val2}`);
    }
}

/**
 * Tests if `val1` strictly equals (`===`) `val2`, throwing an Error if it does.
 * 
 * Don't worry, nobody uses != anyways.
 */
export function ne(val1: any, val2: any) {
    if (val1 === val2) {
        throw new AssertionError(`Assertion failed: \
            ${val1} === ${val2}`);
    }
}

/**
 * # Usage
 * Runs the contained closure, throwing an Error if the closure doesn't throw an Error,
 * or if the thrown Error doesn't contain `pat`.
 * 
 * # Examples
 * ```ts
 * function errorFunc() {
 *  throw Error("Here's an error, hope you enjoy");
 * }
 * 
 * Assert.willThrow(() => errorFunc());
 * Assert.willThrow(Assert.willThrow(() => "Hello world!"));
 * 
 * //Also can be caught with a substring:
 * Assert.willThrow(() => errorFunc(), "hope you enjoy");
 * Assert.willThrow(() => { 
 *      Assert.willThrow(() => errorFunc(), "Balls")
 * }, "Assertion failed:"); 
 * ```
 */
export function willThrow(fn: (...vals: any) => any, pat?: string) {
    try {
        fn();
    } catch (e) {
        if (e instanceof Error) {
            let msg: string = e.message;

            if (pat && msg.includes(pat) === false) {
                throw new AssertionError(`Assertion failed: error did not contain ${pat}`);
            }

            return;
        }
    }

    throw new AssertionError(`Assertion failed: error was not thrown by closure`);
}