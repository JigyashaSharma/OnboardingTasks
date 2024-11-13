using sdonboarding.Server.Models;

namespace sdonboarding.Server.ApplicationTier.Dtos
{
    public class SaleDto
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public int ProductId { get; set; }

        public DateTime DateSold { get; set; }

        public int StoreId { get; set; }

        public string? CustomerName { get; }

        public string? ProductName { get; }

        public string? StoreName { get; }

        public SaleDto() { }
        public SaleDto(Sale sale)
        {
            Id = sale.Id;
            CustomerId = sale.CustomerId;
            ProductId = sale.ProductId;
            StoreId = sale.StoreId;
            CustomerName = sale.Customer?.Name;
            ProductName = sale.Product?.Name;
            StoreName = sale.Store?.Name;
            DateSold = sale.DateSold;
        }
    }
}
