/**
 * @title About Page Layout and Metadata
 * @author Abraham Elijah (Mr Grade)
 * @notice Defines metadata and layout for the About page
 * @dev Uses Next.js metadata API for SEO optimization
 */

// Metadata configuration for SEO and social sharing
export const metadata = {
  title: "About Chef Amos | Chef Amos's Kitchen",
  description:
    "Learn about Chef Amos's culinary journey, expertise, and passion for innovative cooking.",
  openGraph: {
    title: "About Chef Amos | Chef Amos's Kitchen",
    description: "Discover the culinary expertise and journey of Chef Amos",
    images: [
      {
        url: "/chef-amos.jpg",
        width: 1200,
        height: 630,
        alt: "Chef Amos plating a dish",
      },
    ],
  },
};

/**
 * @notice Layout wrapper for the About page
 * @dev Provides consistent layout structure for about page content
 * @param children - React components to be rendered within the layout
 */
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
