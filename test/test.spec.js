const { expect, assert, should } = require('chai');

should();

describe('Chai Tests', () => {

    describe('.not usage', () => {
        it('expect', () => {
            expect(function () { }).to.not.throw();

            expect({ a: 1 }).to.not.have.property('b');

            expect([1, 2]).to.be.an('array').that.does.not.include(3);

            expect(2).to.equal(2);
        });

        it('should', () => {
            (function () { }).should.not.throw();

            ({ a: 1 }).should.not.have.property('b');

            ([1, 2]).should.be.an('array').that.does.not.include(3);
        });
    });

    describe('.deep usage', () => {
        it('expect', () => {
            expect({ a: 1 }).to.deep.equal({ a: 1 });
            expect({ a: 1 }).to.not.equal({ a: 1 });

            expect([{ a: 1 }, { b: 2 }]).to.deep.include({ a: 1 });
            expect([{ a: 1 }, { b: 2 }]).to.not.include({ a: 1 });
            expect({ x: { a: 1 }, b: 2 }).to.deep.include({ x: { a: 1 } });
            expect({ x: { a: 1 }, y: { b: 2 } }).to.deep.include({ x: { a: 1 } });

            expect([{ a: 1 }, { b: 2 }]).to.have.deep.members([{ a: 1 }, { b: 2 }]);
            expect([{ a: 1 }, { b: 2 }]).to.not.have.members([{ a: 1 }]);

            expect(new Set([{ a: 1 }])).to.have.deep.keys([{ a: 1 }]);
            expect(new Set([{ a: 1 }])).to.not.have.keys([{ a: 1 }]);
            expect(new Set([{ a: 1 }, { b: 2 }])).to.have.deep.keys([{ a: 1 }, { b: 2 }]);

            expect({ x: { a: 1 } }).to.have.deep.property('x', { a: 1 });
            expect({ x: { a: 1 } }).to.not.have.property('x', { a: 1 });
        });

        it('should', () => {
            ({ a: 1 }).should.deep.equal({ a: 1 });
            ({ a: 1 }).should.not.equal({ a: 1 });

            ([{ a: 1 }, { b: 2 }]).should.deep.include({ a: 1 });
            ([{ a: 1 }, { b: 2 }]).should.not.include({ a: 1 });
            ({ x: { a: 1 }, b: 2 }).should.deep.include({ x: { a: 1 } });
            ({ x: { a: 1 }, y: { b: 2 } }).should.deep.include({ x: { a: 1 } });

            ([{ a: 1 }, { b: 2 }]).should.have.deep.members([{ a: 1 }, { b: 2 }]);
            ([{ a: 1 }, { b: 2 }]).should.not.have.deep.members([{ a: 1 }]);

            (new Set([{ a: 1 }])).should.have.deep.keys([{ a: 1 }]);
            (new Set([{ a: 1 }])).should.not.have.keys([{ a: 1 }]);
            (new Set([{ a: 1 }, { b: 2 }])).should.have.deep.keys([{ a: 1 }, { b: 2 }]);

            ({ x: { a: 1 } }).should.have.deep.property('x', { a: 1 });
            ({ x: { a: 1 }, y: { b: 1 } }).should.have.deep.property('x', { a: 1 });
        });
    });

    describe('.nested usage', () => {
        it('expect', () => {
            let obj = { a: { b: ['x', 'y'] } };

            expect(obj).to.have.nested.property('a.b[1]');
            expect(obj).to.nested.include({ 'a.b[1]': 'y' });

            obj = { '.a': { '[b]': 'x' } };

            expect(obj).to.have.nested.property('\\.a.\\[b\\]');
            expect(obj).to.nested.include({ '\\.a.\\[b\\]': 'x' });
        });

        it('should', () => {
            let obj = { a: { b: ['x', 'y'] } };

            obj.should.have.nested.property('a.b[1]');
            obj.should.nested.include({ 'a.b[1]': 'y' });

            obj = { '.a': { '[b]': 'x' } };

            obj.should.have.nested.property('\\.a.\\[b\\]');
            obj.should.nested.include({ '\\.a.\\[b\\]': 'x' });
        });
    });

    describe('.own usage', () => {
        it('expect', () => {
            const obj = Object.create({ a: 1 });

            obj.b = 2;

            expect(obj).to.have.own.property('b');
            expect(obj).to.have.property('a');
            expect(obj).to.not.have.own.property('a');

            expect(obj).to.own.include({ b: 2 });
            expect(obj).to.include({ a: 1 });
        });

        it('should', () => {
            const obj = Object.create({ a: 1 });

            obj.b = 2;

            obj.should.have.own.property('b');
            obj.should.have.property('a');
            obj.should.not.have.own.property('a');

            obj.should.own.include({ b: 2 });
            obj.should.include({ a: 1 });
        });
    });

    describe('.ordered usage', () => {
        it('expect', () => {
            let numbers = [1, 2, 3];

            expect(numbers).to.have.ordered.members([1, 2, 3]).but.not.have.ordered.members([3, 2, 1]);

            expect(numbers).to.include.ordered.members([1, 2]).but.not.include.ordered.members([2, 3])
        });

        it('should', () => {
            let numbers = [1, 2, 3];

            numbers.should.have.ordered.members([1, 2, 3]).but.not.have.ordered.members([3, 2]);

            numbers.should.include.ordered.members([1, 2]).but.not.include.ordered.members([2, 3]);
        });
    });

    describe('.any usage', () => {
        it('expect', () => {
            let obj = { a: 1, b: 2 };

            expect(obj).to.not.have.any.keys('c', 'd');
        });

        it('should', () => {
            let obj = { a: 1, b: 2 };

            obj.should.not.have.any.keys('c', 'd');
        });
    });

    describe('.all usage', () => {
        it('expect', () => {
            let obj = { a: 1, b: 2 };

            expect(obj).to.have.all.keys('a', 'b');
        });

        it('should', () => {
            let obj = { a: 1, b: 2 };

            obj.should.have.all.keys('a', 'b');
        });
    });

    describe('.a or .an usage', () => {
        it('expect', () => {
            expect('foo').to.be.a('string');

            expect({ a: 1 }).to.be.an('object');

            expect(null).to.be.a('null');

            expect(undefined).to.be.an('undefined');

            expect(new Error()).to.be.an('error');

            expect(Promise.resolve()).to.be.a('promise');

            expect(new Float32Array).to.be.a('float32array');

            expect(Symbol()).to.be.a('symbol');

            expect([1, 2, 3]).to.be.an('array').that.includes(2);

            expect([]).to.be.an('array').that.is.empty;

            // expect(1).to.be.a('string', 'nooo why fail??');
            // expect(1, 'nooo why fail??').to.be.a('string');

            expect({ b: 2 }).to.have.a.property('b');
        });

        it('should', () => {
            'foo'.should.be.a('string');
            ({ a: 1 }).should.be.an('object');


            ({ b: 2 }).should.have.a.property('b');
        });
    });

    describe('.include usage', () => {
        it('expect', () => {
            expect('foobar').to.include('foo');

            expect([1, 2, 3]).to.include(2);

            expect({ a: 1, b: 2, c: 3 }).to.include({ a: 1, c: 3 });

            expect({ a: 1, b: 2, c: 3 }).to.include({ c: 3 });

            expect(new Set([1, 2])).to.include(2);

            expect(new Map([['a', 1], ['b', 2]])).to.include(2);

            expect([1, 2, 3]).to.be.an('array').that.includes(2);

            expect([{ a: 1 }]).to.deep.include({ a: 1 });

            expect([{ a: 1 }]).to.not.include({ a: 1 });

            expect({ x: { a: 1 } }).to.deep.include({ x: { a: 1 } });

            expect({ x: { a: 1 } }).to.not.include({ x: { a: 1 } });

            expect({ x: { a: 1 } }).to.deep.own.include({ x: { a: 1 } });

            expect({ x: { a: 1 }, y: { b: 2 } }).to.deep.own.include({ x: { a: 1 } });

            expect({ x: { a: 1 }, y: { b: 2 } }).to.deep.include({ x: { a: 1 } });

            expect('foobar').to.not.include('taco');

            expect([1, 2, 3]).to.not.include(4);

            expect({ c: 3 }).to.not.have.any.keys('a', 'b');

            expect({ c: 3 }).to.not.have.keys('a', 'b');

            expect({ c: 3 }).to.not.include({ a: 1, b: 2 }); // Not Recommended

            expect({ a: 3, b: 4 }).to.include({ a: 3, b: 4 });

            expect({ a: 3, b: 4 }).to.not.include({ a: 1, b: 2 }); // Not Recommended

            // expect([1, 2, 3]).to.include(4, 'nooo why fail??');

            // expect([1, 2, 3], 'nooo why fail??').to.include(4);

            expect({ a: 1, b: 2, c: 3 }).to.include.all.keys('a', 'b');

            expect({ a: 1, b: 2, c: 3 }).to.include.keys('a', 'b');

            expect({ a: 1 }).to.include.any.keys('a', 'b');

            expect({ a: 1, b: 2 }).to.have.keys('a', 'b');

            expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b');

            expect([1, 2, 3]).to.include.members([1, 2]);

            expect([1, 2, 3]).to.not.have.members([1, 2]);

            expect([1, 2, 3]).to.not.include(4);

            expect([1, 2, 3]).to.include(3);

            expect(0).to.equal(0);

            expect(null).to.be.null;

            expect(false).to.be.false;

            expect(true).to.be.true;

            expect(undefined).to.be.undefined;
        });

        it('should', () => {

        });
    });

    describe('.null, .false, .true, .undefined, .empty, .lengthOf, .eql, .above, .below, .least, .within usage', () => {
        it('expect', () => {
            expect(null).to.be.null;

            expect(false).to.be.false;

            expect(true).to.be.true;

            expect(undefined).to.be.undefined;

            expect({}).to.be.empty;

            expect({}).to.be.an('object').that.is.empty;

            expect([]).to.be.empty;

            expect([]).to.be.an('array').that.is.empty;

            expect('').to.be.empty;

            expect('').to.be.a('string').that.is.empty;

            expect(new Set()).to.be.empty;

            expect(new Map()).to.be.empty;

            expect([1, 2, 3]).to.have.lengthOf(3);

            expect('kenan').to.have.lengthOf(5);

            expect(Object.keys({ a: 1 })).to.have.lengthOf(1);

            expect(new Set([1, 2, 3])).to.have.property('size', 3);

            expect({ a: 1 }).to.deep.equal({ a: 1 });

            expect({ x: { a: 1 }, y: { b: 2 } }).to.deep.equal({ x: { a: 1 }, y: { b: 2 } });

            expect({ a: 1 }).to.not.equal({ a: 1 });

            expect([1, 2]).to.not.equal([1, 2]);

            expect([1, 2, 3]).to.deep.equal([1, 2, 3]);

            expect({ a: 1, b: 2 }).to.eql({ a: 1, b: 2 });

            expect({ a: 1, b: 2, c: 3 }).to.eql({ a: 1, b: 2, c: 3 }).but.not.equal({ a: 1, b: 2, c: 3 });

            expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);

            expect('foo').to.have.lengthOf(3);

            expect([1, 2, 3]).to.have.lengthOf(3);

            expect(1).to.be.below(2);

            expect('foo').to.lengthOf(3);

            expect('foo').to.have.lengthOf.below(4);

            expect([1, 2, 3]).have.length(3);

            expect([1, 2, 3]).have.lengthOf.below(4);

            expect(2).to.not.below(1);

            expect(2).to.not.be.below(1);

            expect(2).to.above(1);

            expect(2).to.be.above(1);

            expect('foo').to.have.lengthOf.above(2);

            expect([1, 2, 3]).to.have.lengthOf.above(2);

            expect(1).to.not.be.above(2);

            expect(2).to.be.at.least(2);

            expect(2).to.be.at.least(1);

            expect('foo').to.have.lengthOf.at.least(2);

            expect([1, 2, 3]).to.have.lengthOf.at.least(2);



            expect(2).to.equal(2);

            expect(2).to.be.within(1, 3);

            expect(2).to.be.within(2, 3);

            expect(2).to.be.within(1, 2);

            expect(1).to.not.be.within(2, 4);
        });

        it('should', () => {
            const obj1 = null;

            const obj2 = undefined;

            const no = false;

            const yes = true;

            // obj1.should.be.null;

            // obj2.should.be.undefined;

            no.should.be.false;

            yes.should.be.true;
        });
    });

    describe('.instanceof usage', () => {
        it('expect', () => {
            function Cat() { }

            expect(new Cat()).to.be.an.instanceOf(Cat);

            expect([1, 2]).to.be.an.instanceOf(Array);

            expect({ a: 1 }).to.not.be.an.instanceOf(Array);
        });

        it('should', () => {
            function Cat() { }

            (new Cat()).should.be.an.instanceOf(Cat);

            [1, 2].should.be.an.instanceOf(Array);

            ({ a: 1 }).should.not.be.an.instanceOf(Array);
        });
    });

    describe('.property usage', () => {
        it('expect', () => {
            expect({ a: 1 }).to.have.property('a');

            expect({ a: 1 }).to.have.property('a', 1);

            expect({ x: { a: 1 } }).to.have.deep.property('x', { a: 1 });

            expect({ x: { a: 1 } }).to.not.have.property('x', { a: 1 });

            const obj = Object.create({ a: 1 });

            obj.b = 2;

            expect(obj).to.have.own.property('b');

            expect(obj).to.have.own.property('b', 2);

            expect(obj).to.have.property('a');

            expect(obj).to.not.have.own.property('a');

            expect({ x: { a: 1 } }).to.have.deep.own.property('x', { a: 1 });

            expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]');

            expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]', 'y');

            expect({ a: { b: [{ c: 3 }] } }).to.have.deep.nested.property('a.b[0]', { c: 3 });

            expect({ a: 1 }).to.not.have.property('b');

            expect({ a: 1 }).to.have.property('a').that.is.a('number');
        });

        it('should', () => {

        });
    });

    describe('.lengthOf usage', () => {
        it('expect', () => {
            expect([1, 2, 3]).to.have.lengthOf(3);

            expect('foo').to.have.lengthOf(3);

            expect('foo').to.not.have.lengthOf(4);

            expect(new Set([1, 2, 3])).to.have.lengthOf(3);

            expect(new Map([['a', 1], ['b', 2], ['c', 3]])).to.have.lengthOf(3);

            expect([1, 2, 3]).to.have.lengthOf(3);

            expect([1, 2, 3]).to.have.lengthOf.above(2);

            expect([1, 2, 3]).to.have.lengthOf.below(4);

            expect([1, 2, 3]).to.have.lengthOf.at.least(3);

            expect([1, 2, 3]).to.have.lengthOf.at.most(3);

            expect([1, 2, 3]).to.have.lengthOf.within(2, 4);

            expect([1, 2, 3]).to.have.a.lengthOf(3);

        });

        it('should', () => {
            [1, 2, 3].should.have.lengthOf(3);

            'foo'.should.have.lengthOf(3);

            'foo'.should.not.have.lengthOf(4);

            (new Set([1, 2, 3])).should.have.lengthOf(3);

            (new Map([['a', 1], ['b', 2], ['c', 3]])).should.have.lengthOf(3);

            [1, 2, 3].should.have.lengthOf(3);

            [1, 2, 3].should.have.lengthOf.above(2);

            [1, 2, 3].should.have.lengthOf.below(4);

            [1, 2, 3].should.have.lengthOf.at.least(3);

            [1, 2, 3].should.have.lengthOf.at.most(3);

            [1, 2, 3].should.have.lengthOf.within(2, 4);

            [1, 2, 3].should.have.a.lengthOf(3);
        });
    });

    describe('.match usage', () => {
        it('expect', () => {
            expect('foobar').to.match(/^foo/);

            expect('foobar').to.not.match(/taco/);
        });

        it('should', () => {
            'foobar'.should.match(/^foo/);

            'foobar'.should.not.match(/taco/);
        });
    });

    describe('.string usage', () => {
        it('expect', () => {
            expect('foobar').to.have.string('bar');

            expect('foobar').to.not.have.string('taco');
        });

        it('should', () => {
            'foobar'.should.have.string('bar');

            'foobar'.should.not.have.string('taco');
        });
    });

    describe('.keys usage', () => {
        it('expect', () => {
            expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b');

            expect(['x', 'y']).to.have.all.keys(0, 1);

            expect({ a: 1, b: 2 }).to.have.all.keys(['a', 'b']);

            expect(['x', 'y']).to.have.all.keys([0, 1]);

            expect({ a: 1, b: 2 }).to.have.all.keys({ a: 4, b: 5 }); //ignore 4 and 5

            expect(['x', 'y']).to.have.all.keys({ 0: 4, 1: 5 }); //ignore 4 and 5

            expect(new Map([['a', 1], ['b', 2]])).to.have.all.keys('a', 'b');

            expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b');

            expect({ a: 1, b: 2 }).to.be.an('object').that.has.all.keys('a', 'b');

            expect(new Set([{ a: 1 }])).to.have.all.deep.keys({ a: 1 });

            expect({ a: 1, b: 2 }).to.not.have.any.keys('c', 'd');

            expect({ a: 1, b: 2 }).to.not.have.all.keys('c', 'd');

            expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b');

            expect({ a: 1, b: 2 }).to.have.keys('a', 'b');

            expect({ a: 1, b: 2, c: 3 }).to.include.all.keys('a', 'b');

            expect({ a: 1, b: 2, c: 3 }).to.not.have.all.keys('a', 'b');

            expect({ a: 1 }).to.have.any.keys('a', 'b');

            expect({ a: 1 }).to.include.any.keys('a', 'b');
        });

        it('should', () => {

        });
    });

    describe('.throw usage', () => {
        it('expect test 1', () => {
            const badFunc = function () { throw new TypeError('Illegal salmon'); };

            expect(badFunc).to.throw();

            expect(badFunc).to.throw(TypeError);

        });

        it('expect test 2', () => {
            const err = new TypeError('Illegal salmon');

            const badFunc = function () { throw err; };

            expect(badFunc).to.throw(err);

            expect(badFunc).to.throw('salmon');

            expect(badFunc).to.throw(/salmon/);

            expect(badFunc).to.throw(TypeError, 'salmon');

            expect(badFunc).to.throw(TypeError, /salmon/);

            expect(badFunc).to.throw(err, 'salmon');

            expect(badFunc).to.throw(err, /salmon/);
        });

        it('expect test 3', () => {
            const goodFunc = function () { };

            expect(goodFunc).to.not.throw();
        });

        it('expect test 4', () => {
            const badFunc = function () { throw new TypeError('Illegal salmon') };

            expect(badFunc).to.throw(TypeError, 'salmon');
        });

        it('expect test 5', () => {
            const err = new TypeError('Illegal salmon');
            err.code = 42;

            const badFunc = function () { throw err; };

            expect(badFunc).to.throw(TypeError).with.property('code', 42);
        });

        it('should', () => {

        });
    });

    describe('.respondTo usage', () => {
        it('expect', () => {
            function Cat() { }
            Cat.prototype.meow = function () { };
            Cat.hiss = function () { };

            function Dog() { }
            Dog.prototype.bark = function () { };



            expect(new Cat()).to.respondTo('meow');

            expect(Cat).to.respondTo('meow');

            expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');

            expect(new Cat()).to.be.an('object').that.respondsTo('meow');

            expect(new Dog()).to.not.respondTo('meow');

            expect(new Dog()).to.be.an('object').that.respondsTo('bark');

            expect(Dog).to.respondTo('bark');
        });

        it('should', () => {
            function Cat() { }
            Cat.prototype.meow = function () { };
            Cat.hiss = function () { };

            function Dog() { }
            Dog.prototype.bark = function () { };



            (new Cat()).should.respondTo('meow');

            Cat.should.respondTo('meow');

            Cat.should.itself.respondTo('hiss').but.not.respondTo('meow');

            (new Cat()).should.be.an('object').that.respondsTo('meow');

            (new Dog()).should.not.respondTo('meow');

            (new Dog()).should.be.an('object').that.respondsTo('bark');

            Dog.should.respondTo('bark');
        });
    });

    describe('.itself usage', () => {
        it('expect', () => {
            function Cat() { }
            Cat.prototype.meow = function () { };
            Cat.hiss = function () { };


            expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
        });

        it('should', () => {
            function Cat() { }
            Cat.prototype.meow = function () { };
            Cat.hiss = function () { };

            Cat.should.itself.to.respondTo('hiss').but.not.respondTo('meow');
        });
    });

    describe('.satisfy usage', () => {
        it('expect', () => {
            expect(1).to.satisfy(function (num) {
                return num > 0;
            });

            expect(1).to.satisfy(num => num > 0);

            expect(1).to.not.satisfy(num => num > 2);
        });

        it('should', () => {
            (1).should.satisfy(num => num > 0);

            (1).should.not.satisfy(num => num > 2);
        });
    });

    describe('.members usage', () => {
        it('expect', () => {
            expect([1, 2, 3]).to.have.members([2, 1, 3]);

            expect([1, 2, 2]).to.have.members([2, 1, 2]);




            expect([{ a: 1 }]).to.have.deep.members([{ a: 1 }]);

            expect([{ a: 1 }]).to.not.have.members([{ a: 1 }]);



            expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);

            expect([1, 2, 3]).to.have.members([2, 1, 3]).but.not.ordered.members([2, 1, 3]);



            expect([1, 2, 3]).to.include.members([1, 2]);

            expect([1, 2, 3]).to.not.have.members([1, 2]);



            expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);



            expect([{ a: 1 }, { b: 2 }, { c: 3 }]).to.include.deep.ordered.members([{ a: 1 }, { b: 2 }])
                .but.not.include.deep.ordered.members([{ b: 2 }, { c: 3 }]);

            expect([{ b: 2 }, { a: 1 }, { c: 3 }]).to.include.deep.ordered.members([{ b: 2 }, { a: 1 }])
                .but.not.include.deep.ordered.members([{ a: 1 }, { b: 2 }]);
        });

        it('should', () => {
            [1, 2, 3].should.have.members([2, 1, 3]);

            [1, 2, 2].should.have.members([2, 1, 2]);




            [{ a: 1 }].should.have.deep.members([{ a: 1 }]);

            [{ a: 1 }].should.not.have.members([{ a: 1 }]);



            [1, 2, 3].should.have.ordered.members([1, 2, 3]);

            [1, 2, 3].should.have.members([2, 1, 3]).but.not.ordered.members([2, 1, 3]);




            [1, 2, 3].should.include.members([1, 2]);

            [1, 2, 3].should.not.have.members([1, 2]);



            [1, 2, 3].should.include.members([1, 2, 2, 2]);



            [{ a: 1 }, { b: 2 }, { c: 3 }].should.include.deep.ordered.members([{ a: 1 }, { b: 2 }])
                .but.not.include.deep.ordered.members([{ b: 2 }, { c: 3 }]);

            [{ b: 2 }, { a: 1 }, { c: 3 }].should.include.deep.ordered.members([{ b: 2 }, { a: 1 }])
                .but.not.include.deep.ordered.members([{ a: 1 }, { b: 2 }]);
        });
    });

    describe('.oneOf usage', () => {
        it('expect', () => {
            expect(1).to.equal(1);

            expect(1).to.be.oneOf([1, 2, 3]);

            expect([1, 2, 3]).to.include(2);

            expect([1, 2, 3]).to.include.members([3, 1]);



            expect(1).to.not.be.oneOf([3, 4, 5, 6]);
        });

        it('should', () => {
            const number = 1;

            number.should.equal(1);

            number.should.be.oneOf([1, 2, 3]);

            [1, 2, 3].should.include(2);

            [1, 2, 3].should.include.members([3, 1]);


            number.should.not.be.oneOf([3, 4, 5, 6]);
        });
    });


    describe('.change usage', () => {
        it('expect', () => {
            let dots = '';
            const addDot = function () {
                dots += '.';
            };
            const getDots = function () {
                return dots;
            };


            expect(getDots()).to.equal('');
            addDot();
            expect(getDots()).to.equal('.');


            expect(addDot).to.change(getDots);
        });

        it('expect test 1', () => {
            const myObj = { dots: '' };
            const addDot = function () {
                myObj.dots += '.';
            };


            expect(myObj).to.have.property('dots', '');

            addDot();

            expect(myObj).to.have.property('dots', '.');

            expect(addDot).to.change(myObj, 'dots');
        });

        it('expect test 2', () => {
            const dots = '';
            const noop = function () { };
            const getDots = function () { return dots; };
            const myObj = { dots: '' };

            expect(noop).to.not.change(getDots);

            expect(noop).to.not.change(myObj, 'dots');
        });

        it('expect test 3', () => {
            const myObj = { val: 1 };
            const addTwo = function () { myObj.val += 2; };
            const subtractTwo = function () { myObj.val -= 2; };
            const noop = function () { };

            expect(addTwo).to.increase(myObj, 'val').by(2);

            expect(addTwo).to.change(myObj, 'val').by(2);

            expect(subtractTwo).to.decrease(myObj, 'val').by(2);

            expect(subtractTwo).to.change(myObj, 'val').by(2);

            expect(noop).to.not.change(myObj, 'val');

            expect(noop).to.not.change(myObj, 'val').by(2);

            expect(noop).to.not.increase(myObj, 'val');

            expect(noop).to.not.increase(myObj, 'val').by(2);

            expect(noop).to.not.decrease(myObj, 'val');

            expect(noop).to.not.decrease(myObj, 'val').by(2);
        });

        it('should', () => {
            let dots = '';
            const addDot = function () {
                dots += '.';
            };
            const getDots = function () {
                return dots;
            };


            getDots().should.equal('');
            addDot();
            getDots().should.equal('.');


            addDot.should.change(getDots);
        });

        it('should test 1', () => {
            const myObj = { val: 1, dots: '' };

            const addDot = () => myObj.dots += '.';
            const addTwo = () => myObj.val += 2;
            const subtractTwo = () => myObj.val -= 2;
            const noop = () => { };

            addTwo.should.increase(myObj, 'val');

            addTwo.should.increase(myObj, 'val').by(2);

            addTwo.should.change(myObj, 'val');

            subtractTwo.should.decrease(myObj, 'val');

            subtractTwo.should.decrease(myObj, 'val').by(2);

            subtractTwo.should.change(myObj, 'val');

            noop.should.not.change(myObj, 'val');

            noop.should.not.increase(myObj, 'val');

            noop.should.not.decrease(myObj, 'val');
        });
    });

});