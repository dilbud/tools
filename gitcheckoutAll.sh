#!/bin/bash
# EOF if windows to linux or if linux to windows

remote=origin ; for brname in `git branch -r | grep $remote | grep -v /master | grep -v /HEAD | awk '{gsub(/^[^\/]+\//,"",$1); print $1}'`; do git branch --track $brname $remote/$brname || true; done 2>/dev/null
