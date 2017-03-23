from tabulate import tabulate
from lxml import etree
import sys

tree = etree.parse(sys.argv[1])
root = tree.getroot()

TeamSessionMapping = {}
RefTeamMapping = {}
Results = []


for c in root.find('instance').findall('field'):
    if (c.get('label') == 'refs'):
        for p in c.findall('tuple'):
            if (p.findall('atom')[0].get('label') not in RefTeamMapping):
                RefTeamMapping[p.findall('atom')[0].get('label')] = ""
            RefTeamMapping[p.findall('atom')[0].get('label')] =  RefTeamMapping[p.findall('atom')[0].get('label')] + " " + p.findall('atom')[1].get('label')      

for c in root.find('instance').findall('field'):
    if (c.get('label') == 'time'): 
        for p in c.findall('tuple'):
            TeamSessionMapping[p.findall('atom')[0].get('label')] = p.findall('atom')[1].get('label')

for c in root.find('instance').findall('field'):
    if (c.get('label') == 'team'):
        for p in c.findall('tuple'):
            z = TeamSessionMapping[p.findall('atom')[0].get('label')]
            if ("R" not in p.findall('atom')[0].get('label')):

                Results.append([p.findall('atom')[1].get('label'), z + " Room 1", RefTeamMapping[p.findall('atom')[1].get('label')]])
            else:
                Results.append([p.findall('atom')[1].get('label'),  z + " Room 2", RefTeamMapping[p.findall('atom')[1].get('label')]])
print tabulate(Results, headers=['Team', 'Time/Room','Refs'])
