"use strict";

var _ = require('lodash');
var errors = require('../common/errors');
var graphviz = require('graphviz');

let rejectedIdeas = new Set();
let assignedIdeas = new Set();
let decidedIdeas = new Set();
let decidedStudents = new Set();

// adds ideas to the respective sets, based on the current status of the project
function addToSets(models) {
    // go through every project
    for(var projectName in models) {
        var project = models[projectName];
        // add the ideas to the respective idea sets
        if(project["status"] == "rejected") {
            rejectedIdeas.add(projectName);
        } else if(project["status"] == "coding" || project["status"] == "abandoned") {
            decidedIdeas.add(projectName);
        } else {
            assignedIdeas.add(projectName);
            decidedIdeas.add(projectName);
        }
    }
}

module.exports = function (models) {
    var generateGraph = function generateGraph() {
        addToSets(models);

        // creating the graph
        var g = graphviz.graph("Projects");
        var map = {};

        for(var idea in models) {
            var project = models[idea];
            var students = project["interested_students"];

            // only add ideas that are not rejected
            if(! rejectedIdeas.has(idea)) {
                map[idea] = students;

                // keep a set of decided students
                if(decidedIdeas.has(idea)) {
                    decidedStudents.add(students);
                }
            }
        }

        for(var idea in map) {
            var project = models[idea];
            var labelSize;
            var students = project["interested_students"];

            if(decidedIdeas.has(idea)) {
                labelSize = map[idea];
            } else {
                // set difference
                labelSize = students.filter(x => decidedStudents.indexOf(x) < 0 );
            }
            // TODO - add labelSize to graph using library

            var node = g.addNode( idea, {"color" : "blue"} );

            if(assignedIdeas.has(idea)) {
                node.set("style", "bold");
                node.set("color", "purple");
            }

            else if(decidedIdeas.has(idea)) {
                node.set("style", "bold");
                if(labelSize == 0) { // abandoned idea
                    node.set("shape", "rectangle");
                    node.set("color", "grey");
                } else {    // coding idea
                    node.set("color", "green");
                }
            } else {
                if(labelSize < 6) {
                    node.set("style", "bold");
                    node.set("shape", "rectangle");
                    if(labelSize < 3) {
                        node.set("color", "red");
                    }
                    else {
                        node.set("color", "blue");
                    }
                } // TODO - tooltip
            }
        }

        for(var idea1 in map) {
            for(var idea2 in map) {
                if(idea1 < idea2) {
                    var students1 = models[idea1]["interested_students"];
                    var students2 = models[idea2]["interested_students"];

                    var intersection = _.intersection(students1, students2);

                    if(! _.isEmpty(intersection)) {
                        var e = g.addEdge( idea1, idea2 );
                        // TODO - tooltip
                        var size = intersection.length;

                        if(size <= 1) {
                            // edges of size one are dotted
                            e.set("style", "dotted");
                        } else {
                            if(size >= 4) {
                                e.set("style", "bold");
                                e.set("style", "bold");
                            }
                        }
                    }
                }
            }
        }

        // Generate SVG output
        g.output( "svg", "projects.svg" );
    };

    return {
        generateGraph: generateGraph
    };
};
