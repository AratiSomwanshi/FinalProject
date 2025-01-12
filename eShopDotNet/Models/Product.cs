using eShopSystem.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eShopSystem.Models
{

  
    public class Product
    {
        public int Id { get; set; }  

        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string? Imageurl { get; set; }
        public int CategoryId { get; set; } 
        public Category Category { get; set; }  
        public int Stock { get; set; }  
        public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();  // Navigation property to CartItems
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();  // Navigation property to OrderItems
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();  // Navigation property to Reviews
    }
}
