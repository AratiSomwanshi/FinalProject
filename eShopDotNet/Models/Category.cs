using System.ComponentModel.DataAnnotations;

namespace eShopSystem.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string CategoryName { get; set; }
        
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }

}
