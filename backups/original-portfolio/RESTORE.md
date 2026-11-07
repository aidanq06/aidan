# Original portfolio backup

This is a standalone source backup of the original portfolio, matching the production `main` branch before the Transcript homepage replaces it. It contains the original `app/`, its project images, and the project configuration and lockfile needed to rebuild it.

To restore the original homepage in this checkout, run from the project root:

```sh
sh backups/original-portfolio/restore.sh
```

The script copies the backed-up original application files over `app/`. This overwrites any later edits to those original application files; save such changes elsewhere first. The new portfolio's extra CSS and public assets can remain on disk, but the restored layout does not load them. Restart the development server after restoring. The project's current `public/images/` assets and dependency configuration were not changed for the new homepage; backup copies are here if they need to be recovered separately.

This backup is part of the project files; keep it in any future commit or deployment source if you want it available beyond this local workspace.
