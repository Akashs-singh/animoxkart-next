import { Metadata } from 'next';
import { getAbsoluteUrl } from '@/lib/site-url';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dog Products | Animoxkart - Premium Pet Accessories',
  description: 'Shop all dog products at Animoxkart. Premium collars, leashes, harnesses, ropes, body belts and more for your beloved dog.',
  keywords: 'dog products, dog accessories, dog collar, dog leash, dog harness, pet supplies',
  openGraph: {
    title: 'Dog Products | Animoxkart',
    description: 'Shop all dog products at Animoxkart. Premium collars, leashes, harnesses, and more.',
    type: 'website',
    url: getAbsoluteUrl('/pets/dog'),
  },
  alternates: {
    canonical: getAbsoluteUrl('/pets/dog'),
  },
};

export default function DogProductsPage() {
  const categories = [
    { name: 'Collars', slug: 'collar', description: 'Stylish and durable dog collars', icon: '🦴' },
    { name: 'Leashes', slug: 'leash', description: 'Premium quality dog leashes', icon: '🐕' },
    { name: 'Harnesses', slug: 'harness', description: 'Comfortable dog harnesses', icon: '🎽' },
    { name: 'Body Belts', slug: 'body-belt', description: 'Secure dog body belts', icon: '🔒' },
    { name: 'Ropes', slug: 'rope', description: 'Strong and reliable dog ropes', icon: '🪢' },
    { name: 'Chains', slug: 'chain', description: 'Durable dog chains', icon: '⛓️' },
  ];

  return (
    <div className="dog-products-landing">
      {/* Hero Section */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
            🐕 Dog Products
          </h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            Premium quality accessories for your beloved dog. From collars to leashes, we have everything your furry friend needs.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-section" style={{ padding: '60px 20px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#2d3748' }}>
            Shop by Category
          </h2>
          <div className="row">
            {categories.map((category) => (
              <div key={category.slug} className="col-lg-4 col-md-6 mb-4">
                <Link href={`/products/dog/${category.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="category-card" style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '40px',
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    height: '100%'
                  }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{category.icon}</div>
                    <h3 style={{ fontSize: '1.8rem', color: '#667eea', marginBottom: '15px' }}>
                      {category.name}
                    </h3>
                    <p style={{ color: '#718096', fontSize: '1.1rem' }}>
                      {category.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" style={{
        background: '#f7fafc',
        padding: '60px 20px'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>✨</div>
              <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>Premium Quality</h4>
              <p style={{ color: '#718096' }}>High-quality materials for durability</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚚</div>
              <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>Fast Delivery</h4>
              <p style={{ color: '#718096' }}>Quick shipping across India</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💯</div>
              <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>100% Satisfaction</h4>
              <p style={{ color: '#718096' }}>Quality guaranteed or money back</p>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
        }
        
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2rem !important;
          }
          .hero-section p {
            font-size: 1.2rem !important;
          }
        }
      `}} />
    </div>
  );
}

export const revalidate = 3600;

// Made with Bob