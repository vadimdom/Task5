describe("Rule", function() {

  it("isInt and min", function() {
    var rule = new Rule();
    rule.isInt().min(6);
    expect(rule.validationFunctions.length).toEqual(2);
  });

  it("isInt, min and max", function() {
    var rule = new Rule();
    rule.isInt().min(6).max(20);
    expect(rule.validationFunctions.length).toEqual(3);
  });
});
