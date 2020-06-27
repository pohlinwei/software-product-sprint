// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    List<String> relevantAttendees = new ArrayList<>();
    request.getAttendees().forEach(attendee -> relevantAttendees.add(attendee));

    List<TimeRange> affectedTimeRanges = new ArrayList<>(); 
    // get all affected time ranges
    for (Event event : events) {
      Set<String> scheduledAttendees = event.getAttendees(); 
      for (String attendee : relevantAttendees) {
        if (scheduledAttendees.contains(attendee)) {
          // this event affects the final result
          affectedTimeRanges.add(event.getWhen());
          break;
        }
      }
    }

    long minRequiredDuration = request.getDuration();
    long maxDuration = TimeRange.fromStartEnd(TimeRange.START_OF_DAY, TimeRange.END_OF_DAY, true).duration();

    List<TimeRange> availableRanges = new ArrayList<>();
    if (minRequiredDuration > maxDuration) {
      return availableRanges;
    } else if (affectedTimeRanges.isEmpty()) {
      availableRanges.add(TimeRange.WHOLE_DAY);
      return availableRanges;
    }

    // sort by start time
    Collections.sort(affectedTimeRanges, TimeRange.ORDER_BY_START);

    // add dummy time range to account for an available time range which starts at START_OF_DAY
    TimeRange dummyAffectedTimeRange = TimeRange.fromStartDuration(TimeRange.START_OF_DAY, 0);
    affectedTimeRanges.add(0, dummyAffectedTimeRange);
    
    TimeRange endsLastSoFar = affectedTimeRanges.get(1); // must exist since affectedTimeRanges was initially non-empty
    for (TimeRange currRange: affectedTimeRanges) {
      if (currRange.overlaps(endsLastSoFar)) {
        // choose the one that ends later
        endsLastSoFar = endsLastSoFar.end() > currRange.end() ? endsLastSoFar : currRange;
        continue;
      } 

      // possibly found new available slot
      int rangeStartTime = endsLastSoFar.end();
      int rangeEndTime = currRange.start();
      TimeRange potentialRange = TimeRange.fromStartEnd(rangeStartTime, rangeEndTime, 
          /* inclusive= */ false);
      endsLastSoFar = currRange;

      if (potentialRange.duration() < minRequiredDuration) {
        continue; // duration is too short
      }
      availableRanges.add(potentialRange);
    }

    // consider the possibility of a range that ends at END
    int potentialLastStartTime = endsLastSoFar.end();
    TimeRange potentialLastRange = TimeRange.fromStartEnd(
        potentialLastStartTime, TimeRange.END_OF_DAY, true);
    if (potentialLastRange.duration() >= minRequiredDuration) {
      availableRanges.add(potentialLastRange);
    }

    return availableRanges;
  }
}
