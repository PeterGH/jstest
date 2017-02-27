describe("js scope", function(){

  it("allows eval() to update scope", function(){
    function callEval(str, c){
      var b = 1;
      eval(str);
      return a + b + c;
    }

    var a = 1;

    var r = callEval("a = 2; b = 2;", 1);

    expect(r).not.toEqual(3);
    expect(r).toEqual(5);
  });

  it("allows to seal or freeze an object", function(){
    var o = {
      a: 1,
      b: 2
    };

    // This will fail with 'ReferenceError: b is not defined' after
    // Object.seal() is called. Likely this is because its enumerable
    // is changed to false.
    var p = Object.getOwnPropertyDescriptor(o, "b");
    expect(p.value).toEqual(2);
    expect(p.writable).toEqual(true);
    expect(p.enumerable).toEqual(true);
    expect(p.configurable).toEqual(true);

    expect(o.a).toEqual(1);
    expect(o.b).toEqual(2);

    o.b = 3;
    expect(o.b).toEqual(3);

    Object.seal(o);

    o.c = 4;
    expect(o.c).toEqual(undefined);

    o.b = 4;
    expect(o.b).toEqual(4);

    Object.freeze(o);

    o.b = 5;
    expect(o.b).toEqual(4);
  });

  it("associative array", function(){
    var map = {};
    for (var i = 0; i < 10; i++) {
      map[i] = i * 2;
    }
    map[11] = 22;
    console.log(map);
    expect(10 in map).toBe(false);
    expect(11 in map).toBe(true);
    expect(0 in map).toBe(true);
    expect(map["0"]).toEqual(0);
    expect(map.hasOwnProperty(0)).toEqual(true);
    delete map["0"];
    console.log(map);
    expect(0 in map).toBe(false);
    expect(map["0"]).toEqual(undefined);
    expect(map.hasOwnProperty(0)).toEqual(false);
  });

  it("string charAt", function(){
    var s = "abc";
    var c = s.charAt(0);
    expect(c).toEqual("a");
    expect(typeof c).toEqual("string");
    expect(s.charAt(1)).toEqual('b');
    expect(s.charAt(2)).toEqual("c");
    expect(s.charAt(3)).toEqual('');
    expect(s.charAt(s.length)).toEqual("");
    expect(s.charAt(5)).toEqual('');
  });

  it("string split", function(){
    var ss = ["", "This is a string!"];
    var i;
    var j;
    for (i = 0; i < ss.length; i++) {
      var s = ss[i].split("");
      expect(s.length).toEqual(ss[i].length);
      for (j = 0; j < s.length; j++) {
        expect(s[j]).toEqual(ss[i].charAt(j));
      }
    }
  });

  it("string empty", function(){
    var isEmpty = function(s){
      if (!s) {
        return true;
      }
      return false;
    };

    expect(isEmpty(null)).toEqual(true);
    expect(isEmpty(undefined)).toEqual(true);
    expect(isEmpty("")).toEqual(true);
    expect(isEmpty(" ")).toEqual(false);
    expect(isEmpty("s")).toEqual(false);
  });

  it ("string substring", function(){
    var s = "str";
    expect(s.substring(0)).toEqual("str");
    expect(s.substring(1)).toEqual("tr");
    expect(s.substring(2)).toEqual("r");
    expect(s.substring(3)).toEqual("");
    expect(s.substring(s.length)).toEqual("");
    expect(s.substring(4)).toEqual("");
  });

  it("Boolean", function(){
    var v = (5 > 3);
    expect(v).toBe(true);
  });

  it("sorts array by string values", function(){
    var a = [1, 2, 10];
    a.sort();
    expect(a[0]).toEqual(1);
    expect(a[1]).toEqual(10);
    expect(a[2]).toEqual(2);
    a.sort(function(x, y) { return x - y; });
    expect(a[0]).toEqual(1);
    expect(a[1]).toEqual(2);
    expect(a[2]).toEqual(10);
  });
});
