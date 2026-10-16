# Jobs Tracker worker mobile animation — Claude Motion handoff

Recreate the **60-second worker-focused film** for comparison with the existing Higgsfield version. This is the companion to the office-manager film; its main character is the engineer using the phone throughout the day.

## 1. Objective

Show how a worker uses the Jobs Tracker mobile app to manage a complete working day: sign in, check work, travel, follow safety requirements, record the job, obtain sign-off, submit time and handle personal admin.

The user requested coverage of every worker-app item in the product brochure, with 60 seconds as the target. The result is a brisk overview rather than a detailed training course.

Retain the younger narration style, background music, navy/lime/teal branding and light workplace humour from the earlier film.

## 2. References and factual scope

Reference copies are included in this folder:

- references/jobs-tracker-product.pdf — the original product brochure, especially page 2's Worker App section.
- references/jobs-tracker-logo.png — the supplied logo.
- jobs-tracker-worker-mobile-60s.mp4 — the completed comparison film.
- jobs-tracker-worker-mobile-storyboard.jpg — an overview of its ten scenes.
- feature-coverage.md — a feature-by-feature coverage matrix.

Supporting worker-flow detail originally came from the local product-spec.md. Where it differs from the newer brochure, the film follows the brochure's iPhone/Android positioning.

The phone screens are **conceptual product illustrations**, not recordings of the live app. Sam, the sites, job number, hours, balance and defect are fictional examples.

## 3. The story and main character

### Sam

Sam is a friendly illustrated field worker wearing a lime hard hat, teal workwear with lime high-visibility details, dark trousers and work boots. Sam carries a phone, checks information and records actions throughout the film.

Use one consistent character.

### Narrative

**One phone → a complete working day → less back-and-forth.**

Loose paperwork gives way to a phone at the start. The story follows a job from preparation to completion, then covers timesheets, leave, certificates and optional vehicle checks.

The tone is practical, upbeat and lightly humorous. The timesheet section includes a callback to the earlier film's sandwich-receipt joke: “No Friday paperwork treasure hunt.”

### Overall visual design

- Widescreen composition with large explanatory headings on the left and a prominent animated phone on the right.
- Reusable worker, van, delivery box, job record and signature illustrations.
- A small logo at top left and the product website in the footer.
- Header: “WORKER APP / IPHONE + ANDROID”.
- The phone changes screens as the worker moves through the day.
- Taps, confirmations, checklist states, record updates and signature drawing provide purposeful motion.
- The final card holds the website and mobile-platform message.

In the reference implementation, the phone's outer box is approximately 500 × 810 pixels, placed at x=1230, y=158 on the 1920 × 1080 canvas. Its content area is approximately 436 × 575 pixels. These dimensions are a reference; preserve readability if changing the composition.

## 4. Brand style

| Use | Colour |
|---|---|
| Navy background | #101C24 |
| Dark panels | #1B303B |
| Muted text | #9FB6B8 |
| Lime highlights | #C1F46E |
| Teal highlights | #06ABA7 |
| Cream phone / illustration stage | #F4F1E8 |
| Paper | #FFFDF6 |
| Dark illustration ink | #133246 |
| Warm skin tone | #EFB99B |
| Hair / warm detail | #503D35 |
| Coral alerts / optional-feature label | #FA856E |
| Light blue | #AFD7E6 |

Use Inter, with regular, semibold and bold weights. Keep phone labels and controls readable. The reference uses rounded cards, simple vector icons and generous spacing.

The bottom phone navigation consistently shows **Jobs, Upcoming, Time and Leave**. Relevant sections become active as the scene changes. Other functions are illustrated within the job or personal-admin views.

## 5. Exact 60-second storyboard

| Time | Duration | Visual action and phone view | Main screen heading |
|---|---:|---|---|
| 00–04 | 4s | Introduce Sam. Job sheets slide away as a phone shows the day's two jobs. | The whole day. In your pocket. |
| 04–10 | 6s | Biometric sign-in, then today's job details, upcoming work and an office push update. | Open. Check. Go. |
| 10–17 | 7s | Read and sign required RAMS, then show navigation choices and start travel. | Safety first. Then hit the road. |
| 17–25 | 8s | GPS arrival/tap-in, then job checklist, progress photo, saved note and office chat reply. | Arrive. Tap in. Keep things moving. |
| 25–32 | 7s | Materials form with supplier/quantity and delivery-note photo; switch to a variation and PO number. | Used it? Changed it? Log it on the job. |
| 32–38 | 6s | Completion photo, client signature drawing, GPS tap-out and completed-job confirmation. | Proof. Signature. Tap out. Done. |
| 38–44 | 6s | GPS-built weekly hours, followed by worker submission for office approval. | Your week. Already coming together. |
| 44–49 | 5s | Leave balance and request, then training certificates and expiry alert. | Your time off. Your proof on site. |
| 49–54 | 5s | Optional van checklist, rear-light defect photo and report action. | Van check? Sorted before the first call. |
| 54–60 | 6s | Final logo, website and iPhone/Android message; phone shows the completed day. | Your working day. In your pocket. |

The last vehicle segment is an optional-feature cutaway. It does not imply van checks should wait until the end of the working day.

### Phone transitions within scenes

- 04–05.6: biometric sign-in; 05.6–10: today's jobs and upcoming work.
- 10–12.8: RAMS; 12.8–17: navigation and start travel.
- 17–18.9: arrival and GPS tap-in; 18.9–25: checklist, photos, notes and chat.
- 25–28.4: materials; 28.4–32: variation and PO details.
- 44–46.2: leave; 46.2–49: certificates.

## 6. Final narration

Use these ten paragraphs in the corresponding scene windows. The script supplied to speech generation contains **115 words**.

> Meet Sam. One phone. A whole working day.

> Sign in with biometrics. Check today’s jobs, upcoming work and push alerts.

> Read and sign RAMS, then start travel with Google Maps or Waze.

> Arrived? GPS tap-in. Follow the checklist and add photos, notes or a message to the office.

> Log materials, delivery notes, extra work and purchase order numbers while you’re there.

> Capture completion photos and the client’s signature. Tap out. Done.

> Check and submit your weekly timesheet. No Friday paperwork treasure hunt.

> Request leave, show training certificates, and receive expiry alerts.

> Van checks and defect reports? There too, when enabled.

> Jobs Tracker. Your working day, in your pocket. iPhone and Android. Jobs tracker dot work.

## 7. Feature coverage that must remain

### Starting the day

- Biometric sign-in.
- Today's assigned jobs and job details.
- Upcoming jobs.
- Push alerts and reminders.

### Preparing and doing the job

- Required RAMS reading and sign-off.
- Google Maps or Waze navigation and start travel.
- GPS tap-in.
- Travel/arrival/site event trail.
- Checklists, including photo steps.
- Job photos.
- Job notes, with an AI proofreading screen label.
- Job chat with the office.

### Capturing work and completing the job

- Materials description, supplier and quantity.
- Delivery-note photo.
- Extras/variations.
- PO numbers.
- Completion photos.
- Client signature.
- GPS tap-out and tap-out reminder.

### Time and personal admin

- Weekly timesheet assembled from GPS taps.
- Worker submission for office approval.
- Leave request and balance.
- Training certificates available on the phone.
- Certificate expiry alerts.

### Enabled options

- Weekly van checks.
- Vehicle defect reporting with a photo.

Show the vehicle options with “When enabled” or an equally clear label.

## 8. Product accuracy

Preserve these distinctions:

- A worker submits their weekly timesheet; office approval remains a separate step.
- Recording materials or a PO does not automatically order a part.
- Required safety documents are signed before work proceeds.
- Do not add an offline guarantee or an invented productivity percentage.
- Keep job, timesheet, leave and defect data fictional.
- The mobile UI is illustrative. It should communicate supported actions without claiming to reproduce the live screen layout exactly.

Example timesheet hours in the reference: Monday 8.0, Tuesday 8.5, Wednesday 7.5, Thursday 8.0, Friday 7.0, totalling 39.0 hours.

The example defect is a rear-light fault. The lights check is marked as needing attention.

## 9. Voice and audio

### Voice settings actually used

| Setting | Value |
|---|---|
| Toolchain | Higgsfield |
| Speech model | seed_audio |
| Preset | Archie |
| Voice type | preset |
| Voice ID | bd072316-f77c-588b-b6e5-e46b9b03d008 |
| Source speech-rate adjustment | +3 |
| Pitch adjustment | +1 |
| Source format | WAV, 48 kHz |
| Source job | ab9bfdfb-dca2-452d-8ab6-71577f1885e6 |

Performance direction: younger, conversational, clear and dynamic, with light dry humour.

The generated take was approximately **46.09 seconds**. It was split into scene passages using word timestamps, with long pauses shortened. Each passage starts approximately 0.18 seconds into its scene.

No additional speech-speed adjustment was required after editing. The remaining time allows for visible actions, confirmations and the final card.

### Music

We reused the optimistic section of the original instrumental score, which had been composed/synthesised for the earlier animation in Python.

The 60-second edit uses:

- Original score 00:39–01:33: first 54 seconds.
- Original score 01:54–02:00: last six seconds.

Short fades smooth the join. Keep the music below the narration.

### Effects

Restrained interaction pings support these approximate action times:

    4.6, 6.8, 11.1, 11.9, 14.4, 17.4, 20.3, 21.8,
    26.6, 30.1, 33.2, 35.1, 35.8, 40.9, 41.7,
    44.8, 46.2, 51.8, 54.2 seconds

These correspond to sign-in, safety sign-off, travel, arrival, record updates, signature, tap-out, timesheet submission, personal admin and the final brand moment.

## 10. How the reference was made

The reference was created through the Higgsfield plugin using:

1. Native code-authored Higgsedit vector animation.
2. Reusable character, van, phone and interface components.
3. Keyframed actions, taps, screen changes and confirmations.
4. Seed Audio narration.
5. Faster Whisper word timestamps for speech alignment.
6. Python/NumPy audio editing, score assembly and effects.
7. FFmpeg finishing, audio normalization and MP4 verification.

The visual scenes were not generated as text-to-video clips. The supplied JavaScript is the animation source; use it as a behavioural and layout reference if implementing the comparison in another engine.

## 11. Final output and validation

| Setting | Result |
|---|---|
| Duration | Exactly 60 seconds |
| Resolution | 1920 × 1080 |
| Frame rate | 24 fps |
| Frame count | 1440 |
| Video | H.264 in MP4 |
| Audio | AAC stereo, 48 kHz |
| Integrated loudness measured | −15.9 LUFS |
| True peak measured | −1.5 dBFS |
| MP4 size | 6,363,683 bytes |

Checks completed:

- Native project validation.
- Complete export decoding.
- Visual inspection of sampled scenes and phone screens.
- Verification of the signature, timesheet submission, certificate and optional-defect views.
- Local MP4 size verification.
- Editable ZIP CRC integrity check.
- Feature mapping against the brochure's worker items.

## 12. Files and local locations

Everything for this worker handoff is saved under:

    D:\ClaudeCowork\SaaS_Projects\jobstracker\marketing\video\worker-mobile

### Main files

| Relative path | Purpose |
|---|---|
| animation-recap-for-claude-motion.md | This handoff document. |
| jobs-tracker-worker-mobile-60s.mp4 | Finished reference film. |
| jobs-tracker-worker-mobile-storyboard.jpg | Scene overview. |
| jobs-tracker-worker-mobile-project.zip | Original editable project archive. |
| feature-coverage.md | Detailed feature matrix. |
| production-brief.md | Original worker brief and script. |
| edit.js | Accessible animation source. |
| assemble_audio.py | Accessible audio assembly source. |
| references/jobs-tracker-product.pdf | Copied product brochure. |
| references/jobs-tracker-logo.png | Copied logo. |

### Unpacked project and audio

The project ZIP has also been extracted locally, so the audio and assets are directly available at:

    editable-project/jobstracker-worker-mobile/

Important files inside that folder:

    project/project.json
    project/edit.js
    project/media/
    project/fonts/
    assets/logo.png
    assets/narration-source.wav
    assets/narration-timed.wav
    assets/original-music.wav
    assets/music-60s.wav
    assets/effects-60s.wav
    assets/soundtrack.wav
    assets/timing.json
    assets/transcript.json
    production-worker.json
    assemble_audio.py

For a comparison of motion alone, use the supplied 60-second soundtrack. It already contains the timed narration, music and effects. For separate mixing, use narration-timed.wav, music-60s.wav and effects-60s.wav.

The scripts contain cloud working-directory defaults. Update root paths if running them elsewhere. The native timeline and assets can also be used without rebuilding the source.

The copied references and this recap are saved alongside the original ZIP; the original ZIP itself has not been repackaged to include these newly added handoff files.

## 13. Ready-to-use Claude Motion instruction

Provide this document and its references folder. Include the existing MP4 or storyboard if you want a close visual comparison.

> Create a finished 60-second worker-focused animation for Jobs Tracker using this handoff as the source brief.
>
> Follow Sam, one consistent field worker, through the complete mobile workflow. Use the exact narration and ten scene windows. Keep all listed worker features, including leave, certificates, alerts, biometric sign-in and the optional van checks and defect reporting.
>
> Use the supplied logo and the navy, lime, teal and cream palette. Make the phone screen prominent and readable. Animate screen changes, taps, checklist confirmations, record updates, a drawn client signature and visible completion states. Give Sam clear reactions and purposeful movement.
>
> Preserve the playful, practical tone. Include the light paperwork humour and the “No Friday paperwork treasure hunt” line. Finish from 54 to 60 seconds with “Your working day. In your pocket.”, iPhone/Android availability and a clear jobstracker.work URL.
>
> Keep the product claims accurate: workers submit timesheets for office approval; materials/PO records do not automatically order parts; required RAMS are signed before work proceeds; vehicle checks and defects are marked as enabled options.
>
> Reuse the supplied soundtrack for an animation-only comparison, or create a fresh voice and score using the same script and performance direction. State which approach was used.
>
> Export a complete 1920×1080, 24 fps MP4 with stereo audio and provide editable source. Check the full export for duration, readable controls, clear feature coverage, character consistency, audio balance and a legible end card.

## 14. Comparison criteria

Compare:

- Whether the worker's actions are easy to follow.
- Whether all feature groups are covered.
- Phone-screen readability.
- Character consistency and acting.
- Quality of taps, transitions and confirmation states.
- Pacing across the sixty seconds.
- Voice clarity and energy.
- Music and effects balance.
- Strength and readability of the final brand message.

Keep the script, duration, product claims and feature scope consistent so improvements in motion and execution are easy to assess.
