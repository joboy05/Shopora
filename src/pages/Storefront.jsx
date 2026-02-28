import React, { useState, useEffect } from 'react';
import { ShoppingBag, Loader2, Package, Tag, ShoppingCart, X, Check } from 'lucide-react';
import { productService, orderService } from '../lib/api';

export default function Storefront() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderDone, setOrderDone] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getAll();
            // Only show active products on storefront
            setProducts(response.data.filter(p => p.status === 'active'));
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product, variant) => {
        setCart([...cart, { ...product, variant, cartId: Date.now() }]);
        setIsCartOpen(true);
    };

    const removeFromCart = (cartId) => {
        setCart(cart.filter(item => item.cartId !== cartId));
    };

    const total = cart.reduce((acc, item) => acc + parseFloat(item.variant.price), 0).toFixed(2);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            // Fake checkout logic
            await orderService.create({
                storeId: products[0].storeId,
                customerInfo: {
                    email: 'client@test.com',
                    firstName: 'Client',
                    lastName: 'Test'
                },
                items: cart.map(item => ({
                    variantId: item.variant.id,
                    quantity: 1,
                    price: parseFloat(item.variant.price)
                })),
                total: parseFloat(total)
            });
            setOrderDone(true);
            setCart([]);
            setTimeout(() => {
                setOrderDone(false);
                setIsCartOpen(false);
            }, 3000);
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('La commande a échoué. Vérifiez la connexion au serveur.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Storefront Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-black rounded flex items-center justify-center text-white font-bold italic">S</div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight text-black">SHOPORA <span className="text-sm font-normal text-slate-500 ml-1 italic">STORE</span></h1>
                </div>
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 text-slate-600 hover:text-black transition-colors"
                >
                    <ShoppingBag className="h-6 w-6" />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-black text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold">
                            {cart.length}
                        </span>
                    )}
                </button>
            </header>

            {/* Hero Section */}
            <section className="bg-white py-20 px-6 border-b border-slate-100">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <h2 className="text-5xl font-black text-black leading-tight italic">LA NOUVELLE ÈRE DU COMMERCE.</h2>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">Découvrez notre sélection exclusive de produits Shopora 2.0.</p>
                </div>
            </section>

            {/* Products Grid */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="h-8 w-8 text-black animate-spin" /></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map(product => (
                            <div key={product.id} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 p-4">
                                <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:scale-[1.02] transition-transform">
                                    <Package className="h-12 w-12 opacity-20" />
                                </div>
                                <div className="mt-4 flex flex-col flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-black text-lg">{product.name}</h3>
                                        <div className="font-black text-black">{product.variants?.[0]?.price || '0.00'} €</div>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500 line-clamp-2 h-10">{product.description}</p>
                                    <div className="mt-auto pt-4">
                                        <button 
                                            onClick={() => addToCart(product, product.variants[0])}
                                            disabled={!product.variants?.length}
                                            className="w-full bg-black text-white py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors disabled:opacity-50"
                                        >
                                            AJOUTER AU PANIER
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && (
                            <div className="col-span-full py-20 text-center text-slate-400 font-medium italic">Aucun produit fantastique n'est disponible pour le moment.</div>
                        )}
                    </div>
                )}
            </main>

            {/* Cart Sidebar Overlay */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform animate-slide-in">
                        <div className="p-6 border-b flex items-center justify-between bg-black text-white">
                            <h3 className="font-black italic text-xl">VOTRE PANIER</h3>
                            <button onClick={() => setIsCartOpen(false)}><X className="h-6 w-6" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                                    <ShoppingBag className="h-16 w-16 opacity-10" />
                                    <p className="font-medium italic">VOTRE PANIER EST VIDE.</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.cartId} className="flex gap-4 group">
                                        <div className="h-20 w-20 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                                            <Package className="h-8 w-8 opacity-20" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between font-bold text-black uppercase text-sm">
                                                <span>{item.name}</span>
                                                <span>{item.variant.price} €</span>
                                            </div>
                                            <button onClick={() => removeFromCart(item.cartId)} className="mt-2 text-xs text-slate-400 hover:text-red-500 font-bold uppercase tracking-tighter">Retirer</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="p-6 border-t bg-slate-50">
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-slate-500 uppercase">Sous-total</span>
                                <span className="text-2xl font-black text-black italic">{total} €</span>
                            </div>
                            <button 
                                onClick={handleCheckout}
                                disabled={cart.length === 0 || isCheckingOut || orderDone}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg"
                            >
                                {isCheckingOut ? <Loader2 className="h-5 w-5 animate-spin" /> : orderDone ? <Check className="h-5 w-5 text-green-400" /> : <ShoppingCart className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />}
                                {orderDone ? "COMMANDE RÉUSSIE !" : isCheckingOut ? "TRAITEMENT..." : "PAYER MAINTENANT"}
                            </button>
                            <p className="mt-4 text-[10px] text-center text-slate-400 font-bold uppercase italic">Paiement sécurisé par Shopora Engine.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
