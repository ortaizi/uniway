# actions.py
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from actions.scraper import (
    login_to_moodle_with_credentials,
    extract_course_list,
    search_course_files
)
import json
import os

USERS_FILE = os.path.join(os.path.dirname(__file__), "..", "..", "users.json")

def get_password_for_user(username):
    if not os.path.exists(USERS_FILE):
        return None
    with open(USERS_FILE, "r") as f:
        users = json.load(f)
        for user in users:
            if user.get("username") == username:
                return user.get("password")
    return None

class ActionGetFiles(Action):

    def name(self) -> Text:
        return "action_get_files"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        course_name = tracker.get_slot("course_name")
        file_type = tracker.get_slot("file_type")
        username = tracker.sender_id
        password = get_password_for_user(username)

        if not password:
            dispatcher.utter_message(text="❌ לא נמצאו פרטי התחברות שלך. התחבר שוב דרך האתר.")
            return []

        session, html = login_to_moodle_with_credentials(username, password)
        if not session:
            dispatcher.utter_message(text="⚠️ לא הצלחנו להתחבר למודל עם הפרטים שלך.")
            return []

        file_links, matched_course = search_course_files(session, course_name)
        if not file_links:
            dispatcher.utter_message(text="😕 לא מצאתי קבצים מתאימים בקורס. נסה שם אחר או סוג קובץ שונה.")
            return []

        dispatcher.utter_message(text=f"📘 קבצים שנמצאו בקורס: {matched_course}")
        for name, link in file_links[:5]:
            dispatcher.utter_message(text=f"🔗 {name}: {link}")

        return []
