#!/bin/bash

rm -rf referees
mkdir -p referees

# generate a script to copy over the referee forms, 
# and give them the name of the team
# 2019 Team UnrealGoose will present on a different day
find ../2019/se491/teams -name RefereeForm.md \
    | grep -v UnrealGoose \
    | grep -v -i DEFUNCT \
    | sort \
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
# needs NodeJS v6 --- some kind of systemic error with later versions
node server.js --referee-schedule-directory ./referees/
