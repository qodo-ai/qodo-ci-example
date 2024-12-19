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

    def test_update_user_not_exist(self, user_manager):
        result = user_manager.update_user("nonexistent", full_name="New Name")
        assert result is None


    def test_get_user_not_exist(self, user_manager):
        user = user_manager.get_user("nonexistent")
        assert user is None


    def test_create_user_invalid_username(self, user_manager):
        invalid_user_data = {
            "username": "invalid username!",
            "email": "test@example.com",
            "full_name": "Test User"
        }
        with pytest.raises(ValueError, match="Invalid username format"):
            user_manager.create_user(**invalid_user_data)


    def test_create_user_existing_username(self, user_manager, valid_user_data):
        user_manager.create_user(**valid_user_data)
        with pytest.raises(ValueError, match="Username already exists"):
            user_manager.create_user(**valid_user_data)
