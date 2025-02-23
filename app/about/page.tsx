import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Me - Amos Blog",
  description: "Learn more about me and my journey in technology and writing.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            About Me
          </h1>
          <div className="relative w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden">
            <Image
              src="/your-photo.jpg" // Add your photo to public directory
              alt="Your Name"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Full-stack developer, writer, and tech enthusiast
          </p>
        </div>

        {/* Bio Section */}
        <div className="prose prose-lg max-w-none mb-16">
          <h2>My Story</h2>
          <p>
            Hello! I'm Amos, a passionate developer with a love for creating
            meaningful digital experiences. I specialize in web development,
            focusing on modern technologies like React, Next.js, and Node.js.
          </p>

          <h2>What I Do</h2>
          <p>
            I build scalable web applications, write about technology, and share
            my knowledge through this blog. My goal is to create content that
            helps others learn and grow in their tech journey.
          </p>

          {/* Skills Grid */}
          <h2>Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose mb-8">
            {[
              "React/Next.js",
              "TypeScript",
              "Node.js",
              "PostgreSQL",
              "TailwindCSS",
              "AWS",
            ].map((skill) => (
              <div
                key={skill}
                className="bg-gray-50 rounded-lg p-4 text-center text-gray-800"
              >
                {skill}
              </div>
            ))}
          </div>

          <h2>Let's Connect</h2>
          <p>
            I'm always interested in connecting with fellow developers and tech
            enthusiasts. Feel free to reach out!
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          {[
            {
              name: "GitHub",
              url: "https://github.com/yourusername",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              ),
            },
            {
              name: "Twitter",
              url: "https://twitter.com/yourusername",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              ),
            },
            {
              name: "LinkedIn",
              url: "https://linkedin.com/in/yourusername",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              ),
            },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Back to Blog */}
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
