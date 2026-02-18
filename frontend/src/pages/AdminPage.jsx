import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';
import { Plus, Edit, Trash2, LogOut, Package, Tag } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPage = () => {
  const { user, token, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', image_url: '', category_ids: []
  });
  
  const [categoryForm, setCategoryForm] = useState({
    name: '', description: ''
  });

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
    } else {
      fetchProducts();
      fetchCategories();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products?active_only=false`);
      setProducts(response.data);
    } catch (error) {
      toast.error('Error cargando productos');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data);
    } catch (error) {
      toast.error('Error cargando categorías');
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const data = { ...productForm, price: parseFloat(productForm.price) };
      if (editingProduct) {
        await axios.put(`${API}/products/${editingProduct.id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Producto actualizado');
      } else {
        await axios.post(`${API}/products`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Producto creado');
      }
      setShowProductDialog(false);
      setEditingProduct(null);
      setProductForm({ name: '', description: '', price: '', image_url: '', category_ids: [] });
      fetchProducts();
    } catch (error) {
      toast.error('Error guardando producto');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await axios.delete(`${API}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Producto eliminado');
        fetchProducts();
      } catch (error) {
        toast.error('Error eliminando producto');
      }
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`${API}/categories/${editingCategory.id}`, categoryForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Categoría actualizada');
      } else {
        await axios.post(`${API}/categories`, categoryForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Categoría creada');
      }
      setShowCategoryDialog(false);
      setEditingCategory(null);
      setCategoryForm({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error guardando categoría');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('¿Eliminar esta categoría?')) {
      try {
        await axios.delete(`${API}/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Categoría eliminada');
        fetchCategories();
      } catch (error) {
        toast.error('Error eliminando categoría');
      }
    }
  };

  const toggleCategoryInProduct = (categoryId) => {
    setProductForm(prev => ({
      ...prev,
      category_ids: prev.category_ids.includes(categoryId)
        ? prev.category_ids.filter(id => id !== categoryId)
        : [...prev.category_ids, categoryId]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster richColors />
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">Hola, {user?.username}</span>
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products"><Package className="w-4 h-4 mr-2" /> Productos</TabsTrigger>
            <TabsTrigger value="categories"><Tag className="w-4 h-4 mr-2" /> Categorías</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Productos</h2>
              <Button onClick={() => { setEditingProduct(null); setProductForm({ name: '', description: '', price: '', image_url: '', category_ids: [] }); setShowProductDialog(true); }}>
                <Plus className="w-4 h-4 mr-2" /> Nuevo Producto
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Card key={product.id}>
                  <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <p className="text-sm text-slate-600">${product.price}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setEditingProduct(product); setProductForm(product); setShowProductDialog(true); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Categorías</h2>
              <Button onClick={() => { setEditingCategory(null); setCategoryForm({ name: '', description: '' }); setShowCategoryDialog(true); }}>
                <Plus className="w-4 h-4 mr-2" /> Nueva Categoría
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {categories.map(cat => (
                <Card key={cat.id}>
                  <CardHeader>
                    <CardTitle>{cat.name}</CardTitle>
                    <p className="text-sm text-slate-600">{cat.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setEditingCategory(cat); setCategoryForm(cat); setShowCategoryDialog(true); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteCategory(cat.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Editar' : 'Nuevo'} Producto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} required />
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} required />
            </div>
            <div>
              <Label>Precio</Label>
              <Input type="number" step="0.01" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} required />
            </div>
            <div>
              <Label>URL Imagen</Label>
              <Input value={productForm.image_url} onChange={(e) => setProductForm({...productForm, image_url: e.target.value})} required />
            </div>
            <div>
              <Label>Categorías</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map(cat => (
                  <Button key={cat.id} type="button" size="sm" variant={productForm.category_ids.includes(cat.id) ? "default" : "outline"} onClick={() => toggleCategoryInProduct(cat.id)}>
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full">Guardar</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Editar' : 'Nueva'} Categoría</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveCategory} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input value={categoryForm.name} onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})} required />
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea value={categoryForm.description} onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})} />
            </div>
            <Button type="submit" className="w-full">Guardar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
