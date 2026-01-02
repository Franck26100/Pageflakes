namespace Pageflakes.DTO
{
    public class PageDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int OrderNo { get; set; }
        public bool IsOwner { get; set; }
        public bool IsShared { get; set; }
        public int SharingStatus { get; set; }
    }
}
