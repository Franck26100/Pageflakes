using System;
using System.Collections.Generic;

namespace Pageflakes.Data
{
    public static class ProfileStartUpRepository
{
    private static readonly Dictionary<string, List<int>> _pagesByUser =
        new Dictionary<string, List<int>>();

    public static List<int> GetPagesForUser(string guid)
    {
        if (!_pagesByUser.ContainsKey(guid))
            _pagesByUser[guid] = new List<int>();

        return _pagesByUser[guid];
    }

    public static void AddPageForUser(string guid, int pageId)
    {
        if (!_pagesByUser.ContainsKey(guid))
            _pagesByUser[guid] = new List<int>();

        if (!_pagesByUser[guid].Contains(pageId))
            _pagesByUser[guid].Add(pageId);
    }
}

}
