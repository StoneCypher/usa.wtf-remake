/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */

"use strict";

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { document: peg$parsedocument },
      peg$startRuleFunction  = peg$parsedocument,

      peg$c0 = function(sb) { return [].concat(... sb); },
      peg$c1 = "\r\n",
      peg$c2 = peg$literalExpectation("\r\n", false),
      peg$c3 = "\r",
      peg$c4 = peg$literalExpectation("\r", false),
      peg$c5 = "\n",
      peg$c6 = peg$literalExpectation("\n", false),
      peg$c7 = function(s, b) { return rotate_state_into_reps(s.val, b); },
      peg$c8 = function(r, addr) { return { representative: r.val, office: addr }; },
      peg$c9 = function(al, ph, fx) { return {
            addr  : al.map(l => l.val),
            phone : ph.length === 0? undefined : ph.map(p => p.val),
            fax   : fx.length === 0? undefined : fx.map(f => f.val)
          } },
      peg$c10 = "<br />",
      peg$c11 = peg$literalExpectation("<br />", false),
      peg$c12 = function() { return { kind: 'break' } },
      peg$c13 = "<p>(",
      peg$c14 = peg$literalExpectation("<p>(", false),
      peg$c15 = /^[0-9]/,
      peg$c16 = peg$classExpectation([["0", "9"]], false, false),
      peg$c17 = ")",
      peg$c18 = peg$literalExpectation(")", false),
      peg$c19 = " ",
      peg$c20 = peg$literalExpectation(" ", false),
      peg$c21 = "-",
      peg$c22 = peg$literalExpectation("-", false),
      peg$c23 = /^[^<]/,
      peg$c24 = peg$classExpectation(["<"], true, false),
      peg$c25 = "</p>",
      peg$c26 = peg$literalExpectation("</p>", false),
      peg$c27 = function(d1, d2, d3, d4, d5, d6, d7, d8, d9, d0, val) { return {
          kind : 'phone',
          val  : `(${d1}${d2}${d3}) ${d4}${d5}${d6}-${d7}${d8}${d9}${d0}`
        } },
      peg$c28 = "<p>Fax: ",
      peg$c29 = peg$literalExpectation("<p>Fax: ", false),
      peg$c30 = function(val) { return { kind: 'fax', val: val.join('') } },
      peg$c31 = "<p class=\"statename\">",
      peg$c32 = peg$literalExpectation("<p class=\"statename\">", false),
      peg$c33 = function(cval) {
          const jval = cval.join('')
                           .toLowerCase(),
                lval = jval.substring(0, jval.length-16),
                val  = lval.split(' ')
                           .map(word => `${word[0].toUpperCase()}${word.substring(1)}`)
                           .join(' ');
          return { kind: 'statename', val }
        },
      peg$c34 = "<p>",
      peg$c35 = peg$literalExpectation("<p>", false),
      peg$c36 = /^[^(]/,
      peg$c37 = peg$classExpectation(["("], true, false),
      peg$c38 = function(fl, val) { return { kind: 'addr', val: fl      + val.join('') } },
      peg$c39 = "(",
      peg$c40 = peg$literalExpectation("(", false),
      peg$c41 = /^[a-zA-Z]/,
      peg$c42 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
      peg$c43 = function(fl, sl, val) { return { kind: 'addr', val: fl + sl + val.join('') } },
      peg$c44 = "<p class=\"representative\">Representative ",
      peg$c45 = peg$literalExpectation("<p class=\"representative\">Representative ", false),
      peg$c46 = function(val) {
          return {
            kind: 'representative',
            val: val.join('')
          };
        },

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsedocument() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsestateblock();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsestateblock();
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c0(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsenl() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c1) {
      s0 = peg$c1;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c2); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 13) {
        s0 = peg$c3;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c4); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 10) {
          s0 = peg$c5;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
      }
    }

    return s0;
  }

  function peg$parsestateblock() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parsestate();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsebreak();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parseblock();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parseblock();
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c7(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseblock() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parserepresentative();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsebreak();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parseaddr_block();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parseaddr_block();
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseaddr_block() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseaddr_line();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseaddr_line();
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsephone();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsephone();
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsefax();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsefax();
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsebreak();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c9(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebreak() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 6) === peg$c10) {
      s1 = peg$c10;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c11); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsenl();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c12();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsephone() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c13) {
      s1 = peg$c13;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c14); }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c15.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s2 !== peg$FAILED) {
        if (peg$c15.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c16); }
        }
        if (s3 !== peg$FAILED) {
          if (peg$c15.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c16); }
          }
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s5 = peg$c17;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c18); }
            }
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 32) {
                s6 = peg$c19;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c20); }
              }
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                if (peg$c15.test(input.charAt(peg$currPos))) {
                  s7 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c16); }
                }
                if (s7 !== peg$FAILED) {
                  if (peg$c15.test(input.charAt(peg$currPos))) {
                    s8 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c16); }
                  }
                  if (s8 !== peg$FAILED) {
                    if (peg$c15.test(input.charAt(peg$currPos))) {
                      s9 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c16); }
                    }
                    if (s9 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 45) {
                        s10 = peg$c21;
                        peg$currPos++;
                      } else {
                        s10 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c22); }
                      }
                      if (s10 === peg$FAILED) {
                        s10 = null;
                      }
                      if (s10 !== peg$FAILED) {
                        if (peg$c15.test(input.charAt(peg$currPos))) {
                          s11 = input.charAt(peg$currPos);
                          peg$currPos++;
                        } else {
                          s11 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c16); }
                        }
                        if (s11 !== peg$FAILED) {
                          if (peg$c15.test(input.charAt(peg$currPos))) {
                            s12 = input.charAt(peg$currPos);
                            peg$currPos++;
                          } else {
                            s12 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c16); }
                          }
                          if (s12 !== peg$FAILED) {
                            if (peg$c15.test(input.charAt(peg$currPos))) {
                              s13 = input.charAt(peg$currPos);
                              peg$currPos++;
                            } else {
                              s13 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c16); }
                            }
                            if (s13 !== peg$FAILED) {
                              if (peg$c15.test(input.charAt(peg$currPos))) {
                                s14 = input.charAt(peg$currPos);
                                peg$currPos++;
                              } else {
                                s14 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c16); }
                              }
                              if (s14 !== peg$FAILED) {
                                s15 = [];
                                if (peg$c23.test(input.charAt(peg$currPos))) {
                                  s16 = input.charAt(peg$currPos);
                                  peg$currPos++;
                                } else {
                                  s16 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c24); }
                                }
                                while (s16 !== peg$FAILED) {
                                  s15.push(s16);
                                  if (peg$c23.test(input.charAt(peg$currPos))) {
                                    s16 = input.charAt(peg$currPos);
                                    peg$currPos++;
                                  } else {
                                    s16 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c24); }
                                  }
                                }
                                if (s15 !== peg$FAILED) {
                                  if (input.substr(peg$currPos, 4) === peg$c25) {
                                    s16 = peg$c25;
                                    peg$currPos += 4;
                                  } else {
                                    s16 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c26); }
                                  }
                                  if (s16 !== peg$FAILED) {
                                    s17 = peg$parsenl();
                                    if (s17 !== peg$FAILED) {
                                      peg$savedPos = s0;
                                      s1 = peg$c27(s2, s3, s4, s7, s8, s9, s11, s12, s13, s14, s15);
                                      s0 = s1;
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefax() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 8) === peg$c28) {
      s1 = peg$c28;
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c29); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c23.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c23.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c25) {
          s3 = peg$c25;
          peg$currPos += 4;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsenl();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c30(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsestate() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 21) === peg$c31) {
      s1 = peg$c31;
      peg$currPos += 21;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c32); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c23.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c23.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c25) {
          s3 = peg$c25;
          peg$currPos += 4;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsenl();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c33(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseaddr_line() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c34) {
      s1 = peg$c34;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c35); }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c36.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c23.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c23.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c24); }
          }
        }
        if (s3 !== peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c25) {
            s4 = peg$c25;
            peg$currPos += 4;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c26); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenl();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c38(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c34) {
        s1 = peg$c34;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c39;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c40); }
        }
        if (s2 !== peg$FAILED) {
          if (peg$c41.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c42); }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            if (peg$c23.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c24); }
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              if (peg$c23.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c24); }
              }
            }
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 4) === peg$c25) {
                s5 = peg$c25;
                peg$currPos += 4;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c26); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsenl();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c43(s2, s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parserepresentative() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 41) === peg$c44) {
      s1 = peg$c44;
      peg$currPos += 41;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c45); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c23.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c23.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c25) {
          s3 = peg$c25;
          peg$currPos += 4;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsenl();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c46(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }



    const rotate_state_into_reps = (state, reps) =>
      reps.map(rep => {
        const decorated_rep = rep;
        decorated_rep.state = state;
        return decorated_rep;
      });



  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};
