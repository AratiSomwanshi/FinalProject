using eShopSystem.Models;

public class ShippingAdd
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string AddressLine1 { get; set; }
    public string AddressLine2 { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string PostalCode { get; set; }
    public string Country { get; set; }
    public bool IsDefault { get; set; }
    public ApplicationUser User { get; set; }

    // Add the Orders navigation property
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
