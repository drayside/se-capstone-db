from tabulate import tabulate
from lxml import etree
import sys
import csv

# read booths.csv
TeamBoothMapping = {}
with open(sys.argv[1]) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        TeamBoothMapping[row[0]] = row[1];


# read schedule.xml
tree = etree.parse(sys.argv[2])
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
timeToStringMap = {'Nine':'09:00',
              'NineThirty':'09:30',
              'Ten':'10:00',
              'TenThirty':'10:30',
              'Eleven':'11:00',
              'ElevenThirty':'11:30',
              'Twelve':'12:00',
              'TwelveThirty':'12:30',
              'One':'13:00',
              'OneThirty':'13:30',
              'Two':'14:00',
              'TwoThirty':'14:30',
              'Three':'15:00',
              'ThreeThirty':'15:30',
              'Four':'16:00',
              'FourThirty':'16:30'}

for c in root.find('instance').findall('skolem'):
    if (c.get('label') == '$this/refs'):
        for p in c.findall('tuple'):
            team = p.findall('atom')[0].get('label').replace("$0","")
            ref = p.findall('atom')[1].get('label').replace("$0","") 
            if (team not in RefTeamMapping):
                RefTeamMapping[team] = ""
            if(ref not in Refs):
                Refs.append(ref)
            RefTeamMapping[team] =  RefTeamMapping[team] + " " + ref      

for c in root.find('instance').findall('skolem'):
    if (c.get('label') == '$this/time'): 
        for p in c.findall('tuple'):
            session = p.findall('atom')[0].get('label').replace("$0","")
            time = p.findall('atom')[1].get('label').replace("$0","")
            TimeSessionMapping[session] = time

for c in root.find('instance').findall('field'):
    if (c.get('label') == 'schedule'): 
        for p in c.findall('tuple'): 
            session = p.findall('atom')[0].get('label').replace("$0","")
            time = TimeSessionMapping[session]
            time = timeToStringMap[time]
            teamXML = p.findall('atom')[1].get('label').replace("$0","")
           
            if ("R" not in session):
                timeRoom = time + " DC1302"
                Results.append([teamXML, timeRoom, RefTeamMapping[teamXML]])
                TeamSessionMapping[teamXML]= [time, "DC1302"]
            else:
                timeRoom = time + " DC1304"
                TeamSessionMapping[teamXML]=[time, "DC1304"]
                Results.append([teamXML,  timeRoom, RefTeamMapping[teamXML]])
print (tabulate(Results, headers=['Team', 'Time/Room','Refs']))
print ("\n")

# now schedules for individual referees
for ref in Refs:
    refTab = [];
    for k, v in RefTeamMapping.items():
        if ref in v:
            time = TeamSessionMapping[k][0]
            #time = timeToStringMap[time]
            talk = TeamSessionMapping[k][1]
            booth = TeamBoothMapping[k]
            refTab.append([time, k, talk, booth])
            refTab.sort(key=lambda x: x[0])
        
    print ("Referee: "+ ref)
    print (tabulate(refTab, headers = ['Time','Team','Talk','Poster']))
    print ("\n")
