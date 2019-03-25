"use strict";

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var glob = require('glob');
var assert = require('assert');

module.exports = function(mdDirAbsPath, shouldParseRefs, refScheduleDirAbsPath) {
    //passed in markdown directory paths

  const lookup = {
    9 : 'Nine',
    9.5 : 'NineThirty',
    10 : 'Ten',
    10.5 : 'TenThirty',
    11 : 'Eleven',
    11.5 : 'ElevenThirty',
    12 : 'Twelve',
    12.5 : 'TwelveThirty',
    13 : 'One',
    13.5 : 'OneThirty',
    14 : 'Two',
    14.5 : 'TwoThirty',
    15 : 'Three',
    15.5 : 'ThreeThirty',
    16 : 'Four',
    16.5 : 'FourThirty',
    17 : 'Five'
  };

  const MIN_TIME = 9;
  const MAX_TIME = 17;
  const MAX_NUMBER_OF_REFEREES = 10;

  var FLOATER_COUNTER = 0;

  function beginsWith(str, prefix){
    if (str.length > prefix.length && str.substring(0, prefix.length) === prefix){
      return true;
    }

    return false;
  }

  /**
   * @desc return the index of the first element in an array of strings
   *       that matches the regex
   * @param array a - input array of strings
   * @param regex r - regular expression to match
   * @param int offset - index to start search at (default is zero)
   * @return int - index if found; -1 otherwise
   */
  function firstMatch(a, r, offset) {
    if (typeof offset === 'undefined') { offset = 0; }
    var first = -1;
    a.forEach(function (d,i) {
      if (first < 0 && i >= offset && d.match(r)) {first=i;}});
    return first;
  }

  /**
   * @desc Return a regular expression for Markdown headings at different levels.
   */
  function levelRegex(level) {
    switch (level) {
      case 1 : return /^# /;
      case 2 : return /^## /;
      case 3 : return /^### /;
      case 4 : return /^#### /;
      case 5 : return /^##### /;
      default: {
        console.trace();
        throw ("unknown Markdown level " + level);
        }
    }
  }

  /**
   * @desc Extract a flat list with numeric indices.
   * @return array
   */
  function extractFlatList(a, level, header) {
    return extractList(a, level, header, [], false);
  }

  /**
   * @desc Extract a flat key list with associative indices.
   * @return associative array
   */
  function extractKeyList(a, level, header) {
    return extractList(a, level, header, {}, false);
  }

  /**
   * @desc Extract a deep list, comprised of flat lists.
   * @return an associative array of regular arrays
   */
  function extractDeepList(a, level, header) {
    return extractList(a, level, header, {}, true);
  }


  /**
   * @desc Extract a list of values from Markdown.
   *       Use one of the API helper functions above instead of this one.
   * @param array aOriginal - array of strings that is the input file
   * @param regex header - to match the header
   * @param emtpyStructure - either [] or {}, depending on desired return type
   * @return regular array or associative array - the values of the list
   */
  function extractList(aOriginal, level, header, emptyStructure, expectDeep) {
    // default is flat list
    if (typeof emptyStructure === 'undefined') { emptyStructure = []; }
    // default is shallow list
    if (typeof expectDeep === 'undefined') { expectDeep = false; }
    // defensive copy of emptyStructure
    emptyStructure = Array.isArray(emptyStructure) ? [] : {};
    // defensive copy of lines of interest from aOriginal
    // any line that starts with a "#" or "*" (perhaps preceeded by whitespace)
    const a = aOriginal.filter(line => /^\s*(#|\*).*/.test(line));

    // where does the list start?
    var start = firstMatch(a, header);
    if (start < 0) {
      // didn't find the header
      // return an empty list
      //console.log("list header not found: " + header);
      return emptyStructure;
    }

    // found the header
    // now see where the list ends
    // this initial determination might get tightened later,
    // depending on whether we are expecting a deep list and what we observe
    // another heading of the same or greater level?
    var end = -1;
    for (var i = 0; i < level; i++) {
      end = firstMatch(a, levelRegex(level-i), start+1);
      if (end > 0) {
        //console.log("found end: " + start + " " + end + " " + level + " " + i);
        break;
      }
    }
    // didn't find another heading, so end of file then
    if (end < 0) {
      end = a.length
        //console.log("setting end to end of file: " + start + " " + end);
    }


    // is this a deep list?
    // extract the named sublists (each of which is itself flat) ...
    var substart = start;
    var substarts = [];
    var deep = {};
    //console.log("--");
    do {
      var sublevel = level + 1;
      substart = firstMatch(a, levelRegex(sublevel), substart+1);
      //console.log("substart: " + substart + " " + end);
      if (substart > 0 && substart <= end) {
        // there is a subheading within bounds
        substarts.push(substart);
        var subhead = a[substart];
        //console.log("recurse: " + subhead);
        var sublist = extractFlatList(a, sublevel, subhead);
        //console.log("returned from " + subhead);
        subhead = subhead.replace(levelRegex(sublevel), "").trim();
        deep[subhead] = sublist;
      } else {
        substart = -1;
      }
    } while (substart > 0 && substart <= end);

    // if we expected a deep list, we are going to return that structure
    if (expectDeep) {
      // did we find a deep list?
      if (Object.keys(deep).length > 0) {
        // we found a deep list
        // did it have an implicit initial sublist?
        if (start != substarts[0]) {
          //console.log("implicit initial sublist: " + start + " " + substarts[0]);
          var implicit = extractFlatList(a, level, header);
          deep["implicit"] = implicit;
          //console.log("implicit: " + implicit);
          return deep;
        } else {
          // the normal case: expected a deep list and found it
          return deep;
        }
      } else {
        // we did not find a deep list: make the structure
        // inject a sublist heading
        deep["sublist"] = extractFlatList(a, level, header);
        return deep;
      }
    }
    // else we did not expect a deep list: keep going flat


    // might need to tighten the end
    if (substarts.length > 0) {
      // there are sublists, but we aren't expecting them
      // so tighten the end to the first sublist
      end = substarts[0];
    }

    // extract each datum
    var list = emptyStructure;
    for (var i = 1; i < (end-start); i++) {
      var line = a[i+start];
      // skip blank lines
      if (line == undefined || line.match(/^\s*$/)) continue;
      // skip lines that do not start with a bullet
      if (!line.match(/^\s*\*/)) {
        console.log("Non-bullet line: " + line);
        continue;
      }
      // strip out bullet
      line = line.replace(/\s*\*\s*/, "").trim();
      if (Array.isArray(emptyStructure)) {
        // numeric indices
        list.push(line);
      } else {
        // associative indices
        var pair = line.split(":");
        if (pair.length < 2) {
          console.log("bad named value line: " + line);
        } else {
          var key = pair[0].trim().toLowerCase();
          var value = pair[1].trim();
          list[key] = value;
          //console.log("extractList key+value: " + key + " " + value);
        }
      }
    }
    //console.log("returning data: " + list);
    return list;
  }

  var parse = function (fpath) {
    var fileName = path.basename(fpath);
    var result = {};
    //var fileContent = fs.readFileSync(path.join(__dirname, '/markdown/' + fileName));
    var fileContent = fs.readFileSync(fpath);
    // this split pattern will work for both unix and windows text files
    // http://www.2ality.com/2011/12/nodejs-shell-scripting.html
    fileContent = fileContent.toString().split(/\r?\n/);

    result[fileName] = {};

    // Parse the Markdown

    // extract students
    //console.log(fileName + " students  ------------------------");
    var students = extractDeepList(fileContent, 2, /^##\s*Interested\s+Students/);
    // interested and not otherwise obliged
    result[fileName]["interested_students"] = [];
    var interested = [];
    Object.keys(students).forEach(function (key) {
      if (key != "Doing Something Else") {
        //console.log(fileName + " " + key + " " + students[key]);
        students[key].forEach(function (userid) {
          interested.push(userid);
        });
      }
    });
    result[fileName]["interested_students"] = interested;
    // doing something else
    if (students.hasOwnProperty("Doing Something Else")) {
      //console.log(fileName + " Doing Something Else: " + students["Doing Something Else"]);
      result[fileName]["doing_something_else"] = students["Doing Something Else"];
    } else {
      result[fileName]["doing_something_else"] = [];
    }


    // extract metadata
    //console.log(fileName + " metadata  ------------------------");
    var metadata = extractKeyList(fileContent, 2, /^##\s*Metadata/);
    Object.keys(metadata).forEach(function (key) {
      result[fileName][key] = metadata[key];
    });

    // extract tags
    result[fileName]["tags"] = extractFlatList(fileContent, 2, /^##\s*Tags/);

    return result;
  };

  const parse_time_interval = function(start, end) {
    // bring times within range, if necessary
    if (start < MIN_TIME) start = MIN_TIME
    if (end > MAX_TIME) end = MAX_TIME

    // check that times are sensible
    assert(start < end, 'start < end - constraint violated');
    assert((start>= MIN_TIME && start <= MAX_TIME),
            'Symposium Day start time range violated');
    assert((end>= MIN_TIME + 0.5 && end <= MAX_TIME + 0.5), 
            'Symposium Day end time range violated');

    var list  = [];
    var t = start;
    for (;;) {
        assert(t in lookup, 'time out of range for symposium day');
        list.push(lookup[t]);

        var next = t + 0.5;

        if ( end > next ) {
            t = next;
        } else {
            break;
        }
    }
    return list.toString().replace(/,/g," + ");
  }

  const scrub = function(str) {
    return str.replace(/\[/g, "").replace(/\]/g, "");
  }

  const parseTimes = function(timeStr) {
    var rawTimes = timeStr.replace(/\[/g, "").replace(/\]/g, "").split('-');

    console.log('TIME:', rawTimes);
    var rawStartTime = rawTimes[0].split(':');
    var startTime = parseInt(rawStartTime[0]);
    var startMinutes = parseInt(rawStartTime[1]);
    if (startMinutes === 30) {
        startTime = startTime + 0.5;
    }

    var rawEndTime = rawTimes[1].split(':');
    var endTime = parseInt(rawEndTime[0]);
    var endMinutes = parseInt(rawEndTime[1]);
    if (endMinutes === 30) {
        endTime = endTime + 0.5;
    }
    console.log('parseTimes: ' + startTime + '-' + endTime);
    return parse_time_interval(startTime, endTime);
  }

  const parseRefereesAndTeams = function(fpath, dump, uniqueRefs) {
    const fileName = path.basename(fpath);
    const result = {};
    let fileContent = fs.readFileSync(fpath);
    fileContent = fileContent.toString().split(/\r?\n/);

    result[fileName] = {};
    console.log(fileName);
    // Parse

    //extract teams
    const team = {};
    const teamNumberIndex = firstMatch(fileContent, /^#\s*Team#:/);
    if (teamNumberIndex > -1) {
        const rawTeamNumber = fileContent[teamNumberIndex].split(':');
        if (rawTeamNumber.length > 1) {
            team['team_number'] = parseInt(rawTeamNumber[1]);
        }
    }

    const teamNameIndex = firstMatch(fileContent, /^#\s*Team\s+Name:/);
    if (teamNameIndex > -1) {
        const rawTeamName = fileContent[teamNameIndex].split(':');
        if (rawTeamName.length > 1) {
            team['team_name'] = rawTeamName[1].replace(/ /g, "_");
        }
    }


    // extract referees
    const refs = {};
    let teamRefs = [];
    let floaterAdded = 0;
    for (let i = 0; i < MAX_NUMBER_OF_REFEREES; i++) {
        //console.log("filename: ", fileName);
        const refRegExp = new RegExp('^###\\s*Referee\\s+' + (i + 1));
        const refKeys = extractKeyList(fileContent, 2, refRegExp);
        //console.log(refKeys);
        if (Object.keys(refKeys).length > 0) {
          if(refKeys['full name'] == '[First] [Last]') {
            //console.log("adding floater for ", fileName);

            // only add one floater per team
            if (floaterAdded > 0) continue;
            else floaterAdded++;

            refKeys['full name'] = 'Floater Referee';
            FLOATER_COUNTER++;
            refKeys['email'] = 'floater' + FLOATER_COUNTER + '@testmail.com';
          } else {
            // strip the square brackets out of the names and emails
            refKeys['full name'] = scrub(refKeys['full name']);
            refKeys['email'] = scrub(refKeys['email']);
          }

          refs['ref' + i] = _.pick(refKeys, ['full name', 'email', 'attending']);
          const flatList = extractFlatList(fileContent, 2, refRegExp);
          const index = flatList.indexOf('Available Times (24 hr format):');
          // all bullets following this will be time intervals [HH:MM - HH:MM];
          // console.log(flatList);
          let availableTimes = [];
          for (let j = index + 1, k = 0; j < flatList.length; j++, k++) {
            if (flatList[j] != '[HH:MM] - [HH:MM]') {
              availableTimes[k] = parseTimes(flatList[j]);
            } else {
              availableTimes[0] = parse_time_interval(MIN_TIME, MAX_TIME);
              break;
            }
          }
          availableTimes = availableTimes.join(' + ');

          //console.log(refs['ref' + i]);
          const uniqueIdentifier = refs['ref' + i]['email'].split('@')[0].replace('.', '_').replace('-','_');
          //console.log(uniqueIdentifier);
          teamRefs.push(uniqueIdentifier);
          
          refs['ref' + i]['alloy_string'] = '\t' + uniqueIdentifier + " -> (" + availableTimes 
              + ")";

          if (!uniqueRefs.hasOwnProperty(uniqueIdentifier)) {
            uniqueRefs[uniqueIdentifier] = {};
            uniqueRefs[uniqueIdentifier].alloy_string = refs['ref' + i]['alloy_string'];
            uniqueRefs[uniqueIdentifier].availableTimes = availableTimes;
            uniqueRefs[uniqueIdentifier].full_name = scrub(refKeys['full name']);
            uniqueRefs[uniqueIdentifier].email = scrub(refKeys['email']);
            uniqueRefs[uniqueIdentifier].attending = scrub(refKeys['attending']);
            dump.refDump += "one sig " + uniqueIdentifier + " extends Ref{}\n";
            dump.refArray.push(refs['ref' + i]['alloy_string'] + '\n');
            if (uniqueRefs[uniqueIdentifier].attending == "Remotely") {
                dump.refRemoteArray.push(uniqueIdentifier + "\n");
            }
          } else {
            //duplicate!
            assert((uniqueRefs[uniqueIdentifier].availableTimes === availableTimes), 
                    'ERROR: duplicate referee found with time intervals that do not match: \n' +
                      uniqueIdentifier + "\n" +
                      team['team_name'] + "\n" +
                      uniqueRefs[uniqueIdentifier].availableTimes + "\n" +
                      availableTimes);
            //if they do match, do nothing.
          }
        }
    }

    // dump output
    const uniqueTeamIdentifier = "Team" + team.team_name;
    team['alloy_string'] = '\t' + uniqueTeamIdentifier + " -> (" +
        teamRefs.join(' + ') + ")";
    dump.teamDump += "one sig " + uniqueTeamIdentifier + " extends Team {}\n";
    dump.teamArray.push(team['alloy_string'] + '\n');

    result[fileName] = {
        team: team,
        refs: refs,
    };

    //console.log(result[fileName]);

    return result;
  }

  function initParse(mdDirAbsPath, shouldParseRefs, refScheduleDirAbsPath){
    if (shouldParseRefs) {
        const refFiles = fs.readdirSync(refScheduleDirAbsPath);

        let result = {};

        // can only pass objects by reference in js
        let dump = {
            refDump: "",
            refHeader: "fun AvailableTimes : Ref -> Time {\n",
            refArray: [],
            refRemoteHeader: "fun RemoteRefs : Ref {\n",
            refRemoteArray: [],
            teamDump: "",
            teamHeader: "fun refs : Team -> Ref {\n ",
            teamArray: [],
        };

        let uniqueRefs = {};
        let refInfoDump = "REFEREE REPORT \n\n";
        for (let i = 0; i < refFiles.length; i++) {
            const t = refFiles[i];
            if (t.match(/(.*).md$/) && !t.match(/^index/)) {
                const fname = t.substring(t.lastIndexOf('/'), t.length);
                const fpath = path.join(refScheduleDirAbsPath, fname);
                result = _.merge(result, parseRefereesAndTeams(fpath, dump, uniqueRefs));
                console.log('FILENAME:' + fpath);
                console.log(uniqueRefs);
            }
        }

        dump.refHeader += dump.refArray.join(' + ') + '}\n';
        dump.refRemoteHeader += dump.refRemoteArray.join(' + ') + '}\n';
        dump.teamHeader += dump.teamArray.join(' + ') + '}\n';
        
        Object.keys(uniqueRefs).forEach(function(key) {
            refInfoDump += uniqueRefs[key].full_name + ' <' + uniqueRefs[key].email +
                '>,\t\t\t' + uniqueRefs[key].attending + '\n'; 
        });

        fs.writeFile('/tmp/referee_schedule.als', dump.refDump + '\n\n\n' + dump.refHeader
                + '\n\n' + dump.refRemoteHeader
                + '\n\n\n' + dump.teamDump + '\n\n\n' + dump.teamHeader,
            function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("Successfully wrote alloy dump to: /tmp/referee_schedule.als");
            }
        );
        
        fs.writeFile('/tmp/referee_report.txt', refInfoDump,
            function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("Successfully wrote referee report to: /tmp/referee_report.txt");
            }
        );
    }

    /** original project markdowm parse code **/

    var files = fs.readdirSync(mdDirAbsPath); //here's the trouble TODO
    // console.log(files);
    var res = {};
    for (var i = 0; i < files.length; i++){
      var t = files[i];
      // only parse markdown files; ignore other files in directory
      if (t.match(/(.*).md$/) && !t.match(/^index/)) {
        var fname = t.substring(t.lastIndexOf('/'), t.length);//TODO why not use path.basename()?
        var fpath = path.join(mdDirAbsPath, fname);
        res = _.merge(res, parse(fpath));
      }
    }
    return res;
  }


  // console.log('Parsed contents: ' + contentJson);
  // console.log("FINAL: ", JSON.stringify(res, null, 2));
  return initParse(mdDirAbsPath, shouldParseRefs, refScheduleDirAbsPath);
};

