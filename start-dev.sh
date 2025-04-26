#!/bin/bash

SESSION="uniway-dev"

# מיקום הvenv
VENV_PATH="/Users/ortaizi/Desktop/GitHub/uniway/backend/venv"

# פונקציה להפעיל venv אם צריך
activate_venv() {
    if [ -z "$VIRTUAL_ENV" ]; then
        source "$VENV_PATH/bin/activate"
    fi
}

# אם יש סשן ישן — תהרוג אותו
tmux kill-session -t $SESSION 2>/dev/null

# תיצור סשן חדש
tmux new-session -d -s $SESSION

# חלון ראשי - Frontend
tmux send-keys -t $SESSION "cd /Users/ortaizi/Desktop/GitHub/uniway/frontend && npm run dev" C-m

# פיצול אופקי ל-Backend
tmux split-window -h -t $SESSION
tmux send-keys -t $SESSION "cd /Users/ortaizi/Desktop/GitHub/uniway/backend && source venv/bin/activate && uvicorn core.main:app --reload" C-m

# פיצול אנכי מה-Backend ל-Rasa Server
tmux split-window -v -t $SESSION:0.1
tmux send-keys -t $SESSION "cd /Users/ortaizi/Desktop/GitHub/uniway/backend/rasa && source ../venv/bin/activate && rasa run" C-m

# פיצול אנכי נוסף מה-Rasa Server ל-Rasa Actions
tmux split-window -v -t $SESSION:0.2
tmux send-keys -t $SESSION "cd /Users/ortaizi/Desktop/GitHub/uniway/backend/rasa && source ../venv/bin/activate && rasa run actions" C-m

# סידור יפה
tmux select-layout -t $SESSION tiled

# נכנס לסשן
tmux attach-session -t $SESSION
