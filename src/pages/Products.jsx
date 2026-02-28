import React, { useState, useEffect } from 'react';
import { Plus, Search, Package, MoreHorizontal, CheckCircle2, XCircle, Save, Loader2, Tag } from 'lucide-react';
import { Modal } from '../components/Modal';
import { productService, marketService } from '../lib/api';

export default function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState([]); // In a real app, this would be the current store context
    const [formData, setFormData] = useState({ 
        name: '', 
        description: '', 
        status: 'draft',
        price: '',
        inventoryQuantity: '0',
        tags: ''
    });

    useEffect(() => {
        fetchProducts();
        // Fetch stores to get a valid storeId for creation
        // Note: In the real app there should be a store context
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Hardcoded storeId for demonstration if none exists
            // Ideally we'd fetch this from context
            const storeId = "demonstration-store-id"; 
            
            await productService.create({
                ...formData,
                storeId,
                price: parseFloat(formData.price),
                inventoryQuantity: parseInt(formData.inventoryQuantity),
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                variants: [
                    {
                        price: parseFloat(formData.price),
                        inventoryQuantity: parseInt(formData.inventoryQuantity),
                        options: {}
                    }
                ]
            });
            setIsModalOpen(false);
            fetchProducts();
            setFormData({ name: '', description: '', status: 'draft', price: '', inventoryQuantity: '0', tags: '' });
        } catch (error) {
            console.error('Failed to create product:', error);
            alert('Erreur lors de la création du produit. Assurez-vous que le serveur est lancé et la DB accessible.');
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Produits</h1>
                    <p className="text-slate-500">Gérez votre inventaire, vos prix et vos variantes.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Ajouter un produit
                </button>
            </header>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-300 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-12 flex justify-center">
                            <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Produit</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4">Type / Tags</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
                                                    <Package className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{product.name}</div>
                                                    <div className="text-xs text-slate-500">{product.variants?.length || 0} variantes</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                product.status === 'active' ? 'bg-green-100 text-green-800' : 
                                                product.status === 'draft' ? 'bg-slate-100 text-slate-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {product.status === 'active' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                                {product.status === 'active' ? 'Actif' : product.status === 'draft' ? 'Brouillon' : 'Archivé'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {product.variants?.reduce((acc, v) => acc + v.inventoryQuantity, 0) || 0} en stock
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {product.tags?.map(tag => (
                                                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                                        <Tag className="mr-1 h-3 w-3" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            Aucun produit trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Ajouter un nouveau produit"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nom du produit</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: T-shirt en coton bio"
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Prix (€)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Quantité en stock</label>
                            <input
                                type="number"
                                required
                                value={formData.inventoryQuantity}
                                onChange={(e) => setFormData({ ...formData, inventoryQuantity: e.target.value })}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Tags (séparés par des virgules)</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="Vêtements, Été, Bio"
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Statut initial</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2 bg-white w-full"
                        >
                            <option value="draft">Brouillon</option>
                            <option value="active">Actif</option>
                        </select>
                    </div>
                    <div className="pt-4 flex justify-end gap-3 border-t">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800"
                        >
                            <Save className="h-4 w-4" />
                            Enregistrer le produit
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
