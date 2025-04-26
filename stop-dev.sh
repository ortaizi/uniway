#!/bin/bash

# סוגר את סשן tmux בשם uniway-dev
tmux kill-session -t uniway-dev 2>/dev/null

echo "🛑 סיימנו — כל הסביבה נסגרה בהצלחה!"
