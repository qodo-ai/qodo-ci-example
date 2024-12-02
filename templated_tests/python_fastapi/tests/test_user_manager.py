import pytest
from datetime import datetime
from pydantic import EmailStr
from myapp.user_manager import UserManager, User

@pytest.fixture
def user_manager():
    return UserManager()

@pytest.fixture
def valid_user_data():
    return {
        "username": "testuser",
        "email": "test@example.com",
        "full_name": "Test User"
    }

class TestUserManager:
    def test_create_valid_user(self, user_manager, valid_user_data):
        user = user_manager.create_user(**valid_user_data)
        assert user.username == valid_user_data["username"]
        assert user.email == valid_user_data["email"]
        assert user.full_name == valid_user_data["full_name"]
        assert user.active == True
        assert isinstance(user.created_at, datetime)

    def test_deactivate_non_existent_user(self, user_manager):
        result = user_manager.deactivate_user("nonexistent")
        assert result is False


    def test_search_users(self, user_manager, valid_user_data):
        user_manager.create_user(**valid_user_data)
        user_manager.create_user(username="anotheruser", email="another@example.com", full_name="Another User")
        results = user_manager.search_users("test")
        assert len(results) == 1
        assert results[0].username == "testuser"
        results = user_manager.search_users("user")
        assert len(results) == 2


    def test_deactivate_existing_user(self, user_manager, valid_user_data):
        user_manager.create_user(**valid_user_data)
        result = user_manager.deactivate_user("testuser")
        assert result is True
        user = user_manager.get_user("testuser")
        assert user is not None
        assert user.active is False


    def test_update_existing_user(self, user_manager, valid_user_data):
        user_manager.create_user(**valid_user_data)
        updated_user = user_manager.update_user("testuser", full_name="Updated User")
        assert updated_user is not None
        assert updated_user.full_name == "Updated User"


    def test_update_non_existent_user(self, user_manager):
        user = user_manager.update_user("nonexistent", full_name="New Name")
        assert user is None


    def test_get_non_existent_user(self, user_manager):
        user = user_manager.get_user("nonexistent")
        assert user is None


    def test_create_user_invalid_username(self, user_manager):
        invalid_user_data = {
            "username": "invalid username!",
            "email": "test2@example.com",
            "full_name": "Test User 2"
        }
        with pytest.raises(ValueError, match="Invalid username format"):
            user_manager.create_user(**invalid_user_data)


    def test_create_user_existing_username(self, user_manager, valid_user_data):
        user_manager.create_user(**valid_user_data)
        with pytest.raises(ValueError, match="Username already exists"):
            user_manager.create_user(**valid_user_data)
