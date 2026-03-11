// AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Toaster } from '../components/ui/sonner';
import { Plus, Edit, Trash2, LogOut, Package, Tag } from 'lucide-react';
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp, doc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.16.0/firebase-firestore.js';

const AdminPage = ({ user, logout }) => {
  const navigate = useNavigate();
  const db = window.db;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image_file: null,
    image_url: '',
    category_ids: []
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(lista);
    } catch (error) {
      console.error(error);
      toast.error('Error cargando productos');
    }
  };

  const fetchCategories = async () => {
    try {
      const q = query(collection(db, 'categories'), orderBy('name'));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(lista);
    } catch (error) {
      console.error(error);
      toast.error('Error cargando categorías');
    }
  };

  // SUBIR IMAGEN A CLOUDINARY
  const uploadImage = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/duiwinvef/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const response = await fetch(url, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = productForm.image_url || '';

      if (productForm.image_file) {
        imageUrl = await uploadImage(productForm.image_file);
      }

      const data = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        category_ids: productForm.category_ids,
        image_url: imageUrl,
        createdAt: serverTimestamp()
      };

      if (editingProduct) {
        const docRef = doc(db, 'products', editingProduct.id);
        await updateDoc(docRef, data);
        toast.success('Producto actualizado');
      } else {
        await addDoc(collection(db, 'products'), data);
        toast.success('Producto creado');
      }

      setShowProductDialog(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        image_file: null,
        image_url: '',
        category_ids: []
      });

      fetchProducts();

    } catch (error) {
      console.error(error);
      toast.error('Error guardando producto');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        toast.success('Producto eliminado');
        fetchProducts();
      } catch (error) {
        console.error(error);
        toast.error('Error eliminando producto');
      }
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: categoryForm.name,
        description: categoryForm.description
      };

      if (editingCategory) {
        const docRef = doc(db, 'categories', editingCategory.id);
        await updateDoc(docRef, data);
        toast.success('Categoría actualizada');
      } else {
        await addDoc(collection(db, 'categories'), data);
        toast.success('Categoría creada');
      }

      setShowCategoryDialog(false);
      setEditingCategory(null);
      setCategoryForm({ name: '', description: '' });
      fetchCategories();

    } catch (error) {
      console.error(error);
      toast.error('Error guardando categoría');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('¿Eliminar esta categoría?')) {
      try {
        await deleteDoc(doc(db, 'categories', id));
        toast.success('Categoría eliminada');
        fetchCategories();
      } catch (error) {
        console.error(error);
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

      {/* TODO EL RESTO DE TU UI QUEDA EXACTAMENTE IGUAL */}
