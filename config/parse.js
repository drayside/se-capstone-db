"use strict";

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var glob = require('glob');

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
        default: throw ("unknown Markdown level " + level);
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
 * @param array a - array of strings that is the input file
 * @param regex header - to match the header
 * @param emtpyStructure - either [] or {}, depending on desired return type
 * @return regular array or associative array - the values of the list
 */
function extractList(a, level, header, emptyStructure, expectDeep) {
    // default is flat list
    if (typeof emptyStructure === 'undefined') { emptyStructure = []; }
    // default is shallow list
    if (typeof expectDeep === 'undefined') { expectDeep = false; }
    // defensive copy of emptyStructure
    emptyStructure = Array.isArray(emptyStructure) ? [] : {};
    
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

var parse = function (fileName) {
    var result = {};
    var fileContent = fs.readFileSync(path.join(__dirname, '/markdown/' + fileName));
    // this split pattern will work for both unix and windows text files
    // http://www.2ality.com/2011/12/nodejs-shell-scripting.html
    fileContent = fileContent.toString().split(/\r?\n/);

    result[fileName] = {};

    // Parse the Markdown

    // we aren't actually using the blurb, so suppress for now
/*
    var indexBlurb = fileContent.indexOf("## Blurb") + 1;
    var blurb = "";
    while (indexBlurb < fileContent.length && !beginsWith(fileContent[indexBlurb], "#")){
        blurb += fileContent[indexBlurb];
        indexBlurb++;
    }

    result[fileName]["blurb"] = blurb;
*/

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

    // Parse Questions and Comments
    // we aren't using the questions and comments, so suppress now
/*
    var indexQC = fileContent.indexOf("## Questions & Comments") + 1;
    var qc = "";

    for (; indexQC < fileContent.length; indexQC++){
        qc += fileContent[indexQC];
    }

    result[fileName]["questions_and_comments"] = qc;
*/

    // Parse Tags
    result[fileName]["tags"] = extractFlatList(fileContent, 2, /^##\s*Tags/);

    return result;
};

function initParse(){
    var files = fs.readdirSync(path.join(__dirname, '/markdown/'));
    // console.log(files);
    var res = {};
    for (var i = 0; i < files.length; i++){
        var t = files[i];
        // only parse markdown files; ignore other files in directory
        if (t.match(/(.*).md$/) && !t.match(/^index/)) {
            res = _.merge(res, parse(t.substring(t.lastIndexOf('/'), t.length)));
        }
    }
    return res;
}

var res = initParse();
// console.log('Parsed contents: ' + contentJson);
// console.log("FINAL: ", JSON.stringify(res, null, 2));
module.exports = res;
