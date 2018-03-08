#!/bin/bash

rm -rf referees
mkdir -p referees

# generate a script to copy over the referee forms, 
# and give them the name of the team
# 2018 Team Embark will present on a different day
find ../2018/se491/teams -name RefereeForm.md \
    | grep -v embark \
    | gawk '/md/ {
        split($1, a, "/"); # break up the path
        t=a[5]; # team name is this element
        print "cp", $1, "./referees/" t ".md";}' \
        > .$0.tmp
# run the copying script
chmod +x .$0.tmp
./.$0.tmp
dos2unix referees/*.md

# start the analysis
nodejs server.js --referee-schedule-directory ./referees/
