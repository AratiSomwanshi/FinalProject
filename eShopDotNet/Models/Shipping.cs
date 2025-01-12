namespace eShopSystem.Models
{
    public class Shipping
    {
        public int Id { get; set; }
        public int OrderId { get; set; } 
        public string Address { get; set; } 
        public string City { get; set; }
        public string State { get; set; } 
        public string ZipCode { get; set; } 
        public string Country { get; set; }
        public string ShippingStatus { get; set; }
        public DateTime ShippedDate { get; set; } 
        public string UserId { get; set; } 

        // Navigation property to the related order
        public Order Order { get; set; } 
        public ApplicationUser User { get; set; } 
    }
}
