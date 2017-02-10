describe("leetcode", function(){

  var randomArrayOfLength = function(length){
    var a = [];
    var i;
    var v;
    for (i = 0; i < length; i++) {
      v = Math.floor(Math.random() * 10);
      a.push(v);
    }
    return a;
  };

  var randomArray = function(){
    var length = Math.floor(Math.random() * 100);
    return randomArrayOfLength(length);
  };

  var randomArrayNotEmpty = function(){
    var length = 1 + Math.floor(Math.random() * 100);
    return randomArrayOfLength(length);
  };

  var randomStringOfLength = function(length){
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var s = "";
    var i = 0;
    var index = 0;
    for (i = 0; i < length; i++) {
      index = Math.floor(Math.random() * alphabet.length);
      s += alphabet.charAt(index);
    }
    return s;
  };

  var randomString = function(){
    var length = 1 + Math.floor(Math.random() * 26);
    return randomStringOfLength(length);
  };

  it("Two Sum", function(){
    var twoSum = function(nums, target){
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

    var test = function(nums, target, answer) {
      var result = twoSum(nums, target);
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(answer[0]);
      expect(result[1]).toEqual(answer[1]);
    };

    test([1, 1], 2, [0, 1]);
    test([1, 2, 3], 3, [0, 1]);
    test([1, 2, 3], 4, [0, 2]);
    test([1, 2, 3], 5, [1, 2]);
  });

  it("Add Two Numbers", function(){
    function ListNode(val) {
      this.val = val;
      this.next = null;
    }

    // List head is the least significant digit
    // Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    // Output: 7 -> 0 -> 8
    var addTwoNumbers = function(l1, l2){
      var carry = 0;
      var list = null; // The head of the result list
      var current = null; // The current node of the result list
      var sum;
      while (l1 != null || l2 != null || carry != 0)  {
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
    var addTwoNumbers2 = function(l1, l2){
      var addTwoNumbersSameLength = function(ls1, ls2, ls){
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

      var add = function(la, ln) {
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
    var addTwoNumbers3 = function(l1, l2) {
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

    var arrayToList = function(a){
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

    var listToArray = function(l){
      var a = [];
      while (l != null) {
        a.push(l.val);
        l = l.next;
      }
      return a;
    };

    var test = function(a1, a2, answer){
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

    var testRandom = function(){
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

  it("Longest Substring Without Repeating Characters", function(){
    // Given a string, find the length of the longest substring without repeating
    // characters.
    // Examples:
    // Given "abcabcbb", the answer is "abc", which the length is 3.
    // Given "bbbbb", the answer is "b", with the length of 1.
    // Given "pwwkew", the answer is "wke", with the length of 3. Note that the
    // answer must be a substring, "pwke" is a subsequence and not a substring.

    var lengthOfLongestSubstring = function(s) {
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

    var lengthOfLongestSubstring2 = function(s) {
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

    var test = function(s, answer) {
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

  it("Median of Two Sorted Arrays", function(){

    var findMedianSortedArrays = function(nums1, nums2) {
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

      var median = function(a1, i, a2, j, unique) {
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
    var findMedianSortedArrays_2 = function(nums1, nums2) {
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

      var median = function(a1, i, a2, j, unique) {
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
    var findMedianSortedArrays_1 = function(nums1, nums2) {
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

    var findMedianSortedArrays2 = function(nums1, nums2) {
      var l = 0;
      var h = nums1.length + nums2.length - 1;
      var m = Math.floor((l + h) / 2); // lower median index
      if (m == 0) {
        return (nums1[0] + nums2[0]) / 2;
      }

      var median = function(a1, i, a2, j, unique) {
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
    var findMedianSortedArrays2_1 = function(nums1, nums2) {
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

    var findMedianSortedArrays3 = function(nums1, nums2) {
      var a = nums1.concat(nums2);
      a.sort(function(x, y) { return x - y; });
      var m = Math.floor((a.length - 1) / 2);
      if (a.length % 2 == 1) {
        return a[m];
      } else {
        return (a[m] + a[m + 1]) / 2;
      }
    };

    var findMedianSortedArrays4 = function(nums1, nums2) {
      var medianOddOdd = function(a1, l1, m1, h1, a2, l2, m2, h2) {
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
          } else if (l2 == m2 && m2 < h2){
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

      var medianEvenEven = function(a1, l1, lm1, hm1, h1, a2, l2, lm2, hm2, h2) {
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

      var medianOddEven = function(a1, l1, m1, h1, a2, l2, lm2, hm2, h2) {
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

        } else if (lm1 < hm1 && lm2 == hm2){

        }

      }
    };

    var test = function(nums1, nums2, answer) {
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

    var test2 = function(nums1, nums2) {
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
    var compare = function(x, y) { return x - y; };
    for (i = 0; i < 10000; i++) {
      var a1 = randomArrayNotEmpty();
      var a2 = randomArrayNotEmpty();
      a1.sort(compare);
      a2.sort(compare);
      test2(a1, a2);
    }

  });

  it("Longest Palindromic Substring", function(){
    var longestPalindrome1 = function(s) {
      var map = {};
      var begin = 0;
      var end = 0;

      var isParlindrom = function(i, j) {
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

      isParlindrom(0, s.length-1);
      return s.substring(begin, end + 1);
    };

    var longestPalindrome2 = function(s) {
      var begin = 0;
      var end = 0;

      var expand = function(i, j) {
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

    var test1 = function(s, ans) {
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

    var test2 = function(s) {
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

  it("ZigZag Conversion", function(){
    var convert = function(s, numRows) {
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

    var test = function(s, numRows, ans) {
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

  it("Reverse Integer", function(){
    var reverse = function(x) {
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

    var test = function(x, ans) {
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

  it("String to Integer (atoi)", function(){
    var atoi = function(str){
      if (!str) return 0;

      var isDigit = function(c){
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

    var test = function(str, ans){
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

  it("Palindrome Number", function(){
    var isParlindrom = function(x){
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

    var test = function(x, ans){
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
});