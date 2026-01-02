using Pageflakes.ObjectModel;
using System;

namespace Pageflakes.Data
{
    public static class UserRepository
    {
        private static User _currentUser = new User
        {
            ID = 1,
            Username = "demo"
        };

        public static User GetCurrentUser()
        {
            return _currentUser;
        }

        public static void Save(User user)
        {
            _currentUser = user;
        }
    }
}
