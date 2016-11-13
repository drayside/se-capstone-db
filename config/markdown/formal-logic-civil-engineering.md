# Applying Formal Logic in Civil Engineering

## Partners

_Prof Derek Rayside_  
Electrical & Computer Engineering  
University of Waterloo  
drayside@uwaterloo.ca  

_Behrooz Golzarpoor_  
PhD Student  
Civil Engineering  
University of Waterloo  

_Prof Carl Haas_  
Civil Engineering (Acting Chair)  
University of Waterloo  


## Blurb

Mega-construction projects, costing billions of dollars and 
thousands of people, require intricate planning and coordination.
A trend in industry has been to describe the steps that some people
take for some tasks as _workflows_ (flowcharts).

Prof Haas's group has been working with the Construction Industry
Institute (CII) to define industry-wide best-practice workflows.

We are applying formal logic to verify that company-specific
specializations workflows conform with the best-practice workflows.
In particular, we are using the Alloy first-order relational logic
tool from MIT. In previous work we defined formal logic rules that the
Alloy Analyzer can use to check that a specialized workflow conforms
to a best-practice workflow.

Now, for this mini-project, we are interested in workflows that
interoperate with other workflows: will they deadlock? will they get
stuck in a loop? will they terminate? etc.

The next step after this is to prove a general theorem about workflow
interoperability. Suppose that workflow X' is a specialization of
workflow X, and that workflow Y' is a specialization of workflow Y. We
have already run the analysis to know that these specializations are
conforming, and that X and Y interoperate properly. Can we therefore
conclude that X' and Y' will interoperate properly? That is, without
directly comparing X' and Y'? In other words, there is no legal
specialization of a workflow that can break interoperability.



### References

Alloy logic analyzer:  
http://alloy.mit.edu/alloy/

Previous research paper, focusing on single processes:  
http://www.sciencedirect.com/science/article/pii/S1474034616300209
(You should be able to download the PDF from a UW IP address, whether
that be from physical location on campus or VPN.)

### Future: continuing
### Size: single
### Status: abandoned

## Interested Students
### Doing Something Else
* rj2olear


## Questions & Comments

Q1 

C1

Q2 

C2

Q3 

C3
