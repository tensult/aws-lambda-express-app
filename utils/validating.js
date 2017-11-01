//validators for maintaing proper inputdata//
exports.dataValidator = function (createData) {
    for (i in createData) {
        if (createData[i] === undefined || createData[i] === null) {
            var err = new Error('Create input is not valid');
            err.name = "ValidationError";
            throw err;
        }
    }
}

exports.idValidator = function (deleteID) {
    if (deleteID === undefined || deleteID === null) {
        console.log('testing');
        var err = new Error('Delete input is not valid');
        err.name = "ValidationError";
        throw err;
    }
}


