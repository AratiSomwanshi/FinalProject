


namespace eShopSystem.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string UserId { get; set; } 
        public int TotalItems { get; set; }
        public double TotalPrice { get; set; }
        public ApplicationUser User { get; set; }
     
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

        internal void UpdateCartTotals()
        {
            TotalItems = CartItems.Sum(ci => ci.Quantity);
            TotalPrice = CartItems.Sum(ci => ci.Quantity * ci.Price);
        }
    }


}
