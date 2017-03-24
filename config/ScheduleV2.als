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
    RefTime: set Time,

    // will be replaced by a constant function
    //Remote: Int, 
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




one sig tianyuyang658 extends Ref{}
one sig andrew_morton extends Ref{}
one sig tripunit extends Ref{}
one sig iivkovic extends Ref{}
one sig broehl extends Ref{}
one sig rs2dsouz extends Ref{}
one sig chantellegellert extends Ref{}
one sig ramelard extends Ref{}
one sig carlos_moreno extends Ref{}
one sig murphy_berzish extends Ref{}
one sig dhshin extends Ref{}
one sig wmcowan extends Ref{}
one sig wgolab extends Ref{}
one sig a3zaman extends Ref{}
one sig jeff_zarnett extends Ref{}
one sig dblotsky extends Ref{}
one sig jimmylin extends Ref{}
one sig jmatlee extends Ref{}
one sig allyson_giannikouris extends Ref{}
one sig drayside extends Ref{}
one sig winkler_em extends Ref{}
one sig kepaik extends Ref{}
one sig csk extends Ref{}
one sig se_director extends Ref{}
one sig kevin extends Ref{}
one sig whchang extends Ref{}
one sig pasward extends Ref{}
one sig bwbecker extends Ref{}
one sig eric_bahn extends Ref{}
one sig dan_brown extends Ref{}
one sig s26stewa extends Ref{}
one sig gvgbaran extends Ref{}
one sig idziak extends Ref{}
one sig mvucicev extends Ref{}


fun Remote : Ref {
  	winkler_em
 + 	kepaik
 + 	eric_bahn
}

fun AvailableTimes : Ref -> Time {
	tianyuyang658 -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	andrew_morton -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty)
 + 	tripunit -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	iivkovic -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty)
 + 	broehl -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One)
 + 	rs2dsouz -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	chantellegellert -> (Nine + NineThirty + ElevenThirty + Twelve + TwelveThirty + TwoThirty + Three)
 + 	ramelard -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One)
 + 	carlos_moreno -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	murphy_berzish -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	dhshin -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two)
 + 	wmcowan -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	wgolab -> (TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	a3zaman -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	jeff_zarnett -> (ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	dblotsky -> (Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	jimmylin -> (Eleven + ElevenThirty + Three)
 + 	jmatlee -> (Eleven + ElevenThirty + Twelve + TwelveThirty + One)
 + 	allyson_giannikouris -> (One + OneThirty + Two + TwoThirty + Three)
 + 	drayside -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	winkler_em -> (Nine + NineThirty + Ten + TenThirty)
 + 	kepaik -> (Nine + NineThirty + Ten + TenThirty)
 + 	csk -> (OneThirty)
 + 	se_director -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	kevin -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	whchang -> (OneThirty + Two + TwoThirty)
 + 	pasward -> (Two + TwoThirty + Three)
 + 	bwbecker -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	eric_bahn -> (Ten + TenThirty + TwelveThirty + One + OneThirty + Two + TwoThirty + Three)
 + 	dan_brown -> (Nine + NineThirty + Ten + TenThirty + Eleven + ElevenThirty + Twelve + TwelveThirty + One)
 + 	s26stewa -> (ElevenThirty + Twelve + TwelveThirty)
 + 	gvgbaran -> (ElevenThirty + OneThirty + Two)
 + 	idziak -> (TenThirty)
 + 	mvucicev -> (TenThirty)
}



one sig Team2 extends Team {}
one sig Team3 extends Team {}
one sig Team4 extends Team {}
one sig Team5 extends Team {}
one sig Team6 extends Team {}
one sig Team7 extends Team {}
one sig Team9 extends Team {}
one sig Team11 extends Team {}
one sig Team12 extends Team {}
one sig Team13 extends Team {}
one sig Team14 extends Team {}
one sig Team15 extends Team {}
one sig Team16 extends Team {}
one sig Team17 extends Team {}
one sig Team18 extends Team {}
one sig Team19 extends Team {}
one sig Team20 extends Team {}
one sig Team21 extends Team {}
one sig Team23 extends Team {}
one sig Team24 extends Team {}
one sig Team25 extends Team {}
one sig Team26 extends Team {}
one sig Team27 extends Team {}
one sig Team28 extends Team {}
one sig Team29 extends Team {}
one sig Team30 extends Team {}



fun refs : Team -> Ref {
 	Team2 -> (tianyuyang658 + andrew_morton + tripunit + iivkovic + broehl)
 + 	Team3 -> (rs2dsouz + chantellegellert + ramelard)
 + 	Team4 -> (andrew_morton + carlos_moreno + murphy_berzish + dhshin + wmcowan + wgolab)
 + 	Team5 -> (a3zaman + jeff_zarnett + dblotsky)
 + 	Team6 -> (jimmylin + tripunit + jmatlee + ramelard)
 + 	Team7 -> (tianyuyang658 + rs2dsouz + allyson_giannikouris)
 + 	Team9 -> (murphy_berzish + a3zaman + dhshin + drayside)
 + 	Team11 -> (winkler_em + kepaik + drayside + a3zaman)
 + 	Team12 -> (tianyuyang658 + rs2dsouz + csk)
 + 	Team13 -> (a3zaman + drayside + se_director)
 + 	Team14 -> (rs2dsouz + chantellegellert + jeff_zarnett)
 + 	Team15 -> (kevin + tianyuyang658 + dhshin + whchang)
 + 	Team16 -> (chantellegellert + broehl + jeff_zarnett)
 + 	Team17 -> (tianyuyang658 + pasward + wgolab)
 + 	Team18 -> (murphy_berzish + bwbecker + a3zaman + chantellegellert + drayside)
 + 	Team19 -> (kevin + se_director + allyson_giannikouris)
 + 	Team20 -> (kevin + murphy_berzish + dblotsky + drayside)
 + 	Team21 -> (tianyuyang658 + eric_bahn + jmatlee + drayside)
 + 	Team23 -> (a3zaman + pasward + se_director)
 + 	Team24 -> (dan_brown + ramelard + broehl)
 + 	Team25 -> (winkler_em + kepaik + drayside + a3zaman)
 + 	Team26 -> (s26stewa + murphy_berzish + dhshin + dblotsky)
 + 	Team27 -> (kevin + dhshin + rs2dsouz + gvgbaran)
 + 	Team28 -> (chantellegellert + allyson_giannikouris + dblotsky)
 + 	Team29 -> (kevin + idziak + mvucicev)
 + 	Team30 -> (kevin + s26stewa + murphy_berzish + dhshin + drayside)
}

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
   -- all remote refs in room 1
   all  t : Team, r : Ref | (r in t.refs && r in Remote) => no t.presRoom1
   -- side by side refs must be in same room
   all  t1, t2 : Team, r:(Ref-jmatlee-tripunit-pasward-andrew_morton)  | (r in t1.refs && r in t2.refs && (#(r.RefTime) = 2 || r = drayside)) => ((no t1.presRoom1 && no t2.presRoom1) ||(no t1.presRoom2 && no t2.presRoom2))    
    -- if remove this and works it means that some refs available times are conflicting -> not solvable under any circumstances
    -- refs only booked at their available times
    all r: Ref | r.RefTime in r.AvailableTimes
    all r:Ref,  s1:SessionRoom1, s2: SessionRoom2 | (s1.time = s2.time and s1.time in r.RefTime) => (r in s1.team.refs || r in s2.team.refs)
    -- this is trying to optimize times based on reoccuring refs -- ideally run without these lines, make sure everything else is okay then try running with this for optimization   
    all r:Ref, t:Time | (#(r.RefTime) = 2 && t in r.RefTime && (t.next not in r.RefTime) && (t.prev not in r.RefTime)  ) => (r in badRefs.refs1 || r in badRefs.refs2) 
    all r:Ref | (#(r.RefTime) = 2 && (Nine in r.RefTime && NineThirty not in r.RefTime) ||  (Three in r.RefTime && TwoThirty not in r.RefTime)) => (r in badRefs.refs1 || r in badRefs.refs2) 
    -- optimizating parameters -- we need two in order to solve bit depth issue
    #(badRefs.refs2) < 3
    #(badRefs.refs2) > 0
    #(badRefs.refs1) < 4
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
