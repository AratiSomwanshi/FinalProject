namespace eShopSystem.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime OrderDate { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public decimal TotalPrice { get; set; } 
        public string Shippings { get; set; }  
        public string PaymentStatus { get; set; }
        public string Status { get; set; }
        public ShippingAdd ShippingAdd { get; set; }
        public DateTime CreatedDate { get;  set; }
        public int ShippingAddId { get; internal set; }
    }
}
