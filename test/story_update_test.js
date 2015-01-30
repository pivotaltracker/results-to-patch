var _                = require('lodash');
var chai             = require('chai');
var expect           = chai.expect;
var patchAssertion   = require('./patch_assertion');
var helper           = require('./helper');
var fs               = require('fs');
var commandToPatch   = require('../command_to_patch.js');

chai.Assertion.addMethod('patch', patchAssertion);

var snapshots = fs.readdirSync('./test/fixtures').filter(function(f) { return f !== '.DS_Store' });
// var snapshots = ['TaskCreate_f480ba'];

snapshots.forEach(function(name) {
  it('converts ' + name + ' to JSON patch', function() {
    var snapshot = helper.loadSnapshot(name);
    var before = snapshot.before;
    var after = snapshot.after;
    var command = snapshot.command.stale_commands[0];
    var patch = commandToPatch(before, command);

    // console.log(patch)

    expect(patch).to.patch(before, after);
    // expect(_.pluck(helper.patch(before, patch).stories, 'id')).to.deep.equal(_.pluck(after.stories, 'id'))
  });
});
