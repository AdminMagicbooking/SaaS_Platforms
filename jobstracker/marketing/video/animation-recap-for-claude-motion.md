# Jobs Tracker animation — production recap and Claude Motion handoff

This document records what we made and provides the complete brief for reproducing it in Claude Motion for comparison. The current approved length is **90 seconds**.

## 1. The original request

Create an enjoyable, funny animated product presentation for **Jobs Tracker**, aimed at UK trade and maintenance contractors.

Start with an office manager struggling with:

- Incoming enquiries and constant interruptions.
- Communication between the office and engineers.
- Not knowing where the vans are.
- Limited visibility of what is happening on site.
- Site variations and additional work being missed.
- Parts requests and materials falling between the cracks.
- Collecting, consolidating and checking workers' timesheets.

Then show how **jobstracker.work** connects the office, engineers and vans, reduces chasing and retyping, and gives the manager more time back.

The user requested voiceover and background music, then asked for stronger humour and a younger, more dynamic voice with dry, cheeky British comic energy.

## 2. How the brief evolved

1. We reviewed both pages of the supplied product PDF and its visual identity.
2. We drafted an approximately 90-second before-and-after story.
3. The user requested two minutes to give the humour more room.
4. We built a 120-second animated film around a fictional office manager, Dave.
5. The first narration used the Arthur voice preset.
6. The user requested a younger, more dynamic delivery, referencing Ricky Gervais as creative inspiration.
7. We generated a new narration using the distinct **Archie** preset, with a brighter pitch. This was not a celebrity voice clone.
8. The user then preferred 90 seconds.
9. We rewrote the narration to 169 words, retimed the animation, shortened speech pauses, and re-edited the music and effects.
10. We exported and verified the final 90-second MP4.

**Use the final brief below for the comparison. The earlier two-minute version is superseded by the 90-second cut.**

## 3. What actually produced the film

The work used the **Higgsfield plugin**, but the visuals were built as native, code-authored **Higgsedit motion graphics**. They were not generated as text-to-video clips.

The production combined:

- Native vector shapes, paths, icons, text and imported logo artwork.
- Reusable illustrated office-manager, engineer, van, office and mug components.
- Keyframed character reactions, arm movements, blinking, message entrances, moving vans and connecting records.
- Higgsfield **Seed Audio** text-to-speech for the narration.
- Python/NumPy synthesis for an original instrumental score and short sound effects.
- Faster Whisper word timestamps to align narration with the scenes.
- FFmpeg for fitting audio, final mixing, loudness normalization, MP4 finishing and verification.
- Native frame renders and contact sheets for visual checks.

The overall visual treatment is a clean, flat 2D illustrated explainer with motion graphics. It uses composed scenes and conceptual product workflows.

## 4. Creative direction

### Story

**Office chaos → one connected system → a calmer working day.**

Dave is a capable office manager. Disconnected information and fragmented systems create the problem. The engineers are likeable professionals.

The recurring tea joke holds the story together:

- Dave starts with a mug of tea.
- Interruptions stop him enjoying it.
- As the day becomes more chaotic, the tea becomes visibly cold.
- Once Jobs Tracker brings the information together, Dave finally enjoys hot tea.

### Humour

Use warm, dry workplace comedy and recognisable situations:

- Messages marked “urgent”, “very urgent” and “just a quick one”.
- The missing part everyone thought “someone else” ordered.
- Friday's timesheet treasure hunt.
- A sandwich receipt turning up among the timesheet information.
- Dave's exaggerated detective routine.
- The final hot-tea payoff.

Use short reaction beats, facial expressions, accumulating objects and visual callbacks. Keep the humour friendly and suitable for a client presentation.

### Character continuity

**Dave:** a friendly illustrated office manager with swept brown hair, glasses, a teal jumper, light collar, dark trousers and an expressive face. His desk, monitor, office window, plant, wall clock and mug recur throughout the film.

**Engineer:** an illustrated field worker in teal clothing, lime high-visibility details, hard hat and dark trousers, using a phone.

**Vans:** stylised teal vans with dark wheels, light windows and a simple lime graphic.

### Visual identity

The supplied PDF guided the design. These are the colours used in the animation source:

| Role | Colour |
|---|---|
| Main navy background | #101C24 |
| Dark panel | #1B303B |
| Muted text | #9FB6B8 |
| Lime accent / positive state | #C1F46E |
| Teal accent / connection | #06ABA7 |
| Cream stage / interface panel | #F4F1E8 |
| Paper | #FFFDF6 |
| Dark illustration ink | #133246 |
| Warm skin tone | #EFB99B |
| Hair / desk accents | #503D35 |
| Coral / interruptions | #FA856E |
| Light blue / cold tea / windows | #AFD7E6 |

Use **Inter** for titles, labels and body text. A monospaced receipt treatment uses **JetBrains Mono**.

The original composition uses a small logo at the top left, a consistent brand line at the top right, a small website footer and a thin progress line. A larger logo and clearly readable URL appear on the final card.

## 5. Final 90-second storyboard

| Time | Duration | Scene and animation | Main screen message |
|---|---:|---|---|
| 00–05 | 5s | Introduce Dave at his desk with fresh tea. A ringing-phone bubble interrupts him. | Meet Dave. |
| 05–12 | 7s | Dave looks worried. Enquiries, loose papers and message cards accumulate. Stagger the urgent messages and “quick one”. | Everything is urgent. |
| 12–21 | 9s | Three illustrated panels: van-location uncertainty, an engineer's site update buried in messages, and an empty parts box. Reveal “Nobody.” as the missing-part punchline. | Anyone know…? |
| 21–28 | 7s | Friday's timesheet hunt. Show the office, a text, a spreadsheet, a sandwich receipt and a magnifying-glass prop. Dave's tea is now cold. | The timesheet treasure hunt. |
| 28–34 | 6s | Jobs Tracker reveal. Connect office, jobs, engineers and vans around the logo. Shift the mood and music towards clarity. | Office + field. One system. |
| 34–44 | 10s | Enquiry → quote → assigned job. Then show an office message and a worker reply attached to one job record. | Less re-keying. More clarity. |
| 44–55 | 11s | An engineer's phone shows a site photo. The office job record receives the photo, variation and materials / purchase-order information. | See the site. Capture the detail. |
| 55–64 | 9s | Vans move along a clear illustrated map with job and engineer markers. | The vans are on the map. |
| 64–75 | 11s | GPS tap-in/out events populate a weekly timesheet. Show review and approval explicitly, followed by readiness for Sage or Xero export. | Friday just got less interesting. |
| 75–83 | 8s | Return to the same office. Dave is relaxed and lifts the hot mug to his mouth. | More time back. |
| 83–90 | 7s | Clean end card with logo, slogan, demo CTA and a large readable URL. | From dispatch to done. Book your demo. |

The product appears at **28 seconds**. The last **seven seconds** are reserved for the brand and demo call to action.

## 6. Final narration — use this script

The following eleven paragraphs correspond to the eleven scenes above. This is the 169-word script supplied to speech generation.

> Meet Dave! Busy trade office. His tea? Always cold.

> Enquiries, calls, and messages marked urgent, very urgent, and “just a quick one.”

> Where’s the van? What changed on site? And the part everyone thought someone else ordered? Nobody ordered it!

> Friday brings the timesheet treasure hunt: two spreadsheets, a text… and a sandwich receipt.

> Meet Jobs Tracker. Your office, engineers and vans, connected in one system.

> Turn enquiries into quotes and jobs without re-keying. Keep conversations with the job, so everyone has the same answers.

> See photos and updates straight from site. Capture variations, materials and purchase order numbers while the details are fresh.

> See vans, engineers and jobs on one live map, using your existing trackers. Detective Dave can retire.

> GPS tap-in and tap-out builds timesheets automatically. Review, approve, and export to Sage or Xero. Friday? Sorted.

> Less chasing. Less retyping. More time for work, and life after it. Dave even gets hot tea.

> Jobs Tracker. From dispatch to done. Book your demo at jobs tracker dot work.

## 7. Voice, music and sound

### Final voice settings used

| Setting | Value |
|---|---|
| Engine | Higgsfield Seed Audio |
| Model ID | seed_audio |
| Preset | Archie |
| Voice type | preset |
| Voice ID | bd072316-f77c-588b-b6e5-e46b9b03d008 |
| Speech rate adjustment | 0 |
| Pitch adjustment | +1 |
| Generated source format | WAV, 48 kHz |
| Final 90-second source job | 477c8808-2797-4adf-b448-645e27a8c411 |

Performance direction: youthful, conversational, playful and punchy, with dry comic timing. Leave space for reactions without sounding like a formal corporate announcer.

The celebrity reference described the desired comic energy. The delivered film uses a distinct preset voice.

### Speech editing

The generated take contained long pauses and one duplicated “Sorted”. We:

- Split the narration into scene-sized passages using word timestamps.
- Removed the extra “Sorted”.
- Reduced gaps longer than approximately 0.48 seconds to approximately 0.30 seconds, retaining margins around spoken words.
- Added small leading pauses inside each scene.
- Used a roughly 2.5% speech-speed increase for the product-reveal passage only.
- Kept the other passages at their source speech speed.
- Applied very short fades at audio edits.

The 90-second result was achieved through rewriting and editing, rather than globally speeding up the two-minute film.

### Music

The instrumental score was composed/synthesised for this film in Python. It uses light plucked tones, bass, soft percussion and a warmer harmonic texture after the reveal.

Direction:

- Playful and lightly percussive during the office chaos.
- A short musical gap around the receipt gag.
- A warmer, optimistic change at 28 seconds.
- Keep the narration clear above the music.
- Resolve and fade beneath the final demo card.

For exact reproduction using the original 120-second music stem, the 90-second music edit concatenates these source ranges:

1. 00:00–00:25.
2. 00:35.6–00:38.6.
3. 00:39–01:34.5.
4. 01:53.5–02:00.

Short edge fades smooth the joins. These ranges total 90 seconds.

### Effects

Restrained phone rings, notification pings, confirmation tones and a mug clink support the animation. The effects were retimed to the shortened scene windows.

There is no laugh track.

## 8. Animation and timing implementation

Original authored scene lengths:

    [7, 11, 11, 10, 8, 14, 16, 12, 16, 8, 7]

Final scene lengths:

    [5, 7, 9, 7, 6, 10, 11, 9, 11, 8, 7]

For the 90-second cut, animation times were scaled per scene by:

    new_scene_duration / original_scene_duration

That scaling applies to local starts, durations, entrances, exits and keyframe timestamps. Layout, artwork dimensions and character proportions stay consistent.

The native timeline includes the complete mixed soundtrack. Separate source and audio stems are supplied in the editable project archive.

For another animation engine, reproduce the scene timing and intended actions directly; the Higgsedit implementation is a reference, not a required API.

## 9. Product facts and claim boundaries

These details come from the supplied two-page product PDF:

- Enquiries can progress into quotes and jobs without re-keying.
- Job chat connects the office and field team.
- Photos, notes, variations, materials and PO information can be recorded against a job.
- Vans, engineers and jobs can be viewed on a live map using compatible existing trackers.
- GPS tap-in and tap-out builds timesheets.
- Hours are reviewed and approved before relevant exports to Sage or Xero.

Keep the following distinctions in the recreation:

- Timesheets are built automatically; approval is still an explicit step.
- Recording materials and PO numbers does not mean the product automatically orders parts.
- Do not invent a quantified saving such as “save ten hours per week”.
- The interface panels in this film are conceptual illustrations, not screenshots of the live product.
- Example people, job numbers, locations and timesheet hours are fictional.

## 10. Output specification and completed checks

| Item | Final result |
|---|---|
| Container | MP4 |
| Video codec | H.264 |
| Resolution | 1920 × 1080 |
| Aspect ratio | 16:9 |
| Frame rate | 24 fps |
| Duration | Exactly 90 seconds |
| Frame count | 2160 |
| Audio | AAC stereo, 48 kHz |
| Integrated loudness measured | −15.9 LUFS |
| True peak measured | −1.5 dBFS |
| File size | 10,492,975 bytes |

Completed checks:

- Native timeline validation passed.
- Final export decoded cleanly.
- Frames from the exported MP4 were visually inspected across the story.
- The end card and demo URL were checked.
- Local MP4 file size was verified.
- The editable project ZIP passed its CRC integrity check.

## 11. Files available for the comparison

Workspace:

    D:\ClaudeCowork\SaaS_Projects\jobstracker

| File | Purpose |
|---|---|
| marketing/jobs-tracker-product.pdf | Original two-page product presentation and factual source. |
| jobs-tracker-logo.png | Supplied brand logo. |
| marketing/video/jobs-tracker-90-seconds.mp4 | Final film to compare against. |
| marketing/video/jobs-tracker-90-seconds-storyboard.jpg | Overview of the eleven scenes. |
| marketing/video/jobs-tracker-90-seconds-project.zip | Editable native project, imported assets, source scripts and audio stems. |
| marketing/video/edit-90s.js | Accessible animation source. |
| marketing/video/assemble_audio_90s.py | Accessible audio editing and mixing source. |
| marketing/video/production-brief-90s.md | Short final brief and script. |

Inside the ZIP, the top-level folder is jobstracker-90s. Relevant files include:

    project/project.json
    project/edit.js
    project/media/
    assets/narration-source.wav
    assets/narration-timed.wav
    assets/music-90s.wav
    assets/effects-90s.wav
    assets/soundtrack.wav
    assets/timing.json
    assets/transcript.json
    assemble_audio.py
    production-brief.md
    production-90s.json
    README.md

The standalone source scripts contain cloud working-directory defaults. Adjust their root paths if running them elsewhere.

## 12. Ready-to-use Claude Motion instruction

Copy the following instruction and provide this Markdown file, the source PDF and the logo. Add the finished MP4 or storyboard as visual references if you want a close comparison.

> Create a finished 90-second, 1920×1080, 24 fps animated product presentation for Jobs Tracker, using the attached production recap as the brief.
>
> Follow its eleven scene timings and final narration. Keep Dave as one consistent character, preserve the recurring hot-tea gag, and retain the urgent-message, missing-part and sandwich-receipt jokes.
>
> Use the supplied logo and navy, lime, teal and cream palette. Make the office chaos escalate visibly, then make the product half feel clearer and calmer. Animate character reactions and meaningful actions as well as text and panels.
>
> Include enquiries-to-jobs, office-to-site chat, job photos, variations, materials and PO records, live van tracking, and GPS-built timesheets with review and approval. Show the product at 28 seconds and hold the demo end card from 83 to 90 seconds.
>
> Use youthful, playful narration with dry British comic energy, original or supplied instrumental music, and restrained effects. Keep the words intelligible.
>
> Produce the complete MP4 and editable source. Check the full export for timing, readable text, consistent characters, audio balance and a clearly visible jobstracker.work CTA.
>
> Preserve the product facts and claim boundaries in the recap. You may improve the motion, character acting and comic performance while keeping the duration, script, narrative and brand consistent.

### Keeping the comparison fair

For a comparison focused on animation quality, reuse the supplied timed narration, music and effects from the ZIP. That keeps the audio identical while the animation engine changes.

For a comparison of the full production process, generate fresh audio using the same script and performance direction, and record which voice and music approach you used.

Evaluate both films for character consistency, humour, pacing, readable information, clarity of product benefits, voice performance, audio balance and the final call to action.
