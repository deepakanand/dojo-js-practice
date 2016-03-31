define([], function () {

    return function () {

        var counter = 0;

        return {

            count: function () {
                counter += 1;
                console.log(counter);
            }

        };
    };
});