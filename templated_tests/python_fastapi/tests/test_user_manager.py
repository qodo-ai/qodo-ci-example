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

    def test_deactivate_existing_user(self, user_manager, valid_user_data):
        user_manager.create_user(**valid_user_data)
        result = user_manager.deactivate_user(valid_user_data["username"])
        assert result is True
        user = user_manager.get_user(valid_user_data["username"])
        assert user is not None
        assert user.active is False


    def test_update_existing_user(self, user_manager, valid_user_data):
        user_manager.create_user(**valid_user_data)
        updated_user = user_manager.update_user(valid_user_data["username"], full_name="Updated Name")
        assert updated_user is not None
        assert updated_user.full_name == "Updated Name"


    def test_get_non_existing_user(self, user_manager):
        user = user_manager.get_user("nonexistent")
        assert user is None


    def test_get_existing_user(self, user_manager, valid_user_data):
        user_manager.create_user(**valid_user_data)
        user = user_manager.get_user(valid_user_data["username"])
        assert user is not None
        assert user.username == valid_user_data["username"]
