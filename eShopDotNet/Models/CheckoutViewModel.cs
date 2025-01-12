
namespace eShopSystem.Models
{
    public class CheckoutViewModel
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public List<Product> Products { get; set; }
        public double TotalPrice { get; set; }
     
        public Cart Cart { get; set; }
      
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public List<CartItem> CartItems { get; set; }
        public List<Shipping> Shipping { get;  set; }
       
        public List<ShippingAdd> ShippingAdds { get; set; }
        public ShippingAdd? DefaultShippingAdd { get; internal set; }
    }
}
