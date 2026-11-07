#!/bin/sh
set -eu
backup_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_dir=$(CDPATH= cd -- "$backup_dir/../.." && pwd)
cp -R "$backup_dir/app/." "$project_dir/app/"
printf '%s\n' 'Original portfolio application restored. Restart the dev server if it is running.'
