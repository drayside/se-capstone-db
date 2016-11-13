# UW Degree Audit: Improved Error Reporting

## Partners

_Prof Byron Weber Becker_
Computer Science
University of Waterloo
bwbecker@uwaterloo.ca
https://cs.uwaterloo.ca/~bwbecker/

_Prof Derek Rayside_
Electrical & Computer Engineering
University of Waterloo
drayside@uwaterloo.ca

## Blurb

In 4B you will complete an intent to graduate form.
What happens to that form?
A person reads it, and manually analyzes your transcript against the
degree requirements: this is called _degree audit_.
This process is slow and expensive.

[SE2016 Team
Maestoso](https://www.youtube.com/watch?v=XUi1ofHs5Kw&index=15&list=PLRqQHlx1JrKzbsgF6DaRSHzECsmkHI_i6)
started a project to automate this degree audit procedure.
They designed a Domain Specific Language (DSL) for defining degree
requirements, and a compiler that translates the DSL into the
[Alloy](http://alloy.mit.edu) logic language.
The Alloy Analyzer logic engine then performs the degree audit
analysis (by using a
[SAT](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem) solver).

Prof Becker recently did some real-world tests with this degree audit
tool. The error reports that it produces when a student fails to meet
the degree requirements are too verbose. More concise reports need to
be developed, or perhaps an interactive way to browse the results.

The eventual goal is that CS, SE, ECE, etc, will use this system to do
degree audit. This will hopefully be built into an improved version of
SE Advisor that will be made available to students in other programs.
There is lots of follow-up work to be done for a full capstone
project on this enhanced system, beyond improving these error reports.

### Future: continuing/terminal
### Size: single
### Status: abandoned

## Interested Students
### Doing Something Else
* hkjayaku
* z253liu
* d8joseph
* m2khowaj
* y38zeng
* y6si
* jfrancis
* paperrie
* skoushan
* yjou
* h76huang

## Questions & Comments

Q1 How would you handle the case where students in the same year might follow a different graduation calendar? say, software 2018 can now follow 2020's graduation requirements.

A1 drayside: Each student will be associated with one plan in the
system. An advisor can switch the official plan. The student could do
scenario exploration by doing computations with alternative plans.


C1
