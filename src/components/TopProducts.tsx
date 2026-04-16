import { Badge, Icon, Button } from "./ui";

const products = [
  {
    name: "Quantum Headphones",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnKrnLrwphysLkFAEIwqbGUZOgI1ILNS4dmj2n_ESHB-1JYr58Fuwir-GQ7AvuRhoYOGxsi1eQnk-B6bQk-UIZcOMGjKPfHLUBNHdruLw4gmsPBsP8wIAEHA7a_s2-KB5NzHP0jUPRIZa38HDuAhUr-A4pmDVJ-cwbXYl3dUQ0JmSb8C1623A8Se7se3yQQIlhBmsKA0mJ6xYSLOrQk0vX4nQMJ7Qms5zQEcVKeNlT3-KHd_6trBVrOxmpFArp1KKjU7Dp3a2jEg",
    category: "Electronics",
    revenue: "$4,520",
    units: 124,
    rating: 4.9,
    status: "In Stock",
    statusVariant: "success",
  },
  {
    name: "Apex Watch V2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCN4aeEZdFn1cVapPXHyQWGOkNDNfnoTbwzXjh1bMFx1xQMKXbqtkoJhRsou03QouJp862f4wAQu-US4XGeyU4M_GqdWyENamDl6cmA2G1S6ddbPacZ1YEI_RkBuhB9BexZKc1MDjiGujHwiB1tYZU4j5dO9LIhIxLQJgMvZjLOWwVL1IuZUY1KNBctmLIZlnYFdGfwOs6uBKTVRmQtH8CvP4XAVmJ3LMkJdrhpYirts7QqqR9SYGIqXfjtFNQag_j72FBqK2F7AQ",
    category: "Electronics",
    revenue: "$3,840",
    units: 88,
    rating: 4.8,
    status: "In Stock",
    statusVariant: "success",
  },
  {
    name: "Nitro Sneakers",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCk0Wd8rZtNgEgJvRbD1uiLQdJHEemf7YyOHQpkiNLJGpdwztZ1Qpc9rtQk69ghHP8t5kF20bBBjrFvrfbIS5AFZysiIjlx9aAuEthh1SCE1G1l1kEkTlkhS2LqZl3eLK157e7w7ksLnU50NT6GCmbvuyrcTYeYK8JJcOrf9Ksxh-cWhWQExpw0i8hovXhdzvwJV6vqUpfqtWmSVIGaMI2G-bJTZHTA9nU_MYHtk5KGob7LY5-gaKzpY4Hl9TntcB7LLLcEtvszoA",
    category: "Sports",
    revenue: "$2,150",
    units: 156,
    rating: 4.7,
    status: "Low Stock",
    statusVariant: "warning",
  },
  {
    name: "Studio Mic Pro",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAv8uUgHNDYRi2DohzCpsdjC7vvDWPPLZQDgUTF7ums6Gec3ANpFMzeR28xOzw6l-VK5i0Ch2cr-tbpwGRLPWfQC_pcLMcYlTGCvHkggijRW2nuYq99eesK7Xa9Xji3JYty6g8kPdy2kZFiaB7sJ8WzmdmZu8qFPIu3OuFa2UoZIQqjF2JYvUmmj9TX4aYQ6s7dbaKBpO4m0OpYRA18GeECfxZYkS4SnZD3I-8Xt_lvxHwY2LqrPXO71YqE2z8VYLW_20x-cTMH9A",
    category: "Accessories",
    revenue: "$1,920",
    units: 42,
    rating: 4.9,
    status: "In Stock",
    statusVariant: "success",
  },
  {
    name: "Zen Ceramic Set",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOzrxoUKCXkt5kc17AHbZt7P_h6p4ai3OkL5pqBh13okJBap6WDFzswZRwCTTiPtk2frbcnSOtjlNsqnNcbpGgSwzCkoBFf4b6mIfU0q6fyyPAFF8M1FYNyvxHEbmNYaGH6zNN3iceMwCniYO5wu42v3MH1dauosQtDCFmzba__hrD240bx5FjRavADAzoVfXNV58ZK93zJbRxN6zRMGGv899C9Q7P17dTMH5FbX6MONcvNF9eT1DuBkR63_74yWMS9XB0-hEMNw",
    category: "Home & Garden",
    revenue: "$1,480",
    units: 210,
    rating: 4.6,
    status: "Out of Stock",
    statusVariant: "error",
  },
];

const TopProducts = () => {
  return (
    <div className="col-span-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex justify-between items-center">
        <h4 className="text-lg font-bold text-gray-900">Top Products</h4>
        <Button variant="link">View all report</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-gray-500">
              <th className="px-8 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Revenue</th>
              <th className="px-6 py-4">Units Sold</th>
              <th className="px-6 py-4">Avg Rating</th>
              <th className="px-8 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                      <img
                        alt="Product"
                        className="w-full h-full object-cover"
                        src={product.image}
                      />
                    </div>
                    <span className="font-bold text-gray-800">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  {product.revenue}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">
                  {product.units}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Icon
                      name="star"
                      size="lg"
                      filled
                      className="text-yellow-400"
                    />
                    <span className="text-sm font-bold">{product.rating}</span>
                  </div>
                </td>
                <td className="px-8 py-4 text-right">
                  <Badge variant={product.statusVariant as any}>
                    {product.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
