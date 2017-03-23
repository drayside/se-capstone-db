#!/bin/bash

rm -rf referees
mkdir -p referees

find ../2017/teams -name RefereeForm.md \
    | gawk '/md/ {
        split($1, a, "/"); 
        t=a[4]; 
        print "cp", $1, "./referees/" t ".md";}' \
        > .$0.tmp

chmod +x .$0.tmp
./.$0.tmp

nodejs server.js --referee-schedule-directory ./referees/
