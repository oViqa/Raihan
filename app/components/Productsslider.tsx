'use client';

import Slider from 'react-slick';
import ProductCard from '@/app/components/ProductCard';
import { GiHerbsBundle } from 'react-icons/gi';
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductsSlider({ featuredProducts }: { featuredProducts: any[] }) {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500, // Transition speed (in ms) for each slide
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 2000, // Time (in ms) between slides (e.g., 2000ms = 2 seconds)
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };

  return (
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={3}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={3000}
      responsive={[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
    >
      {featuredProducts.length > 0 ? (
        featuredProducts.map((product) => (
          <div key={product.id} className="p-4">
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <div className="col-span-full moroccan-card p-12 text-center">
          <GiHerbsBundle className="h-16 w-16 text-[#d3c8ab] mx-auto mb-4" />
          <p className="text-lg text-[#4a5a2b]">Our treasures are being harvested.</p>
          <Link
            href="/admin/dashboard/products/new"
            className="mt-4 inline-block text-[#6b7f3e] font-medium hover:text-[#4a5a2b]"
          >
            Add your first product
          </Link>
        </div>
      )}
    </Slider>
  );
}