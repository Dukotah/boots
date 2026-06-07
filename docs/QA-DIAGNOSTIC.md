# Cantrip — QA Diagnostic Report

Generated from a manual exploratory test pass of the deployed app. Intended as a worklist for Claude Code: each item has a location, expected vs. actual behavior, and a suggested fix. Severity: P1 = functional/data bug, P2 = polish/UX, P3 = minor.

- Build under test: https://boots-74u1s8wif-dukotahs-projects.vercel.app
- - Date: 2026-06-06
  - - Console health: No console errors or exceptions observed on any page tested.
   
    - ## Working as intended (verified — do not "fix")
   
    - - Lesson test runner: pass/fail with Expected-vs-Got diff, confetti + "Completed" state.
      - - Lesson completion persists across navigation.
        - - Drag-and-drop "Code Blocks" builder, Hint, and Reset controls.
          - - Free on-device WebGPU tutor returns correct, contextual Socratic hints.
            - - Paths multi-step wizard (goal -> language) with working Back.
              - - Playground executes locally for JavaScript, Python (Pyodide), and SQL (SQLite/WASM).
                - - Pricing math is correct: $19/mo monthly vs $9/mo annual (~53% off).
                  - - Branded 404 page with recovery CTAs (Browse courses / Go home).
                   
                    - Non-bug note: The first beginner lesson test expects answer() to return 42. This is correct — the "Your task" panel explicitly asks for 42. The teaching example uses 7, which is intentional. No change needed.
                   
                    - ## P1 — Functional / data-consistency bugs
                   
                    - ### 1. Streak counter disagreement between nav and Daily page
                    - - Where: Top nav streak badge vs. /daily "Day streak" card.
                      - - Observed: After completing a lesson, nav badge shows streak = 1, but /daily shows Day streak = 0.
                        - - Expected: Both read the same source of truth.
                          - - Fix: Derive the streak from a single shared store/selector for both nav and Daily.
                           
                            - ### 2. Career page progress bar vs. label mismatch
                            - - Where: /career -> "Lessons practiced" row.
                              - - Observed: Progress bar shows 0/15 while the sub-label reads "1 lessons completed".
                                - - Expected: Bar and label use the same count.
                                  - - Fix: Bind the bar fill and label text to the same value; audit other rows for the same pattern.
                                   
                                    - ### 3. XP award shows "+0 XP" on lesson completion
                                    - - Where: Lesson completion banner (e.g. /learn/beginner/first-function).
                                      - - Observed: Lesson advertises 15 XP, but on pass the banner reads "All tests passed! +0 XP".
                                        - - Likely cause: XP not granted for signed-out users.
                                          - - Fix: If signed out, show "Sign in to earn XP" instead of "+0 XP"; otherwise award the advertised amount.
                                           
                                            - ### 4. "Explain this to me" button is a dead-end for locked users
                                            - - Where: In-lesson "Explain this to me" button (Pro Ask Cantrip Socratic tutor).
                                              - - Observed: Clicking while locked gives no visible feedback. The "Unlock with Pro" paywall only appears if the user separately expands the lower Ask Cantrip panel.
                                                - - Expected: Clicking a locked feature should surface the paywall or a tooltip.
                                                  - - Fix: On click while locked, expand/scroll to the Ask Cantrip panel or show an inline "Unlock with Pro" popover.
                                                   
                                                    - ## P2 — UX / polish
                                                   
                                                    - ### 5. Intermediate project awards less XP than Beginner projects
                                                    - - Where: /projects.
                                                      - - Observed: Beginner builds award +40/+45 XP; Intermediate "Word Frequency Counter" awards +35 XP.
                                                        - - Fix: Review the XP curve so difficulty and reward are monotonic (or confirm intentional).
                                                         
                                                          - ### 6. In-lesson code editor is over-tall
                                                          - - Where: Lesson view code editor.
                                                            - - Observed: Editor reserves a large fixed height, leaving an empty void that pushes Run & Test and results far down.
                                                              - - Fix: Size the editor to content (min-height + grow), or place Run & Test and results adjacent to the editor.
                                                               
                                                                - ### 7. Transient blank-screen flashes on long pages
                                                                - - Where: /learn, /skill-tree and other long pages on jump-to-top / fast scroll.
                                                                  - - Observed: Screen briefly renders fully blank, then content mounts after a small nudge.
                                                                    - - Fix: Investigate lazy-mount/scroll-restoration timing; ensure above-the-fold content renders immediately.
                                                                     
                                                                      - ### 8. No search on the course catalog
                                                                      - - Where: /learn (advertises 95 courses, 672 lessons).
                                                                        - - Observed: Discovery relies on scrolling and category chips; no search box.
                                                                          - - Fix: Add a course/lesson search/filter input.
                                                                           
                                                                            - ### 9. Notification bell badge has no destination
                                                                            - - Where: Top nav bell.
                                                                              - - Observed: Bell shows a "3" badge after activity, with no visible panel/page explaining it.
                                                                                - - Fix: Wire the bell to a notifications panel, or hide the badge until actionable.
                                                                                 
                                                                                  - ### 10. Mobile navigation may not collapse
                                                                                  - - Where: Top nav (8 items + status pills).
                                                                                    - - Observed: At a 390px window the wide desktop nav appeared to persist (confirm on a real device).
                                                                                      - - Fix: Verify responsive breakpoints; collapse nav into a hamburger on small screens.
                                                                                       
                                                                                        - ## P3 — Minor
                                                                                       
                                                                                        - ### 11. Inconsistent / generic page titles
                                                                                        - - Where: /daily, /projects, /career, /skill-tree use the generic site title, while /learn, /playground, /paths, /pricing have page-specific titles.
                                                                                          - - Fix: Add per-route title/metadata for SEO and browser-tab clarity.
                                                                                           
                                                                                            - ### 12. Grammar: "1 lessons"
                                                                                            - - Where: /career ("1 lessons completed").
                                                                                              - - Fix: Pluralize based on count ("1 lesson" / "N lessons").
                                                                                               
                                                                                                - ## Suggested triage order
                                                                                                - 1. #1, #2, #3 (data correctness).
                                                                                                  2. 2. #4 (locked-feature dead-end).
                                                                                                     3. 3. #6, #7 (core-loop friction).
                                                                                                        4. 4. Remaining P2/P3 polish.
                                                                                                           5. 
