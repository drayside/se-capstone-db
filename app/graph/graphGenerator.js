"use strict";

var _ = require('lodash');
var errors = require('../common/errors');
var graphviz = require('graphviz');

module.exports = function (models) {
    var generateGraph = function generateGraph() {
        // Create digraph G
        var g = graphviz.digraph("G");
        // Add node (ID: Hello)
        var n1 = g.addNode( "Hello", {"color" : "blue"} );
        n1.set( "style", "filled" );

        // Add node (ID: World)
        g.addNode( "World" );

        // Add edge between the two nodes
        var e = g.addEdge( n1, "World" );
        e.set( "color", "red" );

        // Print the dot script
        console.log( g.to_dot() );

        // Set GraphViz path (if not in your path)
        // g.setGraphVizPath( "/usr/local/bin" );

        // Generate a PNG output
        g.output( "png", "test01.png" );
    };

    return {
        generateGraph: generateGraph
    };
};
