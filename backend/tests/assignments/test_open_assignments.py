import pytest
from assignments.service.open_assignments import scrape_open_assignments

@pytest.mark.integration
def test_scrape_assignments_valid_user():
    """
    Full test using a real Moodle user.
    Expects either an empty or populated list (depending on the user's assignments).
    """

    username = "your_real_moodle_username"
    password = "your_real_moodle_password"

    assignments = scrape_open_assignments(username, password)

    assert isinstance(assignments, list)

    for assignment in assignments:
        assert "course" in assignment
        assert "title" in assignment
        assert "due_date" in assignment
        assert "days_left" in assignment
        assert "submit_url" in assignment

@pytest.mark.integration
def test_scrape_assignments_invalid_user():
    """
    Test behavior when using wrong username/password.
    Should handle gracefully (empty list or error catch).
    """

    username = "wrong_user"
    password = "wrong_pass"

    assignments = scrape_open_assignments(username, password)

    # Ideally, when credentials are wrong, Moodle redirects to login page.
    # You might choose to either return empty [] or raise error.
    assert isinstance(assignments, list)
    # In a real-world system, we would also log the failure.
