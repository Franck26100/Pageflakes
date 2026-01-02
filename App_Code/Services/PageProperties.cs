using System;
using System.Collections.Generic;


namespace Pageflakes.Services
{
    public class PageProperties
    {
        public int id { get; set; }
        public string title { get; set; }
        public int index { get; set; }
        public int columnCount { get; set; }
        public string[] columnSizes { get; set; }

        // IMPORTANT : on stocke le thème tel qu'il vient du client
        public object Theme { get; set; }

        public PageProperties Clone()
        {
            return new PageProperties
            {
                id = this.id,
                title = this.title,
                index = this.index,
                columnCount = this.columnCount,
                columnSizes = this.columnSizes != null ? (string[])this.columnSizes.Clone() : null,

                // On clone la référence brute (le client renverra un JSON propre)
                Theme = this.Theme
            };
        }
    }
}
