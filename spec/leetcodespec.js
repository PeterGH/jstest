describe("leetcode", function () {

  var randomArrayOfLengthMinMax = function (length, min, max) {
    var a = [];
    var i;
    var v;
    for (i = 0; i < length; i++) {
      v = min + Math.floor(Math.random() * (max - min));
      if (Math.abs(v) == 0) a.push(0);
      else a.push(v);
    }
    return a;
  };

  var randomArrayOfLength = function (length) {
    return randomArrayOfLengthMinMax(length, 0, 10);
  };

  var randomArrayOfMinMax = function (min, max) {
    var length = Math.floor(Math.random() * 100);
    return randomArrayOfLengthMinMax(length, min, max);
  }

  var randomArray = function () {
    var length = Math.floor(Math.random() * 100);
    return randomArrayOfLength(length);
  };

  var randomArrayNotEmpty = function () {
    var length = 1 + Math.floor(Math.random() * 100);
    return randomArrayOfLength(length);
  };

  var randomStringOfLengthAndAlphabet = function (length, alphabet) {
    var s = "";
    var i = 0;
    var index = 0;
    for (i = 0; i < length; i++) {
      index = Math.floor(Math.random() * alphabet.length);
      s += alphabet.charAt(index);
    }
    return s;
  };

  var randomStringOfLength = function (length) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    return randomStringOfLengthAndAlphabet(length, alphabet);
  };

  var randomString = function () {
    var length = 1 + Math.floor(Math.random() * 26);
    return randomStringOfLength(length);
  };

  var randomInt = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  var verifyArray = function (actual, expected) {
    expect(actual.length).toEqual(expected.length);
    var i;
    for (i = 0; i < actual.length; i++) {
      if (Math.abs(actual[i]) == 0) {
        expect(Math.abs(expected[i])).toEqual(0);
      } else {
        expect(actual[i]).toEqual(expected[i]);
      }
    }
  };

  var sort2DArray = function (a) {
    var i;
    for (i = 0; i < a.length; i++) {
      a[i].sort();
    }
    a.sort();
  };

  var verify2DArray = function (actual, expected) {
    expect(actual.length).toEqual(expected.length);
    var i, j;
    for (i = 0; i < actual.length; i++) {
      expect(actual[i].length).toEqual(expected[i].length);
      for (j = 0; j < actual[i].length; j++) {
        if (Math.abs(actual[i][j]) == 0) {
          expect(Math.abs(expected[i][j])).toEqual(0);
        } else {
          expect(actual[i][j]).toEqual(expected[i][j]);
        }
      }
    }
  };

  var permuteString = function (str) {
    var result = [];
    if (!str) return result;
    var permute = function (prefix, cur) {
      if (!cur) {
        result.push(prefix);
        return;
      }
      var c;
      var i;
      var s = "";
      for (i = 0; i < cur.length; i++) {
        c = cur.charAt(i);
        if (i > 0) s = cur.substring(0, i);
        if (i < cur.length - 1) s += cur.substring(i + 1, cur.length);
        permute(prefix + c, s);
      }
    };
    permute("", str);
    return result;
  };

  it("Permute String", function () {
    var test = function (str) {
      var res = permuteString(str);
      var count = 1;
      for (var i = 1; i <= str.length; i++) {
        count *= i;
      }
      expect(res.length).toEqual(str.length > 0 ? count : 0);
      for (var i = 0; i < res.length; i++) {
        expect(res[i].length).toEqual(str.length);
        for (var j = i + 1; j < res.length; j++) {
          expect(res[i].localeCompare(res[j])).not.toEqual(0);
        }
      }
    };

    test("");
    test("a");
    test("ab");
    test("abc");
    test("abcd");
  });

  it("Two Sum", function () {
    var twoSum = function (nums, target) {
      var result = [];
      var index = {};
      var i;
      var first;
      for (i = 0; i < nums.length; i++) {
        first = target - nums[i];
        if (index.hasOwnProperty(first)) {
          result.push(index[first]);
          result.push(i);
          break;
        } else {
          index[nums[i]] = i;
        }
      }
      return result;
    };

    var twoSum2 = function (nums, target) {
      var result = [];
      var i;
      var index = [];
      for (i = 0; i < nums.length; i++) {
        index.push(i);
      }
      index.sort(function (x, y) { return nums[x] - nums[y]; });
      i = 0;
      var j = nums.length - 1;
      var s;
      while (i < j) {
        s = nums[index[i]] + nums[index[j]];
        if (s == target) {
          result.push(index[i], index[j]);
          break;
        } else if (s < target) {
          while (i + 1 < j && nums[index[i]] == nums[index[i + 1]]) i++;
          i++;
        } else {
          while (i < j - 1 && nums[index[j - 1]] == nums[index[j]]) j--;
          j--;
        }
      }
      return result;
    };

    var test = function (nums, target, answer) {
      var result = twoSum(nums, target);
      var result2 = twoSum2(nums, target);
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(answer[0]);
      expect(result[1]).toEqual(answer[1]);
      expect(result2.length).toEqual(2);
      expect(result2[0]).toEqual(answer[0]);
      expect(result2[1]).toEqual(answer[1]);
    };

    test([1, 1], 2, [0, 1]);
    test([1, 2, 3], 3, [0, 1]);
    test([1, 2, 3], 4, [0, 2]);
    test([1, 2, 3], 5, [1, 2]);
  });

  it("3Sum", function () {
    var threeSum = function (nums) {
      var ans = [];
      if (!nums || nums.length < 3) return ans;
      nums.sort(function (x, y) { return x - y; });
      var i, j;
      var twoSum;
      var map;
      var n;
      var t;
      for (i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) break;
        if (i > 0 && nums[i - 1] == nums[i]) continue;
        map = {};
        twoSum = -nums[i];
        for (j = i + 1; j < nums.length; j++) {
          n = twoSum - nums[j];
          if (map.hasOwnProperty(n)) {
            if (n == nums[j]) {
              if (map[n].length < 2) {
                t = [nums[i], n, nums[j]];
                ans.push(t);
                map[n].push(j);
              }
            } else {
              if (!map.hasOwnProperty(nums[j])) {
                t = [nums[i], n, nums[j]];
                ans.push(t);
                map[nums[j]] = [];
                map[nums[j]].push(j);
              }
            }
          } else {
            if (!map.hasOwnProperty(nums[j])) {
              map[nums[j]] = [];
              map[nums[j]].push(j);
            }
          }
        }
      }
      return ans;
    };

    var threeSum2 = function (nums) {
      var ans = [];
      if (!nums || nums.length < 3) return ans;
      nums.sort(function (x, y) { return x - y; });
      var i, j, k;
      var twoSum;
      var t;
      for (i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) break;
        if (i > 0 && nums[i - 1] == nums[i]) continue;
        twoSum = -nums[i];
        j = i + 1;
        k = nums.length - 1;
        while (j < k) {
          if (nums[j] + nums[k] == twoSum) {
            t = [nums[i], nums[j], nums[k]];
            ans.push(t);
            while (j + 1 < k && nums[j] == nums[j + 1]) j++;
            j++;
            while (j < k - 1 && nums[k - 1] == nums[k]) k--;
            k--;
          } else if (nums[j] + nums[k] < twoSum) {
            j++;
          } else {
            k--;
          }
        }
      }
      return ans;
    };

    var test = function (nums, ans) {
      var s = threeSum(nums);
      var s2 = threeSum2(nums);
      sort2DArray(ans);
      sort2DArray(s);
      sort2DArray(s2);
      verify2DArray(s, ans);
      verify2DArray(s2, ans);
    };

    test([-1, 0, 1, 2, -1, -4], [[-1, 0, 1], [-1, -1, 2]]);

    var test2 = function () {
      var i;
      for (i = 0; i < 200; i++) {
        var nums = randomArrayOfMinMax(-50, 50);
        var s = threeSum(nums);
        var s2 = threeSum2(nums);
        sort2DArray(s);
        sort2DArray(s2);
        verify2DArray(s, s2);
      }
    };

    test2();
  });

  it("3Sum Closest", function () {
    var threeSumClosest = function (nums, target) {
      var d = Number.MAX_VALUE;
      var closest;
      var i, j, k;
      var s;
      for (i = 0; i < nums.length - 2; i++) {
        for (j = i + 1; j < nums.length - 1; j++) {
          for (k = j + 1; k < nums.length; k++) {
            s = nums[i] + nums[j] + nums[k];
            if (Math.abs(s - target) < d) {
              d = Math.abs(s - target);
              closest = s;
            }
          }
        }
      }
      return closest;
    };

    var threeSumClosest2 = function (nums, target) {
      if (nums.length <= 3) {
        return nums.reduce(function (acc, val) { return acc + val; }, 0);
      }
      nums.sort(function (x, y) { return x - y; });
      var d = Number.MAX_VALUE;
      var closest;
      var i, j, k;
      var s;
      for (i = 0; i < nums.length - 2; i++) {
        j = i + 1;
        k = nums.length - 1;
        while (j < k) {
          s = nums[i] + nums[j] + nums[k];
          if (Math.abs(s - target) < d) {
            d = Math.abs(s - target);
            closest = s;
          }
          if (s == target) {
            break;
          } else if (s < target) {
            while (j + 1 < k && nums[j] == nums[j + 1]) j++;
            j++;
          } else {
            while (j < k - 1 && nums[k - 1] == nums[k]) k--;
            k--;
          }
        }
      }
      return closest;
    };

    var test = function (nums, target, ans) {
      var s = threeSumClosest(nums, target);
      var s2 = threeSumClosest2(nums, target);
      if (s == s2) {
        expect(s).toEqual(ans);
        expect(s2).toEqual(ans);
      } else {
        expect(Math.abs(s - ans)).toEqual(Math.abs(s2 - ans));
      }
    };

    test([-1, 2, 1, -4], 1, 2);
    test([-10, -8, -5, -2, -1, 4, 5, 8], -6, -6);

    var test2 = function () {
      var i;
      for (i = 0; i < 1000; i++) {
        var nums = randomArrayOfLengthMinMax(randomInt(3, 100), -100, 100);
        var target = randomInt(-101, 101);
        var s = threeSumClosest(nums, target);
        var s2 = threeSumClosest2(nums, target);
        if (s != s2) {
          console.log(i, nums, target, s, s2);
          expect(Math.abs(s - target)).toEqual(Math.abs(s2 - target));
        }
      }
    };

    test2();
  });

  it("4Sum", function () {
    var fourSum = function (nums, target) {
      var ans = [];
      if (!nums || nums.length < 4) return ans;
      nums.sort(function (x, y) { return x - y; });
      var i, j, k, l;
      i = 0;
      while (i < nums.length - 3) {
        j = i + 1;
        while (j < nums.length - 2) {
          k = j + 1;
          l = nums.length - 1;
          while (k < l) {
            var s = nums[i] + nums[j] + nums[k] + nums[l];
            if (s == target) {
              ans.push([nums[i], nums[j], nums[k], nums[l]]);
              while (k < l && nums[k] == nums[k + 1]) k++;
              if (k < l) k++;
              while (k < l && nums[l - 1] == nums[l]) l--;
              if (k < l) l--;
            } else if (s < target) {
              while (k < l && nums[k] == nums[k + 1]) k++;
              if (k < l) k++;
            } else {
              while (k < l && nums[l - 1] == nums[l]) l--;
              if (k < l) l--;
            }
          }
          while (j < nums.length - 2 && nums[j] == nums[j + 1]) j++;
          if (j < nums.length - 2) j++;
        }
        while (i < nums.length - 3 && nums[i] == nums[i + 1]) i++;
        if (i < nums.length - 3) i++;
      }
      return ans;
    };

    var test = function (nums, target, ans) {
      var r = fourSum(nums, target);
      sort2DArray(r);
      sort2DArray(ans);
      verify2DArray(r, ans);
    };

    test(
      [1, 0, -1, 0, -2, 2],
      0,
      [
        [-1, 0, 0, 1],
        [-2, -1, 1, 2],
        [-2, 0, 0, 2]
      ]);

    test(
      [0, 0, 4, -2, -3, -2, -2, -3],
      -1,
      [[-3, -2, 0, 4]]);
  });

  describe("Link List", function () {
    function ListNode(val) {
      this.val = val;
      this.next = null;
    }

    var arrayToList = function (a) {
      var l = null;
      var c = null;
      var i;
      var n;
      for (i = 0; i < a.length; i++) {
        n = new ListNode(a[i]);
        if (l == null) {
          l = n;
          c = n;
        } else {
          c.next = n;
          c = n;
        }
      }
      return l;
    };

    var listToArray = function (l) {
      var a = [];
      while (l != null) {
        a.push(l.val);
        l = l.next;
      }
      return a;
    };

    it("Add Two Numbers", function () {
      // List head is the least significant digit
      // Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
      // Output: 7 -> 0 -> 8
      var addTwoNumbers = function (l1, l2) {
        var carry = 0;
        var list = null; // The head of the result list
        var current = null; // The current node of the result list
        var sum;
        while (l1 != null || l2 != null || carry != 0) {
          sum = carry;
          if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
          }
          if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
          }
          if (sum >= 10) {
            carry = 1;
            sum -= 10;
          } else {
            carry = 0;
          }
          var n = new ListNode(sum);
          if (list == null) {
            list = n;
            current = n;
          } else {
            current.next = n;
            current = n;
          }
        }
        return list;
      };

      // What if the the digits in the linked list are stored in non-reversed order?
      // The list head is the most significant digit. For example:
      // (3 -> 4 -> 2) + (4 -> 6 -> 5) = 8 -> 0 -> 7
      var addTwoNumbers2 = function (l1, l2) {
        var addTwoNumbersSameLength = function (ls1, ls2, ls) {
          if (ls1 == null && ls2 == null) {
            return 0;
          }
          var n = new ListNode(0);
          var c = addTwoNumbersSameLength(ls1.next, ls2.next, n);
          var s = c;
          s += ls1.val;
          s += ls2.val;
          if (s >= 10) {
            c = 1;
            s -= 10;
          } else {
            c = 0;
          }
          n.val = s;
          ls.next = n;
          return c;
        };

        if (l1 == null && l2 == null) return null;

        var s1 = l1;
        var s2 = l2;
        while (s1 != null && s2 != null) {
          s1 = s1.next;
          s2 = s2.next;
        }

        var a;
        var b1, b2;
        var s;
        if (s1 == null) {
          a = l2
          b1 = l2;
          s = s2;
          b2 = l1;
        } else if (s2 == null) {
          a = l1;
          b1 = l1;
          s = s1;
          b2 = l2;
        }

        while (s != null) {
          s = s.next;
          b1 = b1.next;
        }

        // (1) a -> ... -> b1 == null
        //                 b2 == null
        // (2) a -> ... -> b1 -> ... -> null
        //                 b2 -> ... -> null
        // (3) a = b1 -> ... -> null
        //         b2 -> ... -> null

        var add = function (la, ln) {
          if (la == b1) {
            return addTwoNumbersSameLength(b1, b2, ln);
          }
          var n = new ListNode(0);
          var c = add(la.next, n);
          var s = c;
          s += la.val;
          if (s >= 10) {
            s -= 10;
            c = 1;
          } else {
            c = 0;
          }
          n.val = s;
          ln.next = n;
          return c;
        };

        var list = new ListNode(0);
        var c = add(a, list);
        if (c > 0) list.val = c;
        else list = list.next;
        return list;
      };

      // What if the the digits in the linked list are stored in non-reversed order?
      // The list head is the most significant digit. For example:
      // (3 -> 4 -> 2) + (4 -> 6 -> 5) = 8 -> 0 -> 7
      var addTwoNumbers3 = function (l1, l2) {
        if (l1 == null && l2 == null) return null;
        var a1 = [];
        var a2 = [];
        while (l1 != null) {
          a1.push(l1.val);
          l1 = l1.next;
        }
        while (l2 != null) {
          a2.push(l2.val);
          l2 = l2.next;
        }
        var list = null;
        var carry = 0;
        var sum = 0;
        while (a1.length > 0 || a2.length > 0 || carry > 0) {
          sum = carry;
          if (a1.length > 0) sum += a1.pop();
          if (a2.length > 0) sum += a2.pop();
          if (sum >= 10) {
            sum -= 10;
            carry = 1;
          } else {
            carry = 0;
          }
          var n = new ListNode(sum);
          if (list != null) n.next = list;
          list = n;
        }

        return list;
      };

      var test = function (a1, a2, answer) {
        var l1 = arrayToList(a1);
        var l2 = arrayToList(a2);
        var l = addTwoNumbers(l1, l2);
        var a = listToArray(l);
        expect(a.length).toEqual(answer.length);
        var i;
        for (i = 0; i < a.length; i++) {
          expect(a[i]).toEqual(answer[i]);
        }

        var lr1 = arrayToList(a1.reverse());
        var lr2 = arrayToList(a2.reverse());
        var lr = addTwoNumbers2(lr1, lr2);
        var ar = listToArray(lr);
        ar.reverse();
        expect(ar.length).toEqual(answer.length);
        for (i = 0; i < ar.length; i++) {
          expect(ar[i]).toEqual(answer[i]);
        }

        var lr21 = arrayToList(a1);
        var lr22 = arrayToList(a2);
        var lr2 = addTwoNumbers3(lr21, lr22);
        var ar2 = listToArray(lr2);
        ar2.reverse();
        expect(ar2.length).toEqual(answer.length);
        for (i = 0; i < ar2.length; i++) {
          expect(ar2[i]).toEqual(answer[i]);
        }
      };

      test([2, 4, 3], [5, 6, 4], [7, 0, 8]);
      test([], [], []);
      test([], [1], [1]);
      test([1], [], [1]);
      test([5, 5, 5], [5], [0, 6, 5]);
      test([5], [5], [0, 1]);
      test([9, 9], [1], [0, 0, 1]);

      var testRandom = function () {
        var a1 = randomArray();
        var a2 = randomArray();

        var l1 = arrayToList(a1);
        var l2 = arrayToList(a2);
        var lr1 = addTwoNumbers(l1, l2);
        var ar1 = listToArray(lr1);

        a1.reverse();
        a2.reverse();

        var l11 = arrayToList(a1);
        var l12 = arrayToList(a2);
        var lr11 = addTwoNumbers2(l11, l12);
        var ar11 = listToArray(lr11);
        ar11.reverse();

        var l21 = arrayToList(a1);
        var l22 = arrayToList(a2);
        var lr21 = addTwoNumbers3(l21, l22);
        var ar21 = listToArray(lr21);
        ar21.reverse();

        expect(ar1.length).toEqual(ar11.length);
        expect(ar1.length).toEqual(ar21.length);
        var i;
        for (i = 0; i < ar1.length; i++) {
          expect(ar1[i]).toEqual(ar11[i]);
          expect(ar1[i]).toEqual(ar21[i]);
        }
      };

      for (var i = 0; i < 100; i++) {
        testRandom();
      }
    });

    it("Remove Nth Node From End of List", function () {
      var removeNthFromEnd = function (head, n) {
        if (!head) return head;
        var q = head;
        var i = 0;
        while (q != null && i < n) {
          q = q.next;
          i++;
        }
        if (i < n) {
          // list has less than n nodes
          return head;
        }
        // now q is at index n
        if (q == null) {
          // head is the n-th node from the end
          head = head.next;
          return head;
        }
        q = q.next;
        var p = head;
        while (q != null) {
          p = p.next;
          q = q.next;
        }
        p.next = p.next.next;
        return head;
      };

      var test = function (a, n, ans) {
        var l = arrayToList(a);
        var l2 = removeNthFromEnd(l, n);
        var a2 = listToArray(l2);
        a2.sort();
        ans.sort();
        verifyArray(a2, ans);
      };

      test([1, 2, 3, 4, 5], 5, [2, 3, 4, 5]);
      test([1, 2, 3, 4, 5], 1, [1, 2, 3, 4]);
      test([1, 2, 3, 4, 5], 2, [1, 2, 3, 5]);
      test([1, 2, 3, 4, 5], 6, [1, 2, 3, 4, 5]);
    });

    it("Merge Two Sorted Lists", function () {
      var mergeTwoLists = function (l1, l2) {
        var l = null;
        var c;
        while (l1 != null && l2 != null) {
          if (l1.val < l2.val) {
            if (l == null) {
              l = l1;
              c = l1;
            } else {
              c.next = l1;
              c = l1;
            }
            l1 = l1.next;
          } else {
            if (l == null) {
              l = l2;
              c = l2;
            } else {
              c.next = l2;
              c = l2;
            }
            l2 = l2.next;
          }
        }
        if (l1 == null) {
          if (l == null) {
            l = l2;
          } else {
            c.next = l2;
          }
        } else if (l2 == null) {
          if (l == null) {
            l = l1;
          } else {
            c.next = l1;
          }
        }
        return l;
      };

      var test = function () {
        for (var i = 0; i < 100; i++) {
          var len1 = randomInt(0, 100);
          var a1 = randomArrayOfLengthMinMax(len1, 0, 100);
          a1.sort(function (x, y) { return x - y; });
          var len2 = randomInt(0, 100);
          var a2 = randomArrayOfLengthMinMax(len2, 0, 100);
          a2.sort(function (x, y) { return x - y; });
          var l1 = arrayToList(a1);
          var l2 = arrayToList(a2);
          var l = mergeTwoLists(l1, l2);
          var a = listToArray(l);
          expect(a.length).toEqual(a1.length + a2.length);
          for (var j = 0; j < a.length - 1; j++) {
            expect(a[j]).not.toBeGreaterThan(a[j + 1]);
          }
        }
      };

      test();
    });
  });

  it("Longest Substring Without Repeating Characters", function () {
    // Given a string, find the length of the longest substring without repeating
    // characters.
    // Examples:
    // Given "abcabcbb", the answer is "abc", which the length is 3.
    // Given "bbbbb", the answer is "b", with the length of 1.
    // Given "pwwkew", the answer is "wke", with the length of 3. Note that the
    // answer must be a substring, "pwke" is a subsequence and not a substring.

    var lengthOfLongestSubstring = function (s) {
      if (s == undefined || s == null || s == "") return 0;
      var chars = s.split("");
      var map = {};
      var begin = 0;
      var end = 0;
      var b = 0;
      var i;
      for (i = 0; i < chars.length; i++) {
        if (map.hasOwnProperty(chars[i]) && map[chars[i]] >= b) {
          if ((i - 1 - b) > (end - begin)) {
            begin = b;
            end = i - 1;
          }
          b = map[chars[i]] + 1;
        }
        map[chars[i]] = i;
      }
      if ((i - 1 - b) > (end - begin)) {
        begin = b;
        end = i - 1;
      }
      return end - begin + 1;
    };

    var lengthOfLongestSubstring2 = function (s) {
      if (s == undefined || s == null || s == "") return 0;
      var chars = s.split("");
      var map = {};
      var begin = 0;
      var end = 0;
      var b = 0;
      var i;
      for (i = 0; i < chars.length; i++) {
        if (map.hasOwnProperty(chars[i]) && map[chars[i]] >= b) {
          b = map[chars[i]] + 1;
        }
        map[chars[i]] = i;
        if ((i - b) > (end - begin)) {
          begin = b;
          end = i;
        }
      }
      return end - begin + 1;
    };

    var test = function (s, answer) {
      var l = lengthOfLongestSubstring(s);
      var l2 = lengthOfLongestSubstring2(s);
      expect(l).toEqual(answer);
      expect(l2).toEqual(answer);
    };

    test("", 0);
    test("a", 1);
    test("aa", 1);
    test("ab", 2);
    test("aaa", 1);
    test("aba", 2);
    test("aab", 2);
    test("baa", 2);
    test("abc", 3);
    test("abab", 2);
    test("abba", 2);
    test("abcabc", 3);
    test("abccba", 3);
    test("abcabcbb", 3);
    test("bbbbb", 1);
    test("pwwkew", 3);
    test("aabbccdd", 2);
    test("abcdabcd", 4);
  });

  it("Median of Two Sorted Arrays", function () {

    var findMedianSortedArrays = function (nums1, nums2) {
      var as;
      var al;
      if (nums1.length < nums2.length) {
        as = nums1;
        al = nums2;
      } else {
        as = nums2;
        al = nums1;
      }
      // +--------------------+-+------------------------+
      // 0          as.length-1 as.length                as.length+al.length-1
      var l = 0;
      var h = as.length + al.length - 1;
      var m = Math.floor((l + h) / 2); // lower median index
      // m == as.length-1, if both arrays have the same length
      // as.length <= m < as.length + al.length - 1, otherwise
      var hasOneMedian = (((h + 1) % 2) == 1);

      if (as.length == 0) {
        if (hasOneMedian) {
          return al[m];
        } else {
          return (al[m] + al[m + 1]) / 2;
        }
      }

      var median = function (a1, i, a2, j, unique) {
        // assume a1[i] <= a2[j]
        // a1[i] is a potential median
        if (unique) return a1[i];
        else if (i + 1 < a1.length) {
          return (a1[i] + Math.min(a1[i + 1], a2[j])) / 2;
        } else {
          return (a1[i] + a2[j]) / 2;
        }
      }

      var ls = 0;
      var hs = as.length - 1;
      while (ls <= hs) {
        var ms = Math.floor((ls + hs) / 2); // lower median index in [ls, hs] in as
        var ml = m - ms - 1; // ms + 1 + ml + 1 == m + 1
        // ml == -1, if m == ms, i.e., ms = as.length - 1 && m = as.length - 1
        // 0 <= ml <= m - 1, otherwise.
        // ms could be as.length - 1
        // ml could never be al.length - 1
        if (ml == -1) {
          return (as[as.length - 1] + al[0]) / 2;
        }
        if (as[ms] < al[ml]) {
          if (ms == as.length - 1) {
            if (hasOneMedian) return al[ml];
            else return (al[ml] + al[ml + 1]) / 2;
          }
          if (as[ms + 1] < al[ml]) {
            if (ms < hs) { // ls <= ms < hs
              ls = ms + 1;
            } else { // ls == ms == hs, as[ms] <= as[ms + 1] < al[ml]
              return median(as, ms + 1, al, ml, hasOneMedian);
            }
          } else { // as[ms] < al[ml] <= as[ms + 1]
            return median(al, ml, as, ms + 1, hasOneMedian);
          }
        } else if (as[ms] > al[ml]) {
          if (as[ms] > al[ml + 1]) {
            if (ls < ms) { // ls < ms < hs
              hs = ms - 1;
            } else { // ls == ms <= hs, al[ml] <= al[ml + 1] < as[ms]
              return median(al, ml + 1, as, ms, hasOneMedian);
            }
          } else { // al[ml] < as[ms] <= al[ml + 1]
            return median(as, ms, al, ml + 1, hasOneMedian);
          }
        } else { // as[ms] == al[ml]
          return median(as, ms, al, ml + 1, hasOneMedian);
        }
      }
    };

    // Second version of findMedianSortedArrays
    var findMedianSortedArrays_2 = function (nums1, nums2) {
      var as;
      var al;
      if (nums1.length < nums2.length) {
        as = nums1;
        al = nums2;
      } else {
        as = nums2;
        al = nums1;
      }
      // +--------------------+-+------------------------+
      // 0          as.length-1 as.length                as.length+al.length-1
      var l = 0;
      var h = as.length + al.length - 1;
      var m = Math.floor((l + h) / 2); // lower median index
      // m == as.length-1, if both arrays have the same length
      // as.length <= m < as.length + al.length - 1, otherwise
      var hasOneMedian = (((h + 1) % 2) == 1);

      var median = function (a1, i, a2, j, unique) {
        // assume a1[i] <= a2[j]
        // a1[i] is a potential median
        if (unique) return a1[i];
        else if (i + 1 < a1.length) {
          return (a1[i] + Math.min(a2[j], a1[i + 1])) / 2;
        } else {
          return (a1[i] + a2[j]) / 2;
        }
      }

      var ls = 0;
      var hs = as.length - 1;
      while (ls <= hs) {
        var ms = Math.floor((ls + hs) / 2); // lower median index in [ls, hs] in as
        var ml = m - ms - 1; // ms + 1 + ml + 1 == m + 1
        // ml == -1, if m == ms, i.e., ms = as.length - 1 && m = as.length - 1
        // ml >= 0, otherwise.
        if (ms < hs) { // ls <= ms < hs
          if (as[ms] < al[ml]) {
            if (as[ms + 1] < al[ml]) {
              ls = ms + 1;
            } else { // as[ms] < al[ml] <= as[ms + 1]
              return median(al, ml, as, ms + 1, hasOneMedian);
            }
          } else if (as[ms] > al[ml]) {
            if (as[ms] > al[ml + 1]) {
              if (ls < ms) {
                hs = ms - 1;
              } else { // al[ml] <= al[ml + 1] < as[ms]
                return median(al, ml + 1, as, ms, hasOneMedian);
              }
            } else { // al[ml] < as[ms] <= al[ml + 1]
              return median(as, ms, al, ml + 1, hasOneMedian);
            }
          } else { // as[ms] == al[ml]
            return median(as, ms, al, ml + 1, hasOneMedian);
          }
        } else { // ls == ms == hs
          if (ml == -1) {
            return (as[ms] + al[0]) / 2;
          } else if (as[ms] < al[ml]) {
            if (ms == as.length - 1) {
              if (hasOneMedian) return al[ml];
              else return (al[ml] + al[ml + 1]) / 2;
            } else if (as[ms + 1] < al[ml]) { // as[ms] <= as[ms + 1] < al[ml]
              return median(as, ms + 1, al, ml, hasOneMedian);
            } else { // as[ms] < al[ml] <= as[ms + 1]
              return median(al, ml, as, ms + 1, hasOneMedian);
            }
          } else if (as[ms] > al[ml]) {
            if (as[ms] > al[ml + 1]) { // al[ml] <= al[ml + 1] < as[ms]
              return median(al, ml + 1, as, ms, hasOneMedian);
            } else { // al[ml] < as[ms] <= al[ml + 1]
              return median(as, ms, al, ml + 1, hasOneMedian);
            }
          } else { // as[ms] == al[ml]
            return median(as, ms, al, ml + 1, hasOneMedian);
          }
        }
      }
    };

    // This is the first version of findMedianSortedArrays
    var findMedianSortedArrays_1 = function (nums1, nums2) {
      var as;
      var al;
      if (nums1.length < nums2.length) {
        as = nums1;
        al = nums2;
      } else {
        as = nums2;
        al = nums1;
      }
      // +--------------------+-+------------------------+
      // 0          as.length-1 as.length                as.length+al.length-1
      var l = 0;
      var h = as.length + al.length - 1;
      var m = Math.floor((l + h) / 2); // lower median index
      // m == as.length-1, if both arrays have the same length
      // as.length <= m < as.length + al.length - 1, otherwise
      var hasOneMedian = (((h + 1) % 2) == 1);
      var ls = 0;
      var hs = as.length - 1;
      while (ls <= hs) {
        var ms = Math.floor((ls + hs) / 2); // lower median index in [ls, hs] in as
        var ml = m - ms - 1; // ms + 1 + ml + 1 == m + 1
        // ml == -1, if m == ms, i.e., ms = as.length - 1 && m = as.length - 1
        // ml >= 0, otherwise.
        if (ls < ms) { // ls < ms < hs
          if (as[ms] < al[ml]) {
            if (as[ms + 1] < al[ml]) {
              ls = ms + 1;
            } else {
              if (hasOneMedian) return al[ml];
              else return (al[ml] + Math.min(as[ms + 1], al[ml + 1])) / 2;
            }
          } else if ([as[ms] > al[ml]]) {
            if (as[ms] > al[ml + 1]) {
              hs = ms - 1;
            } else {
              if (hasOneMedian) return as[ms];
              else return (as[ms] + Math.min(as[ms + 1], al[ml + 1])) / 2;
            }
          } else {
            if (hasOneMedian) return as[ms];
            else return (as[ms] + Math.min(as[ms + 1], al[ml + 1])) / 2;
          }
        } else if (ms < hs) { // ls == ms < hs
          if (as[ms] < al[ml]) {
            if (as[ms + 1] < al[ml]) {
              ls = ms + 1;
            } else {
              if (hasOneMedian) return al[ml];
              else return (al[ml] + Math.min(as[ms + 1], al[ml + 1])) / 2;
            }
          } else if (as[ms] > al[ml]) {
            if (as[ms] > al[ml + 1]) {
              if (hasOneMedian) return al[ml + 1];
              else {
                if (ml + 2 < al.length) {
                  return (al[ml + 1] + Math.min(as[ms], al[ml + 2])) / 2;
                } else {
                  return (al[ml + 1] + as[ms]) / 2;
                }
              }
            } else {
              if (hasOneMedian) return as[ms];
              else return (as[ms] + Math.min(as[ms + 1], al[ml + 1])) / 2;
            }
          } else {
            if (hasOneMedian) return as[ms];
            else return (as[ms] + Math.min(as[ms + 1], al[ml + 1])) / 2;
          }
        } else { // ls == ms == hs
          if (ml == -1) {
            return (as[ms] + al[0]) / 2;
          } else if (ms == as.length - 1) {
            if (as[ms] < al[ml]) {
              if (hasOneMedian) return al[ml];
              else return (al[ml] + al[ml + 1]) / 2;
            } else if (as[ms] > al[ml]) {
              if (as[ms] > al[ml + 1]) {
                if (hasOneMedian) return al[ml + 1];
                else {
                  if (ml + 2 < al.length) {
                    return (al[ml + 1] + Math.min(as[ms], al[ml + 2])) / 2;
                  } else {
                    return (al[ml + 1] + as[ms]) / 2;
                  }
                }
              } else {
                if (hasOneMedian) return as[ms];
                else return (as[ms] + al[ml + 1]) / 2;
              }
            } else {
              if (hasOneMedian) return as[ms];
              else return (as[ms] + al[ml + 1]) / 2;
            }
          } else if (as[ms] < al[ml]) {
            if (as[ms + 1] < al[ml]) {
              if (hasOneMedian) return as[ms + 1];
              else {
                if (ms + 2 < as.length) {
                  return (as[ms + 1] + Math.min(as[ms + 2], al[ml])) / 2;
                } else {
                  return (as[ms + 1] + al[ml]) / 2;
                }
              }
            } else {
              if (hasOneMedian) return al[ml];
              else return (al[ml] + Math.min(as[ms + 1], al[ml + 1])) / 2;
            }
          } else if (as[ms] > al[ml]) {
            if (as[ms] > al[ml + 1]) {
              if (hasOneMedian) return al[ml + 1];
              else {
                if (ml + 2 < al.length) {
                  return (al[ml + 1] + Math.min(as[ms], al[ml + 2])) / 2;
                } else {
                  return (al[ml + 1] + as[ms]) / 2;
                }
              }
            } else {
              if (hasOneMedian) return as[ms];
              else return (as[ms] + Math.min(as[ms + 1], al[ml + 1])) / 2;
            }
          } else {
            if (hasOneMedian) return as[ms];
            else return (as[ms] + Math.min(as[ms + 1], al[ml + 1])) / 2;
          }
        }
      }
    };

    var findMedianSortedArrays2 = function (nums1, nums2) {
      var l = 0;
      var h = nums1.length + nums2.length - 1;
      var m = Math.floor((l + h) / 2); // lower median index
      if (m == 0) {
        return (nums1[0] + nums2[0]) / 2;
      }

      var median = function (a1, i, a2, j, unique) {
        // assume a2[j - 1] <= a1[i]
        // a1[i] is a potential medain
        // Need to compare following numbers
        //  a2[j], a2[j+1]
        //  a1[i], a1[i+1]
        if (unique) {
          if (j == a2.length || a2[j] >= a1[i]) return a1[i];
          else return a2[j];
        } else {
          if (j == a2.length) return (a1[i] + a1[i + 1]) / 2;
          else if (i == a1.length - 1) {
            if (a1[i] <= a2[j]) return (a1[i] + a2[j]) / 2;
            else if (j + 1 == a2.length) return (a2[j] + a1[i]) / 2;
            else return (a2[j] + Math.min(a2[j + 1], a1[i])) / 2;
          } else {
            if (a1[i] <= a2[j]) return (a1[i] + Math.min(a1[i + 1], a2[j])) / 2;
            else if (j + 1 == a2.length) return (a2[j] + a1[i]) / 2;
            else return (a2[j] + Math.min(a2[j + 1], a1[i])) / 2;
          }
        }
      };

      var hasOneMedian = (((h + 1) % 2) == 1);
      var i = 0;
      var j = 0;
      while (i < nums1.length || j < nums2.length) {
        if (nums1[i] < nums2[j]) {
          if (i + j == m - 1) {
            return median(nums2, j, nums1, i + 1, hasOneMedian);
          } else if (i < nums1.length - 1) {
            i++;
          } else {
            j++;
          }
        } else { // nums1[i] >= nums2[j]
          if (i + j == m - 1) {
            return median(nums1, i, nums2, j + 1, hasOneMedian);
          } else if (j < nums2.length - 1) {
            j++;
          } else {
            i++;
          }
        }
      }
    };

    // First version of findMedianSortedArrays2
    var findMedianSortedArrays2_1 = function (nums1, nums2) {
      var l = 0;
      var h = nums1.length + nums2.length - 1;
      var m = Math.floor((l + h) / 2); // lower median index
      if (m == 0) {
        return (nums1[0] + nums2[0]) / 2;
      }
      var hasOneMedian = (((h + 1) % 2) == 1);
      var i = 0;
      var j = 0;
      while (i < nums1.length || j < nums2.length) {
        if (nums1[i] < nums2[j]) {
          if (i + j == m - 1) {
            if (hasOneMedian) {
              if (i == nums1.length - 1 || nums1[i + 1] >= nums2[j]) {
                return nums2[j];
              } else {
                return nums1[i + 1];
              }
            } else {
              if (i == nums1.length - 1) {
                return (nums2[j] + nums2[j + 1]) / 2;
              } else if (j == nums2.length - 1) {
                if (nums2[j] <= nums1[i + 1]) {
                  return (nums2[j] + nums1[i + 1]) / 2;
                } else {
                  if (i + 2 < nums1.length) {
                    return (nums1[i + 1] + Math.min(nums1[i + 2], nums2[j])) / 2;
                  } else {
                    return (nums1[i + 1] + nums2[j]) / 2;
                  }
                }
              } else {
                if (nums2[j] <= nums1[i + 1]) {
                  return (nums2[j] + Math.min(nums1[i + 1], nums2[j + 1])) / 2;
                } else {
                  if (i + 2 < nums1.length) {
                    return (nums1[i + 1] + Math.min(nums1[i + 2], nums2[j])) / 2;
                  } else {
                    return (nums1[i + 1] + nums2[j]) / 2;
                  }
                }
              }
            }
          } else if (i < nums1.length - 1) {
            i++;
          } else {
            j++;
          }
        } else { // nums1[i] >= nums2[j]
          if (i + j == m - 1) {
            if (hasOneMedian) {
              if (j == nums2.length - 1 || nums1[i] <= nums2[j + 1]) {
                return nums1[i];
              } else {
                return nums2[j + 1];
              }
            } else {
              if (i == nums1.length - 1) {
                if (nums1[i] <= nums2[j + 1]) {
                  return (nums1[i] + nums2[j + 1]) / 2;
                } else {
                  if (j + 2 < nums2.length) {
                    return (nums2[j + 1] + Math.min(nums1[i], nums2[j + 2])) / 2;
                  } else {
                    return (nums2[j + 1] + nums1[i]) / 2;
                  }
                }
              } else if (j == nums2.length - 1) {
                return (nums1[i] + nums1[i + 1]) / 2;
              } else {
                if (nums1[i] <= nums2[j + 1]) {
                  return (nums1[i] + Math.min(nums1[i + 1], nums2[j + 1])) / 2;
                } else {
                  if (j + 2 < nums2.length) {
                    return (nums2[j + 1] + Math.min(nums1[i], nums2[j + 2])) / 2;
                  } else {
                    return (nums2[j + 1] + nums1[i]) / 2;
                  }
                }
              }
            }
          } else if (j < nums2.length - 1) {
            j++;
          } else {
            i++;
          }
        }
      }
    };

    var findMedianSortedArrays3 = function (nums1, nums2) {
      var a = nums1.concat(nums2);
      a.sort(function (x, y) { return x - y; });
      var m = Math.floor((a.length - 1) / 2);
      if (a.length % 2 == 1) {
        return a[m];
      } else {
        return (a[m] + a[m + 1]) / 2;
      }
    };

    var findMedianSortedArrays4 = function (nums1, nums2) {
      var medianOddOdd = function (a1, l1, m1, h1, a2, l2, m2, h2) {
        // a1[m1] <= a2[m2]
        //               m1 m1+1 m1+2
        //     m2-2 m2-1 m2
        if (l1 == m1 && m1 == h1) {
          if (l2 == m2) { // l2 == m2 <= h2
            return (a1[m1] + a2[m2]) / 2;
          } else { // l2 < m2 && m2 < h2
            return (Math.max(a1[m1], a2[m2 - 1]) + a2[m2]) / 2;
          }
        } else if (l1 == m1 && m1 < h1) {
          if (l2 == m2) { // l2 == m2 <= h2
            return (a1[m1] + Math.min(a1[m1 + 1], a2[m2])) / 2;
          } else { // l2 < m2 && m2 < h2
            if (a1[m1 + 1] >= a2[m2]) {
              return (Math.max(a1[m1], a2[m2 - 1]) + a2[m2]) / 2;
            } else { // a1[m1 + 1] < a2[m2]
              //throw "l1:m1:h1 = " + l1 + ":" + m1 + ":" + h1 + ", l2:m2:h2 = " + l2 + ":" + m2 + ":" + h2;
              l1 = m1 + 1;
              h2 = h2 - 1;
            }
          }
        } else { // l1 < m1 && m1 < h1
          if (l2 == m2 && m2 == h2) {
            return (a1[m1] + a2[m2]) / 2;
          } else if (l2 == m2 && m2 < h2) {
            return (a1[m1] + Math.min(a1[m1 + 1], a2[m2])) / 2;
          } else { // l2 < m2 && m2 < h2
            if (a1[m1 + 1] >= a2[m2]) {
              return (Math.max(a1[m1], a2[m2 - 1]) + a2[m2]) / 2;
            } else { // a1[m1 + 1] < a2[m2]
              var d = Math.min(m1 - l1, h2 - m2);
              l1 = l1 + d + 1;
              h2 = h2 - d - 1;
            }
          }
        }
      };

      var medianEvenEven = function (a1, l1, lm1, hm1, h1, a2, l2, lm2, hm2, h2) {
        // a1[lm1] <= a2[lm2]
        //               lm1 hm1 hm1+1
        //   lm2-2 lm2-1 lm2 hm2 hm2+1
        if (l1 == lm1 && hm1 == h1) {
          if (a1[hm1] >= a2[lm2]) {
            return (a2[lm2] + Math.min(a1[hm1], a2[hm2])) / 2;
          } else {
            return (a1[hm1] + a2[lm2]) / 2;
          }
        } else { // l1 < lm1 && hm1 < h1
          if (l2 == lm2 && hm2 == h2) {
            if (a1[hm1] >= a2[lm2]) {
              return (a2[lm2] + Math.min(a1[hm1], a2[hm2])) / 2;
            } else {
              return (a1[hm1] + Math.min(a1[hm1 + 1], a2[lm2])) / 2;
            }
          } else { // l2 < lm2 && hm2 < h2
            if (a1[hm1] >= a2[lm2]) {
              return (a2[lm2] + Math.min(a1[hm1], a2[hm2])) / 2;
            } else {
              if (a1[hm1 + 1] >= a2[lm2]) {
                return (Math.max(a1[hm1], a2[lm2 - 1]) + a2[lm2]) / 2;
              } else {
                var d = Math.min(lm1 - l1, h2 - hm2);
                l1 = l1 + d + 1;
                h2 = h2 - d - 1;
              }
            }
          }
        }
      };

      var medianOddEven = function (a1, l1, m1, h1, a2, l2, lm2, hm2, h2) {
        //               m1 m1+1 m1+2
        //  lm2-2 lm2-1 lm2 hm2 hm2+1
        if (l1 == m1 && m1 == h1) {
          if (a1[m1] <= a2[lm2]) {
            return a2[lm2];
          } else { // a1[m1] >= a2[hm2]
            return a2[hm2];
          }
        } else if (l1 == m1 && m1 < h1) {
          if (a1[m1] <= a2[lm2]) {
            if (a1[m1 + 1] >= a2[lm2]) {
              return a2[lm2];
            } else {
              if (l2 == lm2) {
                return a1[m1 + 1];
              } else { // l2 < lm2
                l1 = m1 + 1;
                h2 = h2 - 1;
              }
            }
          } else { // a1[m1] > a2[lm2]
            return a2[hm2];
          }
        } else { // l1 < m1 && m1 < h1
          if (a1[m1] <= a2[lm2]) {
            if (a1[m1 + 1] >= a2[lm2]) {
              return a2[lm2];
            } else {
              var d = Math.min(m1 - l1, h2 - hm2);
              l1 = l1 + d + 1;
              h2 = h2 - d - 1;
            }
          } else { // a1[m1] > a2[lm2]
            if (a1[m1 - 1] <= a2[hm2]) {
              return a2[hm2];
            } else {
              var d = Math.min(h1 - m1, lm2 - l2);
              h1 = h1 - d - 1;
              l2 = l2 + d + 1;
            }
          }
        }
      };

      var l1 = 0;
      var h1 = nums1.length - 1;
      var l2 = 0;
      var h2 = nums2.length - 1;
      while (l1 <= h1 && l2 <= h2) {
        var lm1 = Math.floor((l1 + h1) / 2);
        var hm1 = Math.ceil((l1 + h1) / 2);
        var lm2 = Math.floor((l2 + h2) / 2);
        var hm2 = Math.ceil((l2 + h2) / 2);
        if (lm1 == hm1 && lm2 == hm2) {
          if (nums1[lm1] <= nums2[lm2]) {
            if (lm1 < h1 && l2 < lm2 && nums1[lm1 + 1] < nums2[lm2]) {
              var d = Math.min(lm1 - l1, h2 - lm2);
              l1 = l1 + d + 1;
              h2 = h2 - d - 1;
            } else {
              return medianOddOdd(nums1, l1, lm1, h1, nums2, l2, lm2, h2);
            }
          } else {
            if (l1 < lm1 && lm2 < h2 && nums1[lm1] > nums2[lm2 + 1]) {
              var d = Math.min(h1 - lm1, lm2 - l2);
              h1 = h1 - d - 1;
              l2 = l2 + d + 1;
            } else {
              return medianOddOdd(nums2, l2, lm2, h2, nums1, l1, lm1, h1);
            }
          }
        } else if (lm1 < hm1 && lm2 < hm2) {
          if (nums1[lm1] <= nums2[lm2]) {
            if (l1 < lm1 && hm2 < h2 && nums1[lm1 + 1] < nums2[lm2]) {
              var d = Math.min(lm1 - l1, h2 - hm2);
              l1 = l1 + d + 1;
              h2 = h2 - d - 1;
            } else {
              return medianEvenEven(nums1, l1, lm1, hm1, h1, nums2, l2, lm2, hm2, h2);
            }
          } else {
            if (l2 < lm2 && hm1 < h1 && nums1[lm1] > nums2[lm2 + 1]) {
              var d = Math.min(h1 - hm1, lm2 - l2);
              h1 = h1 - d - 1;
              l2 = l2 + d + 1;
            } else {
              return medianEvenEven(nums2, l2, lm2, hm2, h2, nums1, l1, lm1, hm1, h1);
            }
          }
        } else if (lm1 == hm1 && lm2 < hm2) {

        } else if (lm1 < hm1 && lm2 == hm2) {

        }

      }
    };

    var test = function (nums1, nums2, answer) {
      var median = findMedianSortedArrays(nums1, nums2);
      var median2 = findMedianSortedArrays2(nums1, nums2);
      var median3 = findMedianSortedArrays3(nums1, nums2);
      if (median != answer ||
        median2 != answer ||
        median3 != answer) {
        console.log(nums1);
        console.log(nums2);
        console.log(median + " : " + median2 + " : " + median3);
      }
      expect(median).toEqual(answer);
      expect(median2).toEqual(answer);
      expect(median3).toEqual(answer);
    };

    var test2 = function (nums1, nums2) {
      var median = findMedianSortedArrays(nums1, nums2);
      var median2 = findMedianSortedArrays2(nums1, nums2);
      var median3 = findMedianSortedArrays3(nums1, nums2);
      if (median != median2 ||
        median != median3) {
        console.log(nums1);
        console.log(nums2);
        console.log(median + " : " + median2 + " : " + median3);
      }
      expect(median).toEqual(median2);
      expect(median).toEqual(median3);
    };

    test([1], [1], 1);
    test([1], [2], 1.5);
    test([3], [2], 2.5);

    test([1], [2, 3], 2);
    test([2], [1, 3], 2);
    test([1, 2], [3], 2);
    test([2], [2, 3], 2);
    test([2, 2], [3], 2);
    test([2, 2], [2], 2);

    test([1], [2, 3, 4], 2.5);
    test([2], [1, 3, 4], 2.5);
    test([3], [1, 2, 4], 2.5);
    test([1, 2], [3, 4], 2.5);
    test([3, 4], [1, 2], 2.5);
    test([1, 3], [2, 4], 2.5);
    test([2, 4], [1, 3], 2.5);
    test([1, 4], [2, 3], 2.5);
    test([2, 3], [1, 4], 2.5);

    test([1], [2, 3, 4, 5, 6, 7, 8], 4.5);
    test([1], [2, 3, 4, 5, 6, 7, 8, 9], 5);
    test([1, 2], [3, 4, 5], 3);
    test([1, 2], [3, 4, 5, 6, 7, 8, 9, 10], 5.5);
    test([1, 2], [3, 4, 5, 6, 7, 8, 9, 10, 11], 6);
    test([1, 2, 5, 6], [3, 4], 3.5);
    test([1, 2, 3, 6, 7], [4, 5], 4);
    test([1, 2, 3], [4, 5, 6, 7, 8, 9, 10, 11, 12], 6.5);
    test([1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 8.5);
    test([1, 2, 3], [4, 5, 6], 3.5);
    test([1, 2, 4], [3, 5, 6], 3.5);
    test([1, 4], [2, 3, 5, 6], 3.5);
    test([6], [7, 7], 7);
    test([6, 7], [7, 7, 8, 9], 7);
    test([6, 7], [7, 8, 9, 10], 7.5);
    test([6, 7], [8, 8, 9, 10], 8);

    var i;
    var compare = function (x, y) { return x - y; };
    for (i = 0; i < 10000; i++) {
      var a1 = randomArrayNotEmpty();
      var a2 = randomArrayNotEmpty();
      a1.sort(compare);
      a2.sort(compare);
      test2(a1, a2);
    }

  });

  it("Longest Palindromic Substring", function () {
    var longestPalindrome1 = function (s) {
      var map = {};
      var begin = 0;
      var end = 0;

      var isParlindrom = function (i, j) {
        if (map.hasOwnProperty(i) && map[i].hasOwnProperty(j)) {
          return true;
        }
        var is = false;
        if (i == j) {
          is = true;
        } else if (i + 1 == j) {
          is = (s.charAt(i) == s.charAt(j));
        } else if (s.charAt(i) == s.charAt(j) && isParlindrom(i + 1, j - 1)) {
          is = true;
        } else {
          isParlindrom(i, j - 1);
          isParlindrom(i + 1, j);
        }
        if (is) {
          if (!map.hasOwnProperty(i)) {
            map[i] = {};
          }
          map[i][j] = true;
          if (j - i > end - begin) {
            begin = i;
            end = j;
          }
        }
        return is;
      };

      isParlindrom(0, s.length - 1);
      return s.substring(begin, end + 1);
    };

    var longestPalindrome2 = function (s) {
      var begin = 0;
      var end = 0;

      var expand = function (i, j) {
        while (0 <= i && j <= s.length - 1 && s.charAt(i) == s.charAt(j)) {
          i--;
          j++;
        }
        if (j - i - 1 > end - begin + 1) {
          begin = i + 1;
          end = j - 1;
        }
      };

      var i = 0;
      for (i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
      }

      return s.substring(begin, end + 1);
    };

    var test1 = function (s, ans) {
      var p1 = longestPalindrome1(s);
      var p2 = longestPalindrome2(s);
      expect(p1).toEqual(ans);
      expect(p2).toEqual(ans);
    };

    test1("a", "a");
    test1("aa", "aa");
    test1("ab", "a");
    test1("abc", "a");
    test1("aba", "aba");
    test1("aab", "aa");
    test1("abb", "bb");
    test1("aaa", "aaa");
    test1("abab", "aba");
    test1("abba", "abba");
    test1("abca", "a");
    test1("aaab", "aaa");
    test1("aaba", "aba");
    test1("abaa", "aba");
    test1("baaa", "aaa");

    var test2 = function (s) {
      console.log("Input: " + s);
      var p1 = longestPalindrome1(s);
      var p2 = longestPalindrome2(s);
      console.log("p1: " + p1 + "\np2: " + p2);
      expect(p1).toEqual(p2);
    };

    for (var i = 0; i < 100; i++) {
      var s = randomString();
      test2(s);
    }
  });

  it("ZigZag Conversion", function () {
    var convert = function (s, numRows) {
      if (s == "") return s;
      if (numRows == 1) return s;
      var z = "";
      var d = 2 * numRows - 2;
      var i = 0;
      for (i = 0; i < numRows; i++) {
        var j = 0;
        while (j < s.length) {
          var p = j + i;
          if (p < s.length) {
            z += s.charAt(p);
          }
          var q = j + d - i;
          if (q != p && q != j + d && q < s.length) {
            z += s.charAt(q);
          }
          j += d;
        }
      }
      return z;
    };

    var test = function (s, numRows, ans) {
      var z = convert(s, numRows);
      expect(z).toEqual(ans);
    };

    test("PAYPALISHIRING", 3, "PAHNAPLSIIGYIR");
    test("abcdefg", 1, "abcdefg");
    test("abcdefg", 2, "acegbdf");
    test("abcdefg", 3, "aebdfcg");
    test("abcdefg", 4, "agbfced");
    test("abcdefg", 5, "abcgdfe");
    test("abcdefg", 6, "abcdegf");
    test("abcdefg", 7, "abcdefg");
    test("abcdefg", 8, "abcdefg");
    test("abcdefg", 9, "abcdefg");
  });

  it("Reverse Integer", function () {
    var reverse = function (x) {
      var negative = false;
      if (x < 0) {
        negative = true;
        x = -x;
      }

      var y = 0;
      var d;
      while (x > 0) {
        d = x % 10;
        x = (x - d) / 10;
        if (!negative && (y > 214748364 || y == 214748364 && d > 7)) return 0
        if (negative && (y > 214748364 || y == 214748364 && d > 8)) return 0;
        y = y * 10 + d;
      }

      return negative ? -y : y;
    };

    var test = function (x, ans) {
      var y = reverse(x);
      expect(y).toEqual(ans);
    };

    test(123, 321);
    test(-123, -321);
    test(0, 0);
    test(1, 1);
    test(-1, -1);
    test(10, 1);
    test(-10, -1);
    test(2, 2);
    test(-2, -2);
    test(22, 22);
    test(-22, -22);
    test(7463847412, 2147483647);
    test(8463847412, 0);
    test(7563847412, 0);
    test(-8463847412, -2147483648);
    test(-9563847412, 0);
  });

  it("String to Integer (atoi)", function () {
    var atoi = function (str) {
      if (!str) return 0;

      var isDigit = function (c) {
        return ('0' <= c && c <= '9');
      };

      str = str.trim();

      var i = 0;
      if (i == str.length) return 0;

      var isNegative = false;
      var c = str.charAt(i);
      if (c == '+') {
        i++;
      } else if (c == '-') {
        i++;
        isNegative = true;
      }

      if (i == str.length) return 0;

      c = str.charAt(i);
      if (!isDigit(c)) return 0;

      var n = c - '0';
      i++;
      var d;
      while (i < str.length) {
        c = str.charAt(i);
        if (!isDigit(c)) break;
        d = c - '0';
        if (isNegative && (n > 214748364 || (n == 214748364 && d > 8))) {
          return -2147483648;
        } else if (!isNegative && (n > 214748364 || (n == 214748364 && d > 7))) {
          return 2147483647;
        }
        n = n * 10 + d;
        i++;
      }

      return (isNegative ? -n : n);
    };

    var test = function (str, ans) {
      var n = atoi(str);
      expect(n).toEqual(ans);
    };

    test(null, 0);
    test(undefined, 0);
    test("", 0);
    test(" ", 0);
    test("   ", 0);
    test("\t", 0);
    test("0", 0);
    test("  0  ", 0);
    test("1", 1);
    test("     1   ", 1);
    test("    1", 1);
    test("12345", 12345);
    test("  123345  ", 123345);
    test("+ 12", 0);
    test("+123", 123);
    test("- 35", 0);
    test("-353", -353);
    test("-2", -2);
    test("-2147483648", -2147483648);
    test("-2147483647", -2147483647);
    test("-2147483649", -2147483648);
    test("-2147483650", -2147483648);
    test("2147483647", 2147483647);
    test("2147483648", 2147483647);
    test("2147483646", 2147483646);
    test("2147483650", 2147483647);
    test("a12", 0);
    test("12x", 12);
  });

  it("Palindrome Number", function () {
    var isParlindrom = function (x) {
      if (x < 0) return false;
      var b = 1;
      while (b < x) {
        b *= 10;
      }
      b = Math.floor(b / 10);
      var h;
      var l;
      while (true) {
        if (b <= x && x < 10) break;
        h = x < b ? 0 : Math.floor(x / b);
        l = (x % 10);
        if (h != l) return false;
        x = Math.floor((x - (h * b) - l) / 10);
        b = Math.floor(b / 100);
      }
      return true;
    };

    var test = function (x, ans) {
      var r = isParlindrom(x);
      expect(r).toEqual(ans);
    };

    test(0, true);
    test(1, true);
    test(9, true);
    test(10, false);
    test(11, true);
    test(19, false);
    test(20, false);
    test(22, true);
    test(99, true);
    test(100, false);
    test(101, true);
    test(102, false);
    test(111, true);
    test(191, true);
    test(199, false);
    test(200, false);
    test(202, true);
    test(999, true);
    test(1000, false);
    test(1001, true);
    test(1010, false);
    test(1111, true);
    test(1221, true);
    test(9999, true);
    test(99999, true);
    test(1234321, true);
    test(12344321, true);
    test(1000021, false);
  });

  it("Regular Expression Matching", function () {
    var isMatch = function (s, p) {
      if (!s && !p) return true;
      if (!p) return false;
      if (!s && (p.length == 1 || p.charAt(1) != '*')) return false;
      if (s && (p.length == 1 || p.charAt(1) != '*')) {
        return (s.charAt(0) == p.charAt(0) || p.charAt(0) == '.')
          && isMatch(s.substring(1), p.substring(1));
      }
      var i = 0;
      while (i < s.length && (s.charAt(i) == p.charAt(0) || p.charAt(0) == '.')) {
        if (isMatch(s.substring(i), p.substring(2))) return true;
        i++;
      }
      return isMatch(s.substring(i), p.substring(2));
    };

    var test = function (s, p, ans) {
      var v = isMatch(s, p);
      console.log(s, v ? "==" : "!=", p);
      expect(v).toEqual(ans);
    };

    test("a", ".*..a*", false);
    test("aa", "a", false);
    test("aa", "aa", true);
    test("aaa", "aa", false);
    test("aa", "a*", true);
    test("aa", ".*", true);
    test("ab", ".*", true);
    test("aab", "c*a*b", true);
    test("a", "ab*", true);
    test("", "c*c*", true);
  });

  describe("Container with Most Water", function () {

    it("Container can be formed by any two lines", function () {
      var maxArea = function (height) {
        var area = 0;
        var l = 0;
        var r = height.length - 1;
        while (l < r) {
          area = Math.max(area, Math.min(height[l], height[r]) * (r - l));
          if (height[l] < height[r]) l++;
          else r--;
        }
        return area;
      };

      var maxArea2 = function (height) {
        var area = 0;
        var i, j;
        for (i = 0; i < height.length - 1; i++) {
          for (j = i + 1; j < height.length; j++) {
            area = Math.max(area, Math.min(height[i], height[j]) * (j - i));
          }
        }
        return area;
      };

      var test = function () {
        var i = 0;
        var length;
        var height;
        for (i = 0; i < 100; i++) {
          length = 2 + Math.floor(Math.random() * 50);
          height = randomArrayOfLength(length);
          var a = maxArea(height);
          var a2 = maxArea2(height);
          expect(a).toEqual(a2);
        };

        test();
      };
    });

    it("Container can be formed by two lines such that any lines in between are not longer than these two lines",
      function () {
        var maxArea = function (height) {
          var area = 0;
          var left, right;
          var lines = [];
          lines.push(0);
          var i;
          var top;
          var a;
          var l, r;
          for (i = 1; i < height.length; i++) {
            while (lines.length > 0 && height[lines[lines.length - 1]] < height[i]) {
              top = lines.pop();
            }
            if (lines.length == 0) {
              // [], 9
              a = (i - top) * height[top];
              l = top;
              r = i;
            } else if (height[lines[lines.length - 1]] == height[i]) {
              if (lines.length > 1) {
                if (height[lines[lines.length - 2]] == height[i]) {
                  // 9, 9], 9
                  lines.pop();
                }
                if (lines.length > 1) {
                  // 10. 9], 9
                  a = (i - lines[lines.length - 2]) * height[i];
                  l = lines[lines.length - 2];
                  r = i;
                } else {
                  // [9], 9
                  a = (i - lines[lines.length - 1]) * height[i];
                  l = lines[lines.length - 1];
                  r = i;
                }
              } else {
                // [9], 9
                a = (i - lines[lines.length - 1]) * height[i];
                l = lines[lines.length - 1];
                r = i;
              }
            } else {
              // 10], 9
              a = (i - lines[lines.length - 1]) * height[i];
              l = lines[lines.length - 1];
              r = i;
            }
            lines.push(i);
            if (area < a) {
              area = a;
              left = l;
              right = r;
            }
          }

          return area;
        };

        var maxArea2 = function (height) {
          var area = 0;
          var left, right;
          var i, j, k;
          var h;
          var a;
          var validContainer;
          for (i = 0; i < height.length - 1; i++) {
            for (j = i + 1; j < height.length; j++) {
              h = Math.min(height[i], height[j]);
              validContainer = true;
              for (k = i + 1; k < j; k++) {
                if (height[k] > h) {
                  validContainer = false;
                  break;
                }
              }
              if (validContainer == true) {
                a = h * (j - i);
                if (area < a) {
                  area = a;
                  left = i;
                  right = j;
                }
              }
            }
          }

          return area;
        };

        var test = function (height, ans) {
          var a = maxArea(height);
          var a2 = maxArea2(height);
          expect(a).toEqual(ans);
          expect(a2).toEqual(ans);
        };

        test([1, 2], 1);
        test([1, 1], 1);
        test([2, 1], 1);
        test([1, 2, 4], 2);
        test([5, 3, 2], 3);
        test([1, 2, 1], 1);
        test([1, 3, 2], 2);
        test([2, 3, 1], 2);
        test([2, 1, 3], 4);
        test([3, 1, 2], 4);
        test([2, 2, 3], 4);
        test([3, 2, 2], 4);
        test([2, 2, 2], 4);
        test([1, 2, 1, 2], 4);
        test([1, 2, 1, 3], 4);
        test([1, 3, 2, 3], 6);
        test([5, 3, 4, 2], 8);
        test([9, 9, 8], 9);

        var test2 = function () {
          var i = 0;
          var length;
          var height;
          for (i = 0; i < 1000; i++) {
            length = 2 + Math.floor(Math.random() * 50);
            height = randomArrayOfLength(length);
            var a = maxArea(height);
            var a2 = maxArea2(height);
            expect(a).toEqual(a2);
          }
        };

        test2();
      });
  });

  it("Container Water Volume", function () {
    // Given n non-negative integers a1, a2, ..., an,
    // where each represents a point at coordinate (i, ai).
    // n vertical lines are drawn such that the two endpoints
    // of line i is at (i, ai) and (i, 0). With these lines,
    // find the total volume of water can be contained.

    var totalVolume = function (height) {
      var search = function (l, r) {
        if (l == r) return 0;
        if (l + 1 == r) {
          return Math.min(height[l], height[r]);
        }
        var h1 = -1, h2 = -1;
        var i1, i2;
        var i;
        for (i = l; i <= r; i++) {
          if (height[i] > h1) {
            h1 = height[i];
            i1 = i;
            if (h1 > h2) {
              h1 = h2;
              i1 = i2;
              h2 = height[i];
              i2 = i;
            }
          }
        }
        var volume = Math.min(height[i1], height[i2]) * Math.abs(i1 - i2);
        volume += search(l, Math.min(i1, i2));
        volume += search(Math.max(i1, i2), r);
        return volume;
      };
      return search(0, height.length - 1);
    };

    var totalVolume2 = function (height) {
      var x = [];
      var i;
      for (i = 0; i < height.length; i++) {
        x.push(i);
      }
      var removedCount;
      do {
        removedCount = 0;
        i = 1;
        while (i < x.length - 1) {
          if (height[x[i - 1]] >= height[x[i]]
            && height[x[i]] <= height[x[i + 1]]) {
            x.splice(i, 1);
            removedCount++;
          }
          i++;
        }
      } while (removedCount > 0);
      var volume = 0;
      for (i = 0; i < x.length - 1; i++) {
        volume += (Math.min(height[x[i]], height[x[i + 1]]) * (x[i + 1] - x[i]));
      }
      return volume;
    };

    var totalVolume3 = function (height) {
      var x = [];
      var map = {};
      map[0] = 0;
      x.push(0);
      var i;
      var m = 0;
      var volume = 0;
      var v;
      for (i = 1; i < height.length; i++) {
        while (m < x[x.length - 1] && height[x[x.length - 1]] < height[i]) {
          var t = x.pop();
          v = map[t];
          delete map[t];
          volume -= v;
        }
        v = Math.min(height[x[x.length - 1]], height[i]) * (i - x[x.length - 1]);
        map[i] = v;
        x.push(i);
        volume += v;
        if (height[i] >= height[m]) {
          m = i;
        }
      }
      return volume;
    };

    var test = function (height, ans) {
      var v = totalVolume(height);
      var v2 = totalVolume2(height);
      var v3 = totalVolume3(height);
      console.log(height);
      console.log(v, v2, v3);
      expect(v).toEqual(ans);
      expect(v2).toEqual(ans);
      expect(v3).toEqual(ans);
    };

    test([1, 1], 1);
    test([1, 2], 1);
    test([2, 1], 1);
    test([2, 2], 2);
    test([2, 2, 2], 4);
    test([2, 3, 2], 4);
    test([2, 1, 2], 4);
    test([1, 2, 2], 3);
    test([2, 2, 1], 3);
    test([1, 2, 3, 4], 6);
    test([4, 3, 2, 1], 6);
    test([1, 3, 2, 4], 7);
    test([1, 4, 3, 2], 6);
    test([1, 3, 4, 2], 6);
    test([1, 2, 4, 3], 6);
    test([1, 4, 2, 3], 7);
    test([2, 2, 2, 2], 6);
    test([2, 3, 2, 2], 6);
    test([2, 3, 2, 3], 8);
    test([3, 2, 3, 2], 8);
    test([3, 2, 2, 3], 9);

    var test2 = function () {
      for (var i = 0; i < 100; i++) {
        var length = 2 + Math.floor(Math.random() * 100);
        var height = randomArrayOfLengthMinMax(length, 0, 100);
        var v = totalVolume(height);
        var v2 = totalVolume2(height);
        var v3 = totalVolume3(height);
        console.log(height);
        console.log(v, v2, v3);
        expect(v).toEqual(v2);
        expect(v).toEqual(v3);
      }
    };

    test2();
  });

  it("Integer to Roman", function () {
    var intToRoman = function (num) {
      var roman = "";
      var r;
      if (num >= 1000) {
        r = Math.floor(num / 1000);
        num = num - r * 1000;
        var i;
        for (i = 0; i < r; i++) roman += "M";
      }
      if (num >= 100) {
        r = Math.floor(num / 100);
        num = num - r * 100;
        switch (r) {
          case 9:
            roman += "CM";
            break;
          case 8:
            roman += "DCCC";
            break;
          case 7:
            roman += "DCC";
            break;
          case 6:
            roman += "DC";
            break;
          case 5:
            roman += "D";
            break;
          case 4:
            roman += "CD";
            break;
          case 3:
            roman += "CCC";
            break;
          case 2:
            roman += "CC";
            break;
          case 1:
            roman += "C";
            break;
        }
      }
      if (num >= 10) {
        r = Math.floor(num / 10);
        num = num - r * 10;
        switch (r) {
          case 9:
            roman += "XC";
            break;
          case 8:
            roman += "LXXX";
            break;
          case 7:
            roman += "LXX";
            break;
          case 6:
            roman += "LX";
            break;
          case 5:
            roman += "L";
            break;
          case 4:
            roman += "XL";
            break;
          case 3:
            roman += "XXX";
            break;
          case 2:
            roman += "XX";
            break;
          case 1:
            roman += "X";
            break;
        }
      }
      if (num >= 0) {
        r = Math.floor(num);
        switch (r) {
          case 9:
            roman += "IX";
            break;
          case 8:
            roman += "VIII";
            break;
          case 7:
            roman += "VII";
            break;
          case 6:
            roman += "VI";
            break;
          case 5:
            roman += "V";
            break;
          case 4:
            roman += "IV";
            break;
          case 3:
            roman += "III";
            break;
          case 2:
            roman += "II";
            break;
          case 1:
            roman += "I";
            break;
        }
      }
      return roman;
    };

    var intToRoman2 = function (num) {
      var roman = {
        1000: "M",
        900: "CM",
        800: "DCCC",
        700: "DCC",
        600: "DC",
        500: "D",
        400: "CD",
        300: "CCC",
        200: "CC",
        100: "C",
        90: "XC",
        80: "LXXX",
        70: "LXX",
        60: "LX",
        50: "L",
        40: "XL",
        30: "XXX",
        20: "XX",
        10: "X",
        9: "IX",
        8: "VIII",
        7: "VII",
        6: "VI",
        5: "V",
        4: "IV",
        3: "III",
        2: "II",
        1: "I"
      };

      var r = "";
      var b = Math.floor(num / 1000);
      for (var i = 0; i < b; i++) {
        r += "M";
      }
      num = num % 1000;
      b = 100;
      var x;
      while (num > 0 && b > 0) {
        if (num >= b) {
          x = num % b;
          r += roman[num - x];
          num = x;
        }
        // Must use Math.floor. Othewise it may be greater than 0 forever.
        b = Math.floor(b / 10);
      }

      return r;
    };

    var romanToInt = function (s) {
      var roman = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
      };
      var r = 0;
      var i = 0;
      while (i < s.length) {
        if (i + 1 < s.length
          && roman[s.charAt(i)] < roman[s.charAt(i + 1)]) {
          r += (roman[s.charAt(i + 1)] - roman[s.charAt(i)]);
          i += 2;
        } else {
          r += roman[s.charAt(i)];
          i++;
        }
      }
      return r;
    };

    var test = function (num, ans) {
      var r = intToRoman(num);
      var r2 = intToRoman2(num);
      var n = romanToInt(r);
      console.log(num, "->", r, r2, "->", n);
      expect(r).toEqual(ans);
      expect(r2).toEqual(ans);
      expect(n).toEqual(num);
    };

    {
      test(1, "I");
      test(2, "II");
      test(3, "III");
      test(4, "IV");
      test(5, "V");
      test(6, "VI");
      test(7, "VII");
      test(8, "VIII");
      test(9, "IX");
      test(10, "X");
      test(11, "XI");
      test(12, "XII");
      test(13, "XIII");
      test(14, "XIV");
      test(15, "XV");
      test(16, "XVI");
      test(17, "XVII");
      test(18, "XVIII");
      test(19, "XIX");
      test(20, "XX");
      test(21, "XXI");
      test(22, "XXII");
      test(23, "XXIII");
      test(24, "XXIV");
      test(25, "XXV");
      test(26, "XXVI");
      test(27, "XXVII");
      test(28, "XXVIII");
      test(29, "XXIX");
      test(30, "XXX");
      test(31, "XXXI");
      test(32, "XXXII");
      test(33, "XXXIII");
      test(34, "XXXIV");
      test(35, "XXXV");
      test(36, "XXXVI");
      test(37, "XXXVII");
      test(38, "XXXVIII");
      test(39, "XXXIX");
      test(40, "XL");
      test(41, "XLI");
      test(42, "XLII");
      test(43, "XLIII");
      test(44, "XLIV");
      test(45, "XLV");
      test(46, "XLVI");
      test(47, "XLVII");
      test(48, "XLVIII");
      test(49, "XLIX");
      test(50, "L");
      test(51, "LI");
      test(52, "LII");
      test(53, "LIII");
      test(54, "LIV");
      test(55, "LV");
      test(56, "LVI");
      test(57, "LVII");
      test(58, "LVIII");
      test(59, "LIX");
      test(60, "LX");
      test(61, "LXI");
      test(62, "LXII");
      test(63, "LXIII");
      test(64, "LXIV");
      test(65, "LXV");
      test(66, "LXVI");
      test(67, "LXVII");
      test(68, "LXVIII");
      test(69, "LXIX");
      test(70, "LXX");
      test(71, "LXXI");
      test(72, "LXXII");
      test(73, "LXXIII");
      test(74, "LXXIV");
      test(75, "LXXV");
      test(76, "LXXVI");
      test(77, "LXXVII");
      test(78, "LXXVIII");
      test(79, "LXXIX");
      test(80, "LXXX");
      test(81, "LXXXI");
      test(82, "LXXXII");
      test(83, "LXXXIII");
      test(84, "LXXXIV");
      test(85, "LXXXV");
      test(86, "LXXXVI");
      test(87, "LXXXVII");
      test(88, "LXXXVIII");
      test(89, "LXXXIX");
      test(90, "XC");
      test(91, "XCI");
      test(92, "XCII");
      test(93, "XCIII");
      test(94, "XCIV");
      test(95, "XCV");
      test(96, "XCVI");
      test(97, "XCVII");
      test(98, "XCVIII");
      test(99, "XCIX");
      test(100, "C");
      test(200, "CC");
      test(300, "CCC");
      test(400, "CD");
      test(500, "D");
      test(600, "DC");
      test(700, "DCC");
      test(800, "DCCC");
      test(900, "CM");
      test(1000, "M");
      test(2000, "MM");
      test(3000, "MMM");
      test(4000, "MMMM");
    }

    var test2 = function () {
      var i;
      var n;
      var r, r2;
      var m;
      for (i = 0; i < 1000; i++) {
        n = randomInt(1, 5000);
        r = intToRoman(n);
        r2 = intToRoman2(n);
        m = romanToInt(r);
        console.log(n, "->", r, r2, "->", m);
        expect(r).toEqual(r2);
        expect(n).toEqual(m);
      }
    };

    test2();
  });

  it("Longest Common Prefix", function () {
    var longestCommonPrefix = function (strs) {
      var p = "";
      if (!strs || strs.length == 0) return p;
      var i = 0;
      var j;
      var stop = false;
      var c;
      while (true) {
        if (!strs[0] || i == strs[0].length) break;
        c = strs[0].charAt(i);
        for (j = 1; j < strs.length; j++) {
          if (!strs[j]
            || i == strs[j].length
            || strs[j].charAt(i) != c) {
            stop = true;
            break;
          }
        }
        if (stop) break;
        else p += c;
        i++;
      }
      return p;
    };

    var longestCommonPrefix2 = function (strs) {
      var prefix = function (l, r) {
        if (l >= r) return strs[r];
        var m = l + Math.floor((r - l) / 2);
        var pl = prefix(l, m);
        var pr = prefix(m + 1, r);
        var i = 0;
        var p = ""
        if (pl && pr) {
          while (i < pl.length && i < pr.length) {
            if (pl[i] != pr[i]) break;
            p += pl[i];
            i++;
          }
        }
        return p;
      };

      if (!strs || strs.length == 0) return "";
      return prefix(0, strs.length - 1);
    };

    var test = function (strs, ans) {
      var p = longestCommonPrefix(strs);
      var p2 = longestCommonPrefix2(strs);
      expect(p).toEqual(ans);
      expect(p2).toEqual(ans);
    };

    {
      test([], "");
      test([""], "");
      test(["", ""], "");
      test(["", "", ""], "");
      test(["", "a"], "");
      test(["a", ""], "");
      test(["", "a", ""], "");
      test(["a", "a", "b", ""], "");
      test(["a"], "a");
      test(["a", "a"], "a");
      test(["a", "b"], "");
      test(["a", "a", "a"], "a");
      test(["a", "ab"], "a");
      test(["ab", "a"], "a");
      test(["abc", "abd"], "ab");
    }

    var test2 = function () {
      for (var i = 0; i < 100; i++) {
        var length = randomInt(1, 6);
        var strs = [];
        for (var j = 0; j < length; j++) {
          var s = randomStringOfLengthAndAlphabet(5, "ab");
          strs.push(s);
        }
        var p = longestCommonPrefix(strs);
        var p2 = longestCommonPrefix2(strs);
        console.log(strs, p, p2);
        expect(p).toEqual(p2);
      }
    };

    test2();
  });

  it("Letter Combinations of a Phone Number", function () {
    var letterCombinations = function (digits) {
      var map = {
        2: ['a', 'b', 'c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'i'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z']
      };
      var result = [];
      if (!digits || digits.length == 0) return result;
      var gen = function (str, index) {
        if (index == digits.length) {
          result.push(str);
          return;
        }
        var c = digits.charAt(index);
        if (map.hasOwnProperty(c)) {
          for (var i = 0; i < map[c].length; i++) {
            gen(str + map[c][i], index + 1);
          }
        } else {
          gen(str, index + 1);
        }
      };
      gen("", 0);
      return result;
    };

    var test = function (digits, ans) {
      var result = letterCombinations(digits);
      result.sort();
      ans.sort();
      console.log(result);
      console.log(ans);
      expect(result.length).toEqual(ans.length);
      for (var i = 0; i < result.length; i++) {
        expect(result[i]).toEqual(ans[i]);
      }
    };

    test("23", ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]);
  });

  it("Valid Parentheses", function () {
    var isValid = function (s) {
      if (!s) return true;
      var left = [];
      var i;
      var c;
      var map = {
        ')': '(',
        '}': '{',
        ']': '['
      };
      for (i = 0; i < s.length; i++) {
        c = s.charAt(i);
        switch (c) {
          case '(':
          case '{':
          case '[':
            left.push(c);
            break;
          case ')':
          case '}':
          case ']':
            if (left.length == 0) return false;
            if (left[left.length - 1] != map[c]) return false;
            left.pop();
            break;
        }
      }
      return left.length == 0;
    };

    var isValid2 = function (s) {
      if (!s) return true;
      var i = -1
      var j, k;
      var c;
      var map = {
        ')': '(',
        '}': '{',
        ']': '['
      };
      for (j = 0; j < s.length; j++) {
        c = s.charAt(j);
        switch (c) {
          case '(':
          case '{':
          case '[':
            i = j;
            break;
          case ')':
          case '}':
          case ']':
            if (i < 0) return false;
            if (s.charAt(i) != map[c]) return false;
            i--;
            while (i >= 0) {
              k = 0;
              while (i >= 0
                && (s.charAt(i) == ')' || s.charAt(i) == '}' || s.charAt(i) == ']')) {
                k++;
                i--;
              }
              if (k == 0) break;
              i -= k;
            }
            break;
        }
      }
      return i < 0;
    };

    var test = function (s, ans) {
      var v = isValid(s);
      var v2 = isValid2(s);
      expect(v).toEqual(ans);
      expect(v2).toEqual(ans);
    };

    test("[]", true);
    test("[[]", false);
    test("[]]", false);
    test('(]', false);

    var test2 = function () {
      var i;
      for (i = 0; i < 1000; i++) {
        var len = randomInt(0, 10);
        var s = randomStringOfLengthAndAlphabet(len, "(){}[]");
        var v = isValid(s);
        var v2 = isValid2(s);
        expect(v).toEqual(v2);
      }
    };

    test2();

    var test3 = function (s) {
      var p = permuteString(s);
      for (var i = 0; i < p.length; i++) {
        var v = isValid(p[i]);
        var v2 = isValid2(p[i]);
        expect(v).toEqual(v2);
      }
    };

    test3("(){}[]");
  });
});
