import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

import { db } from '../firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const HomePage = () => {

  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {

    // 🔹 SCROLL POR HASH (#contacto)
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }

    // 🔹 TRAER PRODUCTOS
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), limit(6));
        const snapshot = await getDocs(q);

        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setFeaturedProducts(lista);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();

  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      <Header />

      <main className="pt-20">

        <HeroSection />

        {/* 🔥 NUEVA SECCIÓN PRODUCTOS */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">

            <h2 className="text-3xl font-bold text-center mb-10">
              Productos Destacados
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {featuredProducts.map(p => (
                <div key={p.id} className="border rounded-xl p-4 shadow-sm">

                  {p.image_url && (
                    <img
                      src={p.image_url}
                      className="rounded mb-4 w-full h-48 object-cover"
                    />
                  )}

                  <h3 className="font-semibold text-lg">{p.name}</h3>

                  <p className="text-sm text-gray-600 mb-2">
                    {p.description}
                  </p>

                  <p className="font-bold mb-4">
                    ${p.price}
                  </p>

                </div>
              ))}

            </div>

            <div className="text-center mt-10">
              <Link
                to="/tienda"
                className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700"
              >
                Ver toda la tienda
              </Link>
            </div>

          </div>
        </section>

        <ServicesSection />
        <AboutSection />
        <ContactSection />

      </main>

      <Footer />

    </div>
  );
};

export default HomePage;
