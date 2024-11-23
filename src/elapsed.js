/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2022-2024 Objectionary.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * @todo #368
 * Consider if this method belong is in the right place.
 * It might belong in a utility module.
 * For now, it remains here.
 *
 * Also, review whether the test file for this method is located appropriately.
 * It’s unclear if its current location is the best fit.
 */

/**
 * A utility function to measure the elapsed time of a task and provide
 * detailed timing information.
 *
 * This function wraps a given task (callback function) and provides it with
 * a `tracked` object that includes a `print` method. The `print` method can
 * be used within the task to log messages along with the elapsed time
 * since the task started execution. The elapsed time is formatted in milliseconds,
 * seconds, or minutes, based on the duration.
 *
 * @param {Function} task - A callback function to be measured. The function
 *                          is invoked with a `tracked` object as an argument.
 * @return {*} Result of the wrapped callback function. The result of the
 *             `task` callback will be returned unchanged.
 */
module.exports.elapsed = function elapsed(task) {
    const startTime = Date.now();
    const tracked = {
        print: (message) => {
            const duration = Date.now() - startTime;
            let extended;
            if (duration < 1000) {
                extended = `${duration}ms`;
            } else if (duration < 60 * 1000) {
                extended = `${Math.ceil(duration / 1000)}s`;
            } else {
                extended = `${Math.ceil(duration / 3600000)}min`;
            }
            let msg = `${message} in ${extended}`;
            console.info(msg);
            return msg;
        }
    }
    return task(tracked);
}