import React, { useState } from "react";
import { Section, Icon, TableToolbar, DataTable, IconButton, SlideOver, Button, Input } from "../components/ui";

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = (product: any) => {
    setSelectedProduct(product);
    setIsEditing(false);
    setIsSlideOverOpen(true);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsSlideOverOpen(true);
  };

  const products = [
    { id: "PROD-001", name: "Premium Wireless Headphones", category: "Electronics", price: "$299.99", stock: 124, status: "In Stock", lastRestocked: "2023-10-15T10:30:00", sku: "WH-PREM-01" },
    { id: "PROD-002", name: "Ergonomic Office Chair", category: "Furniture", price: "$499.50", stock: 15, status: "Low Stock", lastRestocked: "2023-09-22T14:15:00", sku: "CH-ERGO-02" },
    { id: "PROD-003", name: "Mechanical Keyboard", category: "Accessories", price: "$149.00", stock: 0, status: "Out of Stock", lastRestocked: "2023-08-10T09:45:00", sku: "KB-MECH-03" },
    { id: "PROD-004", name: "4K Ultra HD Smart TV", category: "Electronics", price: "$899.00", stock: 42, status: "In Stock", lastRestocked: "2023-10-05T16:20:00", sku: "TV-4K-04" },
    { id: "PROD-005", name: "Stainless Steel Water Bottle", category: "Lifestyle", price: "$24.99", stock: 350, status: "In Stock", lastRestocked: "2023-10-20T11:05:00", sku: "WB-SS-05" },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; dot: string; }> = {
      "In Stock": { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
      "Low Stock": { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
      "Out of Stock": { bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
    };
    return configs[status] || { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
  };

  return (
    <main className="pb-8 px-8 min-h-screen animate-in fade-in duration-500">
      <Section title="Inventory & Catalog" accentColor="green">
        <TableToolbar
          searchLabel="Search"
          searchPlaceholder="Search product name, SKU, ID..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onSearchSubmit={() => console.log("Searching for:", searchQuery)}
          onAddNew={() => console.log("Creating new product")}
          addNewLabel="New Product"
          className="mb-8"
        />

        <DataTable
          data={products}
          onExport={() => console.log("Exporting...")}
          showingLabel="products"
          columns={[
            {
              header: "Product ID",
              accessor: "id",
              className: "font-bold text-gray-900",
            },
            {
              header: "Product Name",
              accessor: (row) => (
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-gray-900">{row.name}</span>
                  <span className="text-[11px] text-gray-500">SKU: {row.sku}</span>
                </div>
              ),
            },
            {
              header: "Category",
              accessor: "category",
              className: "text-gray-600 font-medium",
            },
            {
              header: "Price",
              accessor: "price",
              className: "font-bold text-gray-900",
            },
            {
              header: "Stock",
              accessor: "stock",
              className: "text-gray-600 font-bold",
            },
            {
              header: "Status",
              accessor: (row) => {
                const config = getStatusConfig(row.status);
                return (
                  <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl ${config.bg} ${config.text} border border-white transition-all duration-300 cursor-default group`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-2 h-2 rounded-full opacity-40 animate-ping ${config.dot}`} />
                      <span className={`relative w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase">{row.status}</span>
                  </div>
                );
              },
            },
            {
              header: "Action",
              headerClassName: "text-right",
              className: "text-right",
              accessor: (row) => (
                <div className="flex items-center justify-end gap-2">
                  <IconButton
                    icon={<Icon name="visibility" size="sm" />}
                    onClick={() => handleView(row)}
                    className="text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                  />
                  <IconButton
                    icon={<Icon name="edit" size="sm" />}
                    onClick={() => handleEdit(row)}
                    className="text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                  />
                </div>
              ),
            },
          ]}
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
          totalItems={24}
          itemsPerPage={itemsPerPage}
        />
      </Section>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={isEditing ? "Edit Product" : "Product Details"}
      >
        {selectedProduct && (
          <div className="flex flex-col h-full">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 flex items-center justify-between mb-6 shrink-0">
              <div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-0.5">Price</p>
                <p className="text-2xl font-black text-emerald-700 leading-none">{selectedProduct.price}</p>
              </div>
              {(() => {
                const config = getStatusConfig(selectedProduct.status);
                return (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg} ${config.text} border border-white shadow-sm shrink-0`}>
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-1.5 h-1.5 rounded-full opacity-40 animate-ping ${config.dot}`} />
                      <span className={`relative w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{selectedProduct.status}</span>
                  </div>
                );
              })()}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col justify-between">
              <div className="grid grid-cols-1 gap-2 overflow-hidden">
                {isEditing ? (
                  <>
                    <Input label="Product Name" defaultValue={selectedProduct.name} />
                    <Input label="Product ID" defaultValue={selectedProduct.id} disabled />
                    <Input label="SKU" defaultValue={selectedProduct.sku} />
                    <Input label="Category" defaultValue={selectedProduct.category} />
                    <Input label="Price" defaultValue={selectedProduct.price} />
                    <Input label="Stock Level" defaultValue={selectedProduct.stock.toString()} />
                  </>
                ) : (
                  <div className="space-y-3">
                    <DetailItem label="Product ID" value={selectedProduct.id} />
                    <DetailItem label="Name" value={selectedProduct.name} />
                    <DetailItem label="SKU" value={selectedProduct.sku} />
                    <DetailItem label="Category" value={selectedProduct.category} />
                    <DetailItem label="Stock Level" value={`${selectedProduct.stock} units`} />
                    <DetailItem label="Last Restocked" value={new Date(selectedProduct.lastRestocked).toLocaleString()} />
                  </div>
                )}
              </div>

              <div className="pt-6 shrink-0">
                {isEditing ? (
                  <div className="flex gap-3">
                    <Button onClick={() => setIsSlideOverOpen(false)} fullWidth>Save Changes</Button>
                    <Button variant="secondary" onClick={() => setIsSlideOverOpen(false)} fullWidth>Cancel</Button>
                  </div>
                ) : (
                  <Button variant="secondary" onClick={() => handleEdit(selectedProduct)} fullWidth icon={<Icon name="edit" size="sm" />}>
                    Edit Product Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </SlideOver>
    </main>
  );
};

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="border-b border-gray-50 pb-2">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="text-sm font-bold text-gray-900">{value}</div>
  </div>
);

export default Products;
