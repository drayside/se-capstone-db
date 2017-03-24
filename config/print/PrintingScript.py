from tabulate import tabulate
from lxml import etree
import subprocess
import sys
import os

tree = etree.parse(sys.argv[1])
root = tree.getroot()

TimeSessionMapping = {}
TeamSessionMapping = {}
RefTeamMapping = {}
RefTeamNameMapping = {}
Results = []
Refs = []
timeToIntMap = {'9:00AM':0,
              '9:30AM':1,
              '10:00AM':2,
              '10:30AM':3,
              '11:00AM':4,
              '11:30AM':5,
              '12:00PM':6,
              '12:30PM':7,
              '1:00PM':8,
              '1:30PM':9,
              '2:00PM':10,
              '2:30PM':11,
              '3:00PM':12}

timeToProperTimeMap = {'Nine':'9:00AM',
              'NineThirty':'9:30AM',
              'Ten':'10:00AM',
              'TenThirty':'10:30AM',
              'Eleven':'11:00AM',
              'ElevenThirty':'11:30AM',
              'Twelve':'12:00PM',
              'TwelveThirty':'12:30PM',
              'One':'1:00PM',
              'OneThirty':'1:30PM',
              'Two':'2:00PM',
              'TwoThirty':'2:30PM',
              'Three':'3:00PM'}

roomToProperRoomMap = {
            'Room 1': 'DC1304',
            'Room 2': 'DC1306',
        }

teamToNamesMap = {
        'Team18': 'Minerva',
        'Team25': 'Delta',
        'Team20': 'JASON',
        'Team29': 'CLAC',
        'Team6': 'Web In A Box',
        'Team16': 'Closed for Refactoring',
        'Team5': 'InternCompass',
        'Team30': 'Capital Software',
        'Team7': 'MediReadi',
        'Team19': 'Xylo',
        'Team15': 'Dynalist',
        'Team23': 'homely.rent',
        'Team17': 'Qube',
        'Team24': 'Songhaus',
        'Team3':  'ROCKIT',
        'Team11': 'Evan\'s Rules',
        'Team2':  'STORM',
        'Team4':  'Speculative Execution',
        'Team27': 'Frustra',
        'Team26': 'SAT',
        'Team21': 'ReadYourStory',
        'Team9':  'Manifold',
        'Team12': 'Kaiba Corp.',
        'Team13': 'Patronus',
        'Team28': 'Propelme',
        'Team14': 'Calligre',
}

refereeToRefereeNames = {
        'tianyuyang658': 'Tony Yang',
        'andrew_morton': 'Andrew Morton',
        'tripunit': 'Mahesh Tripunitara',
        'iivkovic': 'Igor Ivkovic',
        'broehl': 'Bernie Roehl',
        'rs2dsouz': 'Rollen D\'Souza',
        'chantellegellert': 'Chantelle Gellert',
        'ramelard': 'Robert Amelard',
        'carlos_moreno': 'Carlos Moreno',
        'murphy_berzish': 'Murphy Berzish',
        'dhshin': 'Donghyun Shin',
        'wmcowan': 'William Cowan',
        'wgolab': 'Wojcieh Golab',
        'a3zaman': 'Atulan Zaman',
        'jeff_zarnett': 'Jeff Zarnett',
        'dblotsky': 'Dmitry Blotsky',
        'jimmylin': 'Jimmy Lin',
        'jmatlee': 'Joanne Atlee',
        'allyson_giannikouris': 'Allyson Giannikouris',
        'winkler_em': 'Eric Winkler',
        'kepaik': 'Kenneth Paik',
        'csk': 'Craig Kaplan',
        'drayside': 'Derek Rayside',
        'se_director': 'Patrick Lam',
        'kevin': 'Kevin Veloso',
        'whchang': 'Wayne Chang',
        'pasward': 'Paul Ward',
        'bwbecker': 'Byron Weber Becker',
        'eric_bahn': 'Eric Bahn',
        'dan_brown': 'Dan Brown',
        's26stewa': 'Steven Stewart',
        'gvgbaran': 'Gladimir Baranoski',
        'idziak': 'Stefan Idziak',
        'mvucicev': 'Mirko Vucicevich',
}


for c in root.find('instance').findall('field'):
    if (c.get('label') == 'refs'):
        for p in c.findall('tuple'):
            team = p.findall('atom')[0].get('label').replace("$0","")
            ref = p.findall('atom')[1].get('label').replace("$0","")
            if (team not in RefTeamMapping):
                RefTeamMapping[team] = ""
                RefTeamNameMapping[team] = ""
            if(ref not in Refs):
                Refs.append(ref)
            RefTeamMapping[team] =  RefTeamMapping[team] + " " + ref
            RefTeamNameMapping[team] = RefTeamNameMapping[team] + (", " if RefTeamNameMapping[team] != "" else "") + " " + refereeToRefereeNames[ref]

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
                SessionRoom = "Room 1"
                Results.append([
                    teamXML,
                    teamToNamesMap[teamXML],
                    timeToProperTimeMap[time],
                    roomToProperRoomMap[SessionRoom],
                    RefTeamNameMapping[teamXML]
                ])
                TeamSessionMapping[teamXML]= [time, "Room 1"]
            else:
                SessionRoom = "Room 2"
                TeamSessionMapping[teamXML]=[time, "Room 2"]
                Results.append([
                    teamXML,
                    teamToNamesMap[teamXML],
                    timeToProperTimeMap[time],
                    roomToProperRoomMap[SessionRoom],
                    RefTeamNameMapping[teamXML]
                ])

# print team schedule to file

team_schedule_file = open('team_schedule.txt', 'w');
team_schedule_file.write(tabulate(Results, headers=['Team#', 'Team Name', 'Time', 'Room','Refs']))
team_schedule_file.close()

printScript = open('lprcommands.sh', 'w');
printScript.write('#/bin/bash\n\n');

for ref in Refs:
    refTab = []
    teamString = [];
    ref_file = open(ref + '_schedule.txt', 'w')
    for k, v in RefTeamMapping.items():
        if ref in v:
            time = TeamSessionMapping[k][0]
            loc = TeamSessionMapping[k][1]
            # hack to give spacing in tabulate
            refTab.append([
                timeToProperTimeMap[time],
                teamToNamesMap[k],
                roomToProperRoomMap[loc],
            ])
            teamString.append('lpr -P pdf ' + k + '.pdf');
            refTab.sort(key=lambda x: timeToIntMap[x[0]])

    # ugly hack to add left + top padding to table
    ref_file.write("\n\n\n\n");
    ref_file.write("\t\t\t\tReferee: " + refereeToRefereeNames[ref] + '\n\n');
    table = tabulate(refTab, headers = ['Time','Team','Location']);
    tableArray = [s.strip() for s in table.splitlines()]
    for t in tableArray:
        ref_file.write("\t\t\t\t" + t + '\n')
    ref_file.close()

    # before printing, change 'echo ' to 'lpr' and add printer
    # subprocess.Popen(['lpr', '-Pcseng-prn', ref + '_schedule.txt']);
    printScript.write('lpr -P pdf ' + ref + '_schedule.txt' + '\n');

    # uncomment once team files are in the directory.
    # for k in teamString:
    #    printScript.write(k + '\n');
    printScript.write('\n\n');

printScript.close()
