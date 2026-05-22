---
product_slug: waypointscreator
platform: linkedin
audience: dji-drone-pilots
status: draft
generated_at: 2026-05-22
generated_from_commit: TBD
requires_human_review: true
publication_blockers:
  - public landing page URL (frontmatter says null)
---

# Draft

Planning a survey grid by hand: 45 minutes. With a rectangle drag and an auto-generated waypoint pattern: 30 seconds.

WaypointsCreator runs in the browser. Drag a rectangle, the app fills it with waypoints at the spacing, altitude, and camera angle you set. Drop a POI, click "Point All to POI", every waypoint reorients. Click along a road or coastline, double-click to finish, the curve path is interpolated and smoothed. KMZ exported with WPML execution data — same file format your DJI drone already reads.

Pro+ adds a Cesium-powered 3D simulation over real terrain and buildings. Run the mission with proximity warnings before you fly it. The app gives you exact clearance distance to each building, with first-person and third-person views and a timeline scrubber. You catch a collision in the simulator, not in the field.

Push the mission to your RC2 controller over USB, or to a phone running DJI Fly (Android MTP, iPhone AFC). A small companion app on your computer handles the transfer. Push, pull back to edit, delete a slot.

Free tier for one mission with up to five waypoints. Pro at €20/month for unlimited missions and device transfer. Pro+ at €30/month adds the simulation. Annual saves about 18%.

Nine DJI models: Mavic 4/3 Pro/3/3 Classic, Air 3S/3, Mini 5/4/3 Pro.

---

## Reviewer notes (Franck, fill before approval)

- [ ] Domain confirmed before posting?
- [ ] "45 minutes vs 30 seconds" hook — defensible? Verify against a pilot's actual numbers
- [ ] Mention of internal feature-gating discrepancy (Free = 5 vs 6 waypoints) — keep out per voice guide §6
- [ ] Image: simulation screenshot showing proximity warning catches the eye
- [ ] Hashtags: `#dronepilots #DJI #aerialsurvey`
