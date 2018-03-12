from tabulate import tabulate
from lxml import etree
import sys

tree = etree.parse(sys.argv[1])
root = tree.getroot()

TimeSessionMapping = {}
TeamSessionMapping = {}
RefTeamMapping = {}
Results = []
Refs = []
timeToIntMap = {'Nine':0,
              'NineThirty':1,
              'Ten':2,
              'TenThirty':3,
              'Eleven':4,
              'ElevenThirty':5,
              'Twelve':6,
              'TwelveThirty':7,
              'One':8,
              'OneThirty':9,
              'Two':10,
              'TwoThirty':11,
              'Three':12,
              'ThreeThirty':13,
              'Four':14,
              'FourThirty':15}


for c in root.find('instance').findall('field'):
    if (c.get('label') == 'refs'):
        for p in c.findall('tuple'):
            team = p.findall('atom')[0].get('label').replace("$0","")
            ref = p.findall('atom')[1].get('label').replace("$0","") 
            if (team not in RefTeamMapping):
                RefTeamMapping[team] = ""
            if(ref not in Refs):
                Refs.append(ref)
            RefTeamMapping[team] =  RefTeamMapping[team] + " " + ref      

for c in root.find('instance').findall('field'):
    if (c.get('label') == 'time'): 
        for p in c.findall('tuple'):
            session = p.findall('atom')[0].get('label').replace("$0","")
            time = p.findall('atom')[1].get('label').replace("$0","")
            TimeSessionMapping[session] = time

for c in root.find('instance').findall('field'):
    if (c.get('label') == 'team'): 
        for p in c.findall('tuple'): 
            session = p.findall('atom')[0].get('label').replace("$0","")
            time = TimeSessionMapping[session]
            teamXML = p.findall('atom')[1].get('label').replace("$0","")
           
            if ("R" not in session):
                timeRoom = time + " Room 1"
                Results.append([teamXML, timeRoom, RefTeamMapping[teamXML]])
                TeamSessionMapping[teamXML]= [time, "Room1"]
            else:
                timeRoom = time + " Room 2"
                TeamSessionMapping[teamXML]=[time, "Room2"]
                Results.append([teamXML,  timeRoom, RefTeamMapping[teamXML]])
print tabulate(Results, headers=['Team', 'Time/Room','Refs'])
print "\n"
for ref in Refs:
    refTab = [];
    for k, v in RefTeamMapping.items():
        if ref in v:
            time = TeamSessionMapping[k][0]
            loc = TeamSessionMapping[k][1]
            refTab.append([time, k, loc])
            refTab.sort(key=lambda x: timeToIntMap[x[0]])
        
    print "Referee: "+ ref
    print tabulate(refTab, headers = ['Time','Team','Location']) 
    print "\n"
