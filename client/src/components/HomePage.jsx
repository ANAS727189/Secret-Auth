import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '../context/UserContext';

const features = [
  { name: 'Easy Integration', description: 'Seamlessly integrate with your existing tools and workflows.' },
  { name: 'Powerful Analytics', description: 'Gain valuable insights with our advanced analytics dashboard.' },
  { name: '24/7 Support', description: 'Our dedicated support team is always ready to assist you.' },
  { name: 'Customizable Workflows', description: 'Create and customize workflows to fit your unique needs.' },
  { name: 'Secure Data Storage', description: 'Your data is encrypted and stored securely in the cloud.' },
  { name: 'Regular Updates', description: 'Enjoy new features and improvements with regular updates.' },
];

const testimonials = [
  { name: 'Jane Doe', feedback: 'This platform has transformed our productivity levels!' },
  { name: 'John Smith', feedback: 'A seamless experience with unmatched support and insights.' },
];
const socialLinks = [
  { 
    name: 'Facebook', 
    href: '#', 
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M22.675 0h-21.35C.601 0 0 .601 0 1.35v21.3C0 23.399.601 24 1.325 24h21.35C23.399 24 24 23.399 24 22.675V1.325C24 .601 23.399 0 22.675 0zm-3.415 12.06h-2.058v9.242h-3.048V12.06h-1.798v-3.47h1.798V6.794c0-2.575 1.493-4.03 3.894-4.03 1.1 0 2.293.185 2.293.185v2.578h-1.245c-1.219 0-1.598.762-1.598 1.547v1.796h2.942l-.468 3.47z" />
      </svg>
    ) 
  },
  { 
    name: 'Instagram', 
    href: '#', 
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 2.163c3.207 0 3.588.012 4.85.07 1.216.058 1.952.249 2.417.418.467.168 1.047.54 1.546 1.047.5.5.872 1.079 1.04 1.546.169.465.36 1.2.418 2.417.057 1.262.07 1.643.07 4.85 0 3.207-.012 3.588-.07 4.85-.058 1.216-.249 1.952-.418 2.417-.168.467-.54 1.047-1.047 1.546-.5.5-1.079.872-1.546 1.04-.465.169-1.2.36-2.417.418-1.262.058-1.643.07-4.85.07-3.207 0-3.588-.012-4.85-.07-1.216-.058-1.952-.249-2.417-.418-.467-.168-1.047-.54-1.546-1.047-.5-.5-.872-1.079-1.04-1.546-.169-.465-.36-1.2-.418-2.417C2.175 14.751 2.163 14.37 2.163 11.163c0-3.207.012-3.588.07-4.85.058-1.216.249-1.952.418-2.417.168-.467.54-1.047 1.047-1.546.5-.5 1.079-.872 1.546-1.04.465-.169 1.2-.36 2.417-.418C8.412 2.175 8.793 2.163 12 2.163zm0-2.163C8.739 0 8.357.012 7.35.07 6.254.129 5.447.318 4.895.621 4.342.925 3.811 1.408 3.35 1.867c-.46.46-.943.893-1.246 1.444-.505 1.308-.648 2.542-.648 5.843 0 3.302.143 4.536.648 5.843.303.551.786.984 1.246 1.444.461.46.975.943 1.526 1.15.558.209 1.372.388 2.477.513.996.122 1.689.137 2.941.137 1.267 0 1.648-.012 2.941-.137 1.105-.125 1.919-.304 2.477-.513.552-.208 1.065-.691 1.526-1.15.46-.46.785-.893 1.246-1.444.505-1.308.648-2.542.648-5.843 0-3.302-.143-4.536-.648-5.843-.462-.551-.786-1.084-1.246-1.444-.46-.46-.943-.943-1.526-1.15-.558-.209-1.372-.388-2.477-.513C13.648.012 13.267 0 12 0z" />
      </svg>
    ) 
  },
  { 
    name: 'Twitter', 
    href: '#', 
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.014-.607 1.794-1.56 2.165-2.724-.951.563-2.007.975-3.127 1.195-.895-.953-2.17-1.545-3.594-1.545-2.72 0-4.919 2.198-4.919 4.917 0 .385.043.761.127 1.124-4.083-.205-7.703-2.158-10.148-5.138-.426.731-.667 1.577-.667 2.476 0 1.71.87 3.215 2.189 4.099-.805-.026-1.563-.247-2.228-.616v.061c0 2.385 1.693 4.374 3.947 4.829-.414.112-.849.171-1.293.171-.316 0-.623-.031-.927-.089.623 1.951 2.433 3.376 4.574 3.417-1.675 1.314-3.783 2.095-6.073 2.095-.394 0-.782-.023-1.167-.067 2.161 1.383 4.724 2.185 7.468 2.185 8.951 0 13.855-7.427 13.855-13.857 0-.211-.006-.422-.014-.632.951-.688 1.775-1.55 2.426-2.54z" />
      </svg>
    ) 
  },
  { 
    name: 'GitHub', 
    href: '#', 
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 .296c-6.627 0-12 5.373-12 12 0 5.304 3.438 9.8 8.207 11.387.6.111.827-.261.827-.577 0-.284-.01-1.236-.017-2.242-3.338.724-4.046-1.613-4.046-1.613-.546-1.385-1.333-1.754-1.333-1.754-1.092-.747.083-.732.083-.732 1.21.085 1.844 1.241 1.844 1.241 1.073 1.836 2.809 1.306 3.494.999.108-.776.42-1.306.76-1.606-2.665-.303-5.467-1.332-5.467-5.933 0-1.312.469-2.383 1.235-3.22-.125-.303-.535-1.53.117-3.185 0 0 1.008-.322 3.303 1.227a11.523 11.523 0 0 1 3.006-.404c1.02.004 2.053.139 3.006.404 2.295-1.549 3.303-1.227 3.303-1.227.652 1.655.243 2.882.118 3.185.766.837 1.235 1.908 1.235 3.22 0 4.612-2.81 5.628-5.482 5.922.43.37.813 1.099.813 2.219 0 1.604-.014 2.899-.014 3.287 0 .319.225.694.832.577C20.563 21.096 24 16.6 24 12.296c0-6.627-5.373-12-12-12" />
      </svg>
    ) 
  },
];


const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <main className="flex-grow">
        {/* Hero section */}
        <section className={`text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} py-40 md:py-64 bg-gradient-to-b from-white to-gray-50`}>
          <h1 className="text-6xl sm:text-6xl md:text-7xl font-extrabold">
            <span>Welcome to</span>
            <span className="text-indigo-600 block">Our Amazing Platform</span>
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-500">
            Unlock potential with seamless integrations, powerful analytics, and secure workflows.
          </p>
          <div className="mt-12 flex justify-center space-x-6">
            <Link to= {user ? '/secret' : '/login'} className="px-10 py-4 text-lg bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
              Get Started
            </Link>
            <Link to="/learn-more" className="px-10 py-4 text-lg bg-white text-indigo-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              Learn More
            </Link>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center">Our Features</h2>
            <p className="mt-6 text-xl text-gray-500 text-center">
              Enhance your productivity with a feature-rich platform.
            </p>
            <dl className="mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition">
                  <CheckCircle className="text-indigo-500 w-10 h-10 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">{feature.name}</h3>
                  <p className="mt-3 text-gray-500">{feature.description}</p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold">What Our Users Say</h2>
            <p className="mt-6 text-lg text-gray-500">
              Discover why professionals love using our platform to boost their productivity.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-gray-100 p-8 rounded-lg shadow-md">
                  <p className="text-lg text-gray-700">{testimonial.feedback}</p>
                  <p className="mt-4 font-semibold text-indigo-600">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-indigo-600 text-white text-center">
          <h2 className="text-4xl font-extrabold">Join Thousands of Happy Users</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Start using our platform today and experience productivity at its finest.
          </p>
          <div className="mt-8">
            <Link to="/signup" className="px-12 py-4 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition">
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer section */}
      <footer className="py-10 bg-gray-800 text-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-400 hover:text-gray-100 transition">
                <link.icon className="w-6 h-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
