#!/bin/bash

rm -f consolidated.txt
cp team_schedule.txt consolidated.txt
for f in `ls *.txt | grep -v team_schedule.txt | grep -v consolidated.txt`
do
    gawk '// {if (NR > 7) {print;}}' $f >> consolidated.txt
done

sed -i -e 's/^\t*//' consolidated.txt
