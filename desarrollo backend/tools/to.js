function to (promise) {
    return promise.then (data => {
            return [null, data];
        })
        .catch (err => {
            return [err, null];
        })
}

exports.to = to;
