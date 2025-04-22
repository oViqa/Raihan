import Link from 'next/link';
import { getProducts } from '@/app/lib/product';
import { getCategories } from '@/app/lib/category';
import FloatingWhatsAppButton from '@/app/components/FloatingWhatsAppButton';
import { FaLeaf } from 'react-icons/fa';
import { GiHerbsBundle, GiMortar } from 'react-icons/gi';
import FeaturedProductsSlider from '@/app/components/Productsslider';

export default async function Home() {
  // Fetch featured products (most recent 6 products)
  const products = await getProducts();
  const featuredProducts = products.slice(0, 6);

  // Fetch categories
  const categories = await getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        {/* Main image covers entire section */}
        <div
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat"
        style={{
          backgroundImage:
        "url('https://cdn.discordapp.com/attachments/1118652078659739739/1364188131011723395/0ED5F9F3-0AB1-4E7B-949C-785F9C79C223.png?ex=6808c2b3&is=68077133&hm=c3bd19690b3b418483afc94a18a2e093c7affcaa9933107b695fd7d17692dde7&')",
          backgroundSize: 'cover',
        }}
        />
        {/* Only keep the dark overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00000099] to-[#00000066]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center">
        <GiHerbsBundle className="text-[#c17f24] h-20 w-20 mb-6 animate-pulse" />
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white moroccan-heading">
        Coopérative Raihan
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-[#f0ece2] max-w-2xl">
        Découvrez des produits naturels authentiques récoltés par des générations d'agriculteurs locaux des montagnes de l'Atlas au Maroc
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link
          href="/products"
          className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl"
        >
          Explorez Notre Collection
        </Link>
        <Link
          href="/about"
          className="bg-transparent text-white border-2 border-[#c17f24] px-8 py-4 rounded-md font-medium hover:bg-[#c17f2420] transition-all duration-300 text-lg"
        >
          Notre Héritage
        </Link>
        </div>
      </div>
      </section>
      {/* Slider for Featured Products */}
      <section className="py-20 bg-[#f8f5ec]">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
        <div className="flex items-center justify-center mb-3">
          <FaLeaf className="h-6 w-6 text-[#6b7f3e] mr-2" />
          <h2 className="text-4xl font-bold text-[#4a5a2b] moroccan-heading">
          Nos Produits
          </h2>
        </div>
        <p className="text-[#8e846b] text-xl max-w-3xl mx-auto mt-3">
          Trésors sélectionnés à la main des meilleures récoltes du Maroc
        </p>
        </div>
        <FeaturedProductsSlider featuredProducts={featuredProducts} />
        <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-flex items-center text-[#6b7f3e] hover:text-[#4a5a2b] font-medium text-lg group"
        >
          Tous les produits
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
        </Link>
        </div>
      </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
        <div className="flex items-center justify-center mb-3">
          <GiMortar className="h-6 w-6 text-[#c17f24] mr-2" />
          <h2 className="text-4xl font-bold text-[#4a5a2b] moroccan-heading">
          Explorez Nos Collections
          </h2>
        </div>
        <p className="text-[#8e846b] text-xl max-w-3xl mx-auto mt-3">
          Catégories sélectionnées des meilleures offres naturelles du Maroc
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
          key={category.id}
          href={`/products?category=${category.id}`}
          className="moroccan-card group p-8 text-center transform hover:-translate-y-2 transition-all duration-500 hover:shadow-xl overflow-hidden"
          >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-[#4a5a2b] mb-3 group-hover:text-[#6b7f3e] transition-colors">
            {category.name}
            </h3>
            <p className="text-[#8e846b] mb-4">
            {category.description || `Authentique ${category.name.toLowerCase()} des montagnes de l'Atlas`}
            </p>
            <span className="inline-block text-[#c17f24] font-medium group-hover:translate-x-2 transition-transform">
            Découvrir →
            </span>
          </div>
          </Link>
        ))}
        </div>
      </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#323232] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <GiHerbsBundle className="h-8 w-8 text-[#6b7f3e] mr-2" />
          <h3 className="text-2xl font-bold">Raihan</h3>
        </div>
        <p className="mb-4 text-[#d3c8ab]">Trésors naturels des montagnes de l'Atlas</p>
        <p className="text-[#8e846b]">© {new Date().getFullYear()} Raihan. Tous droits réservés.</p>
        <div className="mt-6 space-x-4">
            <Link
            href="/products"
            className="text-[#d3c8ab] hover:text-white text-sm"
            >
            Nos Produits
            </Link>
            <span className="text-[#8e846b]">|</span>
            <Link
            href="/admin/login"
            className="text-[#d3c8ab] hover:text-white text-sm"
            >
            Portail Admin
            </Link>
        </div>
        </div>
      </div>
      </footer>

      <FloatingWhatsAppButton />
    </div>
  );
}
