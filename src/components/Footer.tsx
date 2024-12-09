import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 py-12">
      {/* Top Section */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About Section */}
        <div>
          <h1 className="text-2xl font-semibold mb-4">Furniro</h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            400 University Drive, Suite 200, Coral Gables, FL 33134, USA
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-medium mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-yellow-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-yellow-600 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-yellow-600 transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Support</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/payment-options"
                className="hover:text-yellow-600 transition"
              >
                Payment Options
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-yellow-600 transition">
                Returns
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-yellow-600 transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="text-lg font-medium mb-4">Stay Updated</h2>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to our newsletter for updates and exclusive offers.
          </p>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            <button
              type="submit"
              className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center">
        <p className="text-sm text-gray-600">
          &copy; 2023 Furniro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
