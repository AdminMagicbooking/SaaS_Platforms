# Jobs Tracker — 90-second animation

Current cut: exactly 90 seconds, 1920x1080, 24 fps, H.264 MP4 with stereo audio.
Narration uses the younger Archie voice retained from version 2.
The film retains all key product benefits, recurring workplace jokes and the hot-tea payoff.

The script was condensed to 169 words and long speech pauses were tightened.
Character animation, message entrances, routes and feature demonstrations were retimed.
The instrumental score changes at the product reveal at 28 seconds.
The final demo call to action occupies the last seven seconds.

The interface visuals are conceptual illustrations, based on the supplied marketing PDF.
Example people, job details and hours are fictional. Timesheets remain subject to review
and approval before payroll export.

Editable files:
- project/project.json and project/media/: native timeline and imported assets.
- project/edit.js: native animation source with scene-based timing.
- assemble_audio.py: narration assembly, music edit and effects retiming.
- assets/: voice source, timed narration, music, effects and mixed soundtrack.
- production-brief.md and production-90s.json: script, scene timings and production metadata.

Render an unchanged native project with Higgsedit:
    higgsedit render project --out renders/re-export.mp4 --bitrate 3M

To rebuild source on another machine, set JOBS_TRACKER_ROOT to this folder's absolute
path, then run higgsedit build project/edit.js. Set QA=1 to export scene PNGs and
RENDER=1 for a video render. The audio assembly script's ROOT constant should be
changed before re-running it elsewhere.

Created through the Higgsfield toolchain. Music and sound effects are original.
