namespace eShopSystem.Models
{
    public class Review
    {
        public long Id { get; set; }  

        public string Comment { get; set; } 
        public int Rating { get; set; } 
        public string Username { get; set; } 
        public int ProductId { get; set; }  
        public string UserId { get; set; }  

        public virtual Product Product { get; set; }  
        public virtual ApplicationUser User { get; set; }
    }

}
