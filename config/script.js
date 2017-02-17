const assert = require('assert');

const lookup = {
  9 : 'Nine',
  9.5 : 'NineThirty',
  10 : 'Ten',
  10.5 : 'TenThirty',
  11 : 'Eleven',
  11.5 : 'ElevenThirty',
  12 : 'Twelve',
  12.5 : 'TwelveThirty',
  13 : 'One',
  13.5 : 'OneThirty',
  14 : 'Two',
  14.5 : 'TwoThirty',
  15 : 'Three',
  15.5 : 'ThreeThirty',
  16 : 'Four',
  16.5 : 'FourThirty',
  17 : 'Five'
};

/*
Precondition:
  start, end are floats such that
  9.0 <= start < end <= 17 (24 hour)
Postcondition:
  prints all 1/2 hour time intervals
  that fall between start and end

ex: parse_time_interval(9.5, 12.5)
    => prints "NineThirty, Ten, TenThirty, Eleven, ElevenThirty, Twelve"
*/

var parse_time_interval = function(start, end) {

 assert(start < end, 'start < end - constraint violated');
 assert((start>= 9.0 && start <= 16.5), 'Symposium Day start time  [9-16.5] range violated');
 assert((end>= 9.5 && end <= 17) || (end >= 1.0 && end <= 5.0), 'Symposium Day end time [9.5-5] range violated');

  var list  = [];
  var t = start;
  for (;;) {
    assert(t in lookup, 'time out of range for symposium day');
    list.push(lookup[t]);

    var next = t + 0.5;

    if ( end > next ) {
      t = next;
    } else {
      break;
    }
  }
  return list.toString().replace(/,/g," + ");
}
/*
full_day = parse_time_interval(9,17);
console.log("full day \n", full_day);

morning = parse_time_interval(9,12);

console.log("morning \n", morning);

afternoon = parse_time_interval(13,17);
console.log("afternoon\n", afternoon);
*/
