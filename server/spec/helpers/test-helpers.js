const _it = it;
global.it = function(desc, test) {
  _it(desc, function(done) {
    let result = test(done);
    if (result && result.then) {
      result.then(done, done.fail);
    } else {
      done();
    }
  });
};

const _fit = fit // eslint-disable-line
global.fit = function(desc, test) {
  _fit(desc, function(done) {
    let result = test(done);
    if (result && result.then) {
      result.then(done, done.fail);
    } else {
      done();
    }
  });
};
