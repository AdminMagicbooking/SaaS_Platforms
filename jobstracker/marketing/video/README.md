# Jobs Tracker — From chaos to control

Finished format: 120 seconds, 1920x1080, 24 fps, H.264 MP4 with stereo audio.
Produced through Higgsfield's native Higgsedit renderer.

The animation is an illustrated product story based on the supplied product PDF.
Its interface demonstrations are conceptual illustrations rather than captured app screens.
Dave and the engineers are fictional. Example names, hours and job details are illustrative.

Audio:
- Narration: Higgsfield Seed Audio, Arthur preset.
- Original instrumental music and short effects composed/synthesised for this film.
- Separate narration, music and effects stems are in assets/.
- source narration is kept alongside the timed narration for future edits.

Editable project:
- project/project.json and project/media/ contain the native editable timeline and assets.
- project/edit.js is the rebuild source; assemble_audio.py creates the sound master.
- assets/timing.json records the voice boundaries and scene positions.

Render an unchanged project using an installed Higgsedit runtime:
    higgsedit render project --out renders/re-export.mp4 --bitrate 3M

To rebuild from source on another machine, set JOBS_TRACKER_ROOT to the absolute
directory containing this README, then run:
    higgsedit build project/edit.js

Set QA=1 for scene PNGs or RENDER=1 for a full render when rebuilding.
The audio assembly script currently uses the original cloud folder as ROOT;
change that constant before re-running it elsewhere. Normal timeline rendering
does not require re-running the audio script.

Source product document: jobs-tracker-product.pdf, supplied by the user.
Website / CTA: jobstracker.work — Book your demo.
Timesheets remain subject to review and approval before payroll export.
