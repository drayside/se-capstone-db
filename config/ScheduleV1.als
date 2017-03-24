module schedule

open util/ordering[Time] as TimeOrd
open util/ordering[SessionRoom1] as SessionRoom1Ord
open util/ordering[SessionRoom2] as SessionRoom2Ord



abstract sig Time {}
one sig Nine extends Time {} {Nine = TimeOrd/first[] }
one sig NineThirty extends Time {}{NineThirty= TimeOrd/next[Nine]}
one sig Ten extends Time {}{Ten = TimeOrd/next[NineThirty] }
one sig TenThirty extends Time {}{TenThirty = TimeOrd/next[Ten]}
one sig Eleven extends Time {}{Eleven = TimeOrd/next[TenThirty]}
one sig ElevenThirty extends Time {}{ElevenThirty = TimeOrd/next[Eleven]}
one sig Twelve extends Time {}{Twelve = TimeOrd/next[ElevenThirty]}
one sig TwelveThirty extends Time {}{TwelveThirty = TimeOrd/next[Twelve]}
one sig One extends Time {}{One = TimeOrd/next[TwelveThirty]}
one sig OneThirty extends Time {}{OneThirty = TimeOrd/next[One]}
one sig Two extends Time {}{Two = TimeOrd/next[OneThirty]}
one sig TwoThirty extends Time {}{TwoThirty = TimeOrd/next[Two]}
one sig Three extends Time {}{Three = TimeOrd/last[]}




abstract sig SessionRoom1
{
    time : one Time,
    team: lone Team,
}

abstract sig SessionRoom2 
{
    time : one Time,
    team: lone Team,
}



abstract sig Ref {
    RefTime: set Time
    // will be replaced by a constant function
    //AvailableTimes: some Time,
}

abstract sig Team {
    presRoom1: lone SessionRoom1,
    presRoom2Equiv: lone SessionRoom2,
    presRoom2: lone SessionRoom2,
    presRoom1Equiv: lone SessionRoom1
    // will be replaced by a constant function
    //refs: set Ref,
}

one sig badRefs {
    refs1: set Ref,
    refs2: set Ref
}




/* INSERT TEAMS HERE

one sig Team1 extends Team {}{refs = (Ref1 + Ref2 + Ref3 + Ref4)}
one sig Team2 extends Team {}{refs = (Ref4 + Ref2 + Ref3)}
one sig Team3 extends Team {}{refs = (Ref4 + Ref2 + Ref5)}
*/
/* INSERT REFS HERE

one sig Ref1  extends Ref  {}{AvailableTimes =  Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three + ThreeThirty}
one sig Ref2  extends Ref  {}{AvailableTimes = Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three + ThreeThirty }
one sig Ref3  extends Ref  {}{AvailableTimes = Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three + ThreeThirty}
one sig Ref4  extends Ref  {}{AvailableTimes = Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three + ThreeThirty }
one sig Ref5  extends Ref  {}{AvailableTimes = Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three + ThreeThirty}
*/





one sig Session1 extends SessionRoom1 {} { time = Nine Session1 = SessionRoom1Ord/first[]}
one sig Session2 extends SessionRoom1 {} { time = NineThirty  Session2 = SessionRoom1Ord/next[Session1]}
one sig Session3 extends SessionRoom1 {} { time = Ten  Session3 = SessionRoom1Ord/next[Session2]}
one sig Session4 extends SessionRoom1 {} { time = TenThirty  Session4 = SessionRoom1Ord/next[Session3]}
one sig Session5 extends SessionRoom1 {} { time = Eleven  Session5 = SessionRoom1Ord/next[Session4]}
one sig Session6 extends SessionRoom1 {} { time = ElevenThirty  Session6 = SessionRoom1Ord/next[Session5]}
one sig Session7 extends SessionRoom1 {} { time = Twelve  Session7 = SessionRoom1Ord/next[Session6]}
one sig Session8 extends SessionRoom1 {} { time = TwelveThirty  Session8 = SessionRoom1Ord/next[Session7]}
one sig Session9 extends SessionRoom1 {} { time = One Session9 = SessionRoom1Ord/next[Session8]}
one sig Session10 extends SessionRoom1 {} { time = OneThirty  Session10 = SessionRoom1Ord/next[Session9]}
one sig Session11 extends SessionRoom1 {} { time = Two  Session11 = SessionRoom1Ord/next[Session10]}
one sig Session12 extends SessionRoom1 {} { time = TwoThirty  Session12 = SessionRoom1Ord/next[Session11]}
one sig Session13 extends SessionRoom1 {} { time = Three Session13 = SessionRoom1Ord/last[]}

one sig SessionR1 extends SessionRoom2 {} { time = Nine SessionR1 = SessionRoom2Ord/first[]}
one sig SessionR2 extends SessionRoom2 {} { time = NineThirty  SessionR2 = SessionRoom2Ord/next[SessionR1]}
one sig SessionR3 extends SessionRoom2 {} { time = Ten  SessionR3 = SessionRoom2Ord/next[SessionR2]}
one sig SessionR4 extends SessionRoom2 {} { time = TenThirty  SessionR4 = SessionRoom2Ord/next[SessionR3]}
one sig SessionR5 extends SessionRoom2 {} { time = Eleven  SessionR5 = SessionRoom2Ord/next[SessionR4]}
one sig SessionR6 extends SessionRoom2 {} { time = ElevenThirty  SessionR6 = SessionRoom2Ord/next[SessionR5]}
one sig SessionR7 extends SessionRoom2 {} { time = Twelve  SessionR7 = SessionRoom2Ord/next[SessionR6]}
one sig SessionR8 extends SessionRoom2 {} { time = TwelveThirty  SessionR8 = SessionRoom2Ord/next[SessionR7]}
one sig SessionR9 extends SessionRoom2 {} { time = One SessionR9 = SessionRoom2Ord/next[SessionR8]}
one sig SessionR10 extends SessionRoom2 {} { time = OneThirty  SessionR10 = SessionRoom2Ord/next[SessionR9]}
one sig SessionR11 extends SessionRoom2 {} { time = Two  SessionR11 = SessionRoom2Ord/next[SessionR10]}
one sig SessionR12 extends SessionRoom2 {} { time = TwoThirty  SessionR12 = SessionRoom2Ord/next[SessionR11]}
one sig SessionR13 extends SessionRoom2 {} { time = Three SessionR13 = SessionRoom2Ord/last[]}















fact schedule {

    -- at most two teams on the ice  
    -- each team has at most one room equivalent (because they have one real room)
    all t: Team | no t.presRoom1Equiv || no t.presRoom2Equiv
    -- the room1 equivalent must be same time as room2 actual time
    all t:Team | no t.presRoom1 => t.presRoom1Equiv.time = t.presRoom2.time
    -- the room2 equivalent must be same time as room1 actual time
    all t:Team | no t.presRoom2 => t.presRoom2Equiv.time = t.presRoom1.time
    -- each team can only be in one room
    all t: Team | no t.presRoom1 or no t.presRoom2
    -- each ref can only be in one room at a same time
    all r: Ref, disjoint t1,t2:Team | r in t1.refs && r in t2.refs => (no t1.presRoom1 && t1.presRoom2.time != t2.presRoom1.time) || (no t1.presRoom2 && t1.presRoom1.time != t2.presRoom2.time)
    -- no two teams can  be in the same room
    all disjoint t1, t2: Team | t1.presRoom1 != t2.presRoom1 ||  t1.presRoom2 != t2.presRoom2
    -- ref time must be the same as presentation time
    all t : Team, r: Ref | r in t.refs => (no t.presRoom2 && t.presRoom1.time in r.RefTime || no t.presRoom1 && t.presRoom2.time in r.RefTime)
    -- no two sessions can have the same team
    all disjoint s1, s2: SessionRoom1 |  no s1.team || no s2.team || s1.team != s2.team
    all disjoint s1, s2: SessionRoom2 |  no s1.team || no s2.team || s1.team != s2.team
    all  s1:SessionRoom2, s2: SessionRoom1 |  no s1.team || no s2.team || s1.team != s2.team
    -- every teams presentation room has them as the presenter
    all  t : Team | t = t.presRoom1.team || t = t.presRoom2.team
    -- if remove this and works it means that some refs available times are conflicting -> not solvable under any circumstances
    -- refs only booked at their available times
    all r: Ref | r.RefTime in r.AvailableTimes
    all r:Ref,  s1:SessionRoom1, s2: SessionRoom2 | (s1.time = s2.time and s1.time in r.RefTime) => (r in s1.team.refs || r in s2.team.refs)
    -- this is trying to optimize times based on reoccuring refs -- ideally run without these lines, make sure everything else is okay then try running with this for optimization   
    all r:Ref, t:Time | (#(r.RefTime) = 2 && t in r.RefTime && (t.next not in r.RefTime) && (t.prev not in r.RefTime)  ) => (r in badRefs.refs1 || r in badRefs.refs2) 
    all r:Ref | (#(r.RefTime) = 2 && (Nine in r.RefTime && NineThirty not in r.RefTime) ||  (Three in r.RefTime && TwoThirty not in r.RefTime)) => (r in badRefs.refs1 || r in badRefs.refs2) 
    -- optimizating parameters -- we need two in order to solve bit depth issue
    #(badRefs.refs2) < 2
    #(badRefs.refs2) > 0
    #(badRefs.refs1) < 3
    #(badRefs.refs1) > 0
    --all t:Time, r:Ref, disjoint t1, t2:Team | (r in t1.refs && r in t2.refs && t in r.AvailableTimes && (t = t1.presRoom1.time || t = t1.presRoom2.time) &&  (t.next in r.AvailableTimes || t.prev in r.AvailableTimes)) =>   
    --(
        --(  r in t1.presRoom1.next.team.refs || r in t1.presRoom1.prev.team.refs ||  r in t1.presRoom2Equiv.next.team.refs ||  r in t1.presRoom2Equiv.prev.team.refs) ||
        --(  r in t1.presRoom2.prev.team.refs ||  r in t1.presRoom2.next.team.refs ||  r in t1.presRoom1Equiv.prev.team.refs || r in t1.presRoom1Equiv.next.team.refs) 
    --)


    
}

pred show() {
   
}

run show 
