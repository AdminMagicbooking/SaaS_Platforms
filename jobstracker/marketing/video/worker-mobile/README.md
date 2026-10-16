# Jobs Tracker — Worker mobile app film

A 60-second companion to the office-manager animation, focused on how a worker uses the mobile app throughout the day.

Format: 1920x1080, 24 fps, H.264 MP4, AAC stereo at 48 kHz.
Voice: Higgsfield Seed Audio, Archie preset, source speech rate +3 and pitch +1.
Narration: 115 words. Source job: ab9bfdfb-dca2-452d-8ab6-71577f1885e6.

The mobile UI is illustrated. Feature scope comes from the supplied product PDF and supporting worker-flow specification. See feature-coverage.md for the complete matrix, and production-brief.md for the narration and storyboard.

Editable project:
- project/project.json, project/media/ and project/fonts/: native timeline and assets.
- project/edit.js: animation source.
- assemble_audio.py: narration alignment and audio assembly.
- assets/: voice source, timed narration, original-score source, music edit, effects and mixed soundtrack.
- production-worker.json and assets/timing.json: production and timing metadata.

Render with an installed Higgsedit runtime:
    higgsedit render project --out renders/re-export.mp4 --bitrate 3M

For source rebuilds elsewhere, set JOBS_TRACKER_ROOT to this folder's absolute path before running higgsedit build project/edit.js. Set QA=1 to export scene PNGs or RENDER=1 to render from the script. Adjust the audio script's ROOT constant before re-running it outside the original cloud folder.

Vehicle checks and defects are explicitly shown as enabled options. Workers submit timesheets for office approval. Example job details and personal data are fictional.
