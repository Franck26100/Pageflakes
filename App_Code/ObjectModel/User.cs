using System;
using System.Collections.Generic;

namespace Pageflakes.ObjectModel
{
    public class User
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public int CurrentPageId { get; set; }

        public Dictionary<string, string> Profiles { get; set; }

        public User()
        {
            Profiles = new Dictionary<string, string>();
        }
    }
}
