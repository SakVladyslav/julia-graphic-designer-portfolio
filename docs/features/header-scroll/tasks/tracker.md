# Tracker — header-scroll

> Status of every task in the epic. `implement` updates **Status** and **Step** after every
> subagent it runs (and commits them with the task), so this table shows where the run is right now.
> Status: `todo` · `in_progress` · `blocked` · `review` · `done`.
> Step: `SELECT` · `RED` · `GREEN` · `REFACTOR` · `GATE` · `REVIEW` · `COMMIT` (`—` before the task starts).
> A `blocked` row carries its reason in Step, e.g. `GATE — lint red after 3 retries`.

| #   | Task                                                | Layer  | Owner     | Estimate | Blocked by | Status | Step |
| --- | --------------------------------------------------- | ------ | --------- | -------- | ---------- | ------ | ---- |
| T1  | Decide hide and pin from scroll travel              | domain | Tech Lead | S        | —          | done   | COMMIT |
| T2  | Rest the header when the page is at the top         | domain | Tech Lead | S        | T1         | todo   | —    |
| T3  | Hold the phase and reveal a hidden header on focus  | domain | Tech Lead | S        | T2         | todo   | —    |
| T4  | Match jumps and replace an unfinished move          | domain | Tech Lead | S        | T3         | todo   | —    |
| T5  | Choose slide, fade, or no motion                    | domain | Tech Lead | S        | T4         | todo   | —    |
| T6  | Fix the header to the viewport and move the clip    | ui     | Tech Lead | S        | —          | todo   | —    |
| T7  | Paint resting, pinned, and hidden looks             | ui     | Tech Lead | M        | T6         | todo   | —    |
| T8  | Apply the scroll phase when the page is interactive | ui     | Tech Lead | M        | T5, T7     | todo   | —    |
| T9  | Keep the header on screen while it is in use        | ui     | Tech Lead | S        | T8         | todo   | —    |
| T10 | Offset in-page targets by the pinned header height  | ui     | Tech Lead | S        | T7         | todo   | —    |

**Total:** 10 tasks, ~2 person-days. Feature size XS. The two lanes overlap, so the critical path is T1 through T5, then T8 and T9.
