from assignments.service.open_assignments import scrape_open_assignments
from assignments.schema import Assignment
from typing import List

def get_open_assignments(username: str, password: str) -> List[Assignment]:
    """
    This function handles the main logic between the route and the scraper.
    It can also do pre/post processing in the future (e.g. filtering, logging).
    """
    raw_assignments = scrape_open_assignments(username, password)

    # Optionally: post-process, validate, enrich data here

    return [Assignment(**a) for a in raw_assignments]
