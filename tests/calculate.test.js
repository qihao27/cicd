const data = require("../app/test_data");

test('Returns sum of two numbers', () => {
    expect(data.get_sum(2,3)).toEqual(5);
})