import Image from "next/image";
import Link from "next/link";

/**
 * @title About Page Component
 * @author Abraham Elijah (Mr Grade)
 * @notice Displays Chef Amos's professional background and culinary expertise
 * @dev Uses Next.js Image component for optimized image loading
 */
export const metadata = {
  title: "About Me - Amos Blog",
  description: "Learn more about me and my journey in technology and writing.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Chef's Image Section */}
            <div className="md:flex-shrink-0 relative h-96 md:h-auto md:w-1/2">
              <Image
                src="/chef-amos.jpg"
                alt="Chef Amos plating a dish"
                fill
                className="object-cover"
                priority // Prioritize loading for above-the-fold image
              />
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                About Chef Amos
              </h1>
              <div className="prose prose-lg text-gray-600">
                {/* Chef's Bio */}
                <p>
                  With a passion for culinary excellence and years of experience
                  in prestigious kitchens, I've dedicated my career to mastering
                  the art of fine cuisine and innovative cooking techniques.
                </p>
                <p className="mt-4">
                  My culinary journey has been shaped by a blend of classical
                  training and contemporary innovation. I specialize in creating
                  dishes that honor traditional techniques while embracing
                  modern gastronomy.
                </p>
                <p className="mt-4">
                  Through this blog, I share my culinary insights, signature
                  recipes, and cooking techniques. Join me as we explore the
                  fascinating world of food, from kitchen fundamentals to
                  advanced culinary artistry.
                </p>

                {/* Expertise Section */}
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Culinary Expertise
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Fine Dining Cuisine</li>
                    <li>Modern Gastronomy</li>
                    <li>Food Presentation</li>
                    <li>Menu Development</li>
                    <li>Culinary Education</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Back to Blog */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
