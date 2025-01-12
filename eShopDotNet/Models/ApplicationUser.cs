using Microsoft.AspNetCore.Identity;

namespace eShopSystem.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? Name { get; set; }
        public string? ProfilePicture { get; set; }

        public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
        public string? Address { get; set; }
        public virtual ICollection<ShippingAdd> ShippingAdds { get; set; } = new List<ShippingAdd>();
        public virtual ICollection<Shipping> shippings { get; set; } = new List<Shipping>();
        
    }
}
