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

var parse = function (fileName) {
    var result = {};
    var fileContent = fs.readFileSync(path.join(__dirname, '/markdown/' + fileName)).toString().split("\n");

    // Remove garbage
    fileContent = _.filter(fileContent, function(n){
        return n !== undefined && n !== "";
    });

    result[fileName] = {};

    // Parse the Blob
    // for (var i in fileContent) { console.log (":", fileContent[i]); }

    var indexBlurb = fileContent.indexOf("## Blurb") + 1;
    var blurb = "";
    while (indexBlurb < fileContent.length && !beginsWith(fileContent[indexBlurb], "#")){
        blurb += fileContent[indexBlurb];
        indexBlurb++;
    }

    result[fileName]["blurb"] = blurb;

    // Parse Partners
    result[fileName]["interested_students"] = [];
    var indexIS = fileContent.indexOf("## Interested Students") + 1;
    while (indexIS < fileContent.length && !beginsWith(fileContent[indexIS], "## ")){
        var line = fileContent[indexIS];
        if (beginsWith(line, "* ")){
            result[fileName]["interested_students"].push(line.substring(2, line.length));
        }
        indexIS++;
    }

    // Parse Future, Size, Status
    for ( var i = 0; i < fileContent.length; i++){
        var line = fileContent[i];
        var prefixs = ["### Future:", "### Size:", "### Status:"];

        for (var j = 0; j < prefixs.length; j++){
            var pref = prefixs[j];
            if (beginsWith(line, pref)){
                result[fileName][pref.substring(4, pref.length-1).toLowerCase()] = line.split(":")[1].trim();
            }
        }
    }

    // Parse Questions and Comments
    var indexQC = fileContent.indexOf("## Questions & Comments") + 1;
    var qc = "";

    for (; indexQC < fileContent.length; indexQC++){
        qc += fileContent[indexQC];
    }

    result[fileName]["questions_and_comments"] = qc;
    return result;
};

function initParse(){
    var files = fs.readdirSync(path.join(__dirname, '/markdown/'));
    // console.log(files);
    var res = {};
    for (var i = 0; i < files.length; i++){
        var t = files[i];
        res = _.merge(res, parse(t.substring(t.lastIndexOf('/'), t.length)));
    }
    return res;
}

var res = initParse();
// console.log('Parsed contents: ' + contentJson);
// console.log("FINAL: ", JSON.stringify(res, null, 2));
module.exports = res;
