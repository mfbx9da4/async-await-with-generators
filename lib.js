const lib = {
  async: function async (asyncGeneratorFunc) {
    const instance = {}
    // bind the instance so we resolve to the correct instance
    instance.await = lib.await.bind(null, instance)
    instance.resolve = lib.resolve.bind(null, instance)
    // inject await
    instance.gen = asyncGeneratorFunc(instance.await);
    instance.gen.next('start function');
  },

  await: function await (instance, asyncFunc, args) {
    // call the asynchronous function and inject the callback
    args.push(instance.resolve)
    return asyncFunc.apply(null, args)
  },

  resolve: function resolve (instance, result) {
    // resolve the value to the yield and continue to next yield
    const asyncFuncReturnVal = instance.gen.next(result)
  }
}

module.exports = lib
