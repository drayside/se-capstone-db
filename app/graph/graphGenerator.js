"use strict";

var _ = require('lodash');
var errors = require('../common/errors');
var graphviz = require('graphviz');

var rejectedIdeas = new Set();
var assignedIdeas = new Set();
var decidedIdeas = new Set();
var decidedStudents = new Set();

module.exports = function (models) {
    // returns false if the graph does not contain either of the project ideas
    function isPresent(g, idea1, idea2) {
        return (g[idea1] !== undefined && g[idea2] !== undefined);
    }

    // adds ideas to the respective sets, based on the current status of the project
    function addToSets() {
        rejectedIdeas.add("index.md");
        rejectedIdeas.add("index-body.md");
        rejectedIdeas.add("index-header.md");

        // go through every project
        for(var projectName in models) {
            var project = models[projectName];
            // add the ideas to the respective idea sets
            if(project["status"] === "rejected") {
                rejectedIdeas.add(projectName);
            } else if(project["status"] === "coding" || project["status"] === "abandoned") {
                decidedIdeas.add(projectName);
            } else if(project["status"] === "assigned") {
                assignedIdeas.add(projectName);
                decidedIdeas.add(projectName);
            }
        }
    }

    var generateGraph = function generateGraph(min, max) {
        min = min || 0;
        max = max || Number.MAX_SAFE_INTEGER;

        addToSets();

        // creating the graph
        var g = graphviz.graph("Projects");
        g.set("splines", "true");
        g.set("concentrate", "true");
        g.set("overlap", "false");
        g.set("ranksep", "0.5");

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

        var graphIdeas = {};

        // add interested students to the map
        for(var idea in map) {
            var project = models[idea];
            var students = project["interested_students"];

            var labelSize = decidedIdeas.has(idea) ? map[idea].length
                                                   : _.difference(Array.from(students), Array.from(decidedStudents)).length;
                                                   // get the students that have not decided on another project

            var displayIdea = idea.replace("-", " ").substring(0, idea.length - 3).concat(" " + labelSize);

            if( labelSize < min || labelSize > max ) {
                continue;
            }

            graphIdeas[idea] = {};

            var node = g.addNode( idea, {"color" : "blue"} );

            node.set("label", displayIdea);
            // TODO: fix URL depending on how we clone the REPO
            node.set("URL", './' + idea);

            // assigned idea
            if(assignedIdeas.has(idea)) {
                node.set("style", "bold");
                node.set("color", "purple");
            }
            // decided idea
            else if(decidedIdeas.has(idea)) {
                node.set("style", "bold");

                if(labelSize === 0) { // abandoned idea
                    node.set("shape", "rectangle");
                    node.set("color", "grey");
                } else {    // coding idea
                    node.set("color", "green");
                }
            // no status yet
            } else if(labelSize < 6) {
                node.set("style", "bold");
                node.set("shape", "rectangle");

                var color = labelSize < 3 ? "red" : "blue";
                node.set("color", color);
            }
            node.set("tooltip", _.join(students, " "));
        }

        for(var idea1 in map) {
            for(var idea2 in map) {
                if(idea1 < idea2) {
                    var students1 = models[idea1]["interested_students"];
                    var students2 = models[idea2]["interested_students"];

                    // get the common interested students between both projects
                    var intersection = _.intersection(students1, students2);

                    if(! _.isEmpty(intersection) && isPresent(graphIdeas, idea1, idea2)) {
                        var e = g.addEdge(idea1, idea2);

                        e.set("tooltip", _.join(intersection, " "));
                        var size = intersection.length;

                        // edges of size 1 are dotted
                        var style = size <= 1 ? "dotted" : "bold";
                        e.set("style", style);
                    }
                }
            }
        }

        // Generate SVG output
        g.output( "svg", "public/projects.svg" );
    }

    return {
        generateGraph: generateGraph
    };
};
