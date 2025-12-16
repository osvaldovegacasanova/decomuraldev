import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const commonFields = {
  title: z.string(),
  description: z.string(),
  meta_title: z.string().optional(),
  date: z.union([z.date(), z.string()]).optional(),
  image: z.string().optional(),
  draft: z.boolean(),
};

// Post collection schema
const blogCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/blog",
  }),
  schema: z.object({
    ...commonFields,
    categories: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    ...commonFields,
  }),
});

// about collection schema
const aboutCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/about",
  }),
  schema: z.object({
    ...commonFields,
    images_gallery: z.array(z.string()),
    blog_section: z.object({
      enable: z.boolean(),
      title: z.string().optional(),
      subtitle: z.string(),
      description: z.string().optional(),
      show_blog_count: z.number(),
    }),
    team_section: z.object({
      enable: z.boolean(),
      title: z.string().optional(),
      subtitle: z.string(),
      members: z.array(
        z.object({
          name: z.string(),
          designation: z.string(),
          avatar: z.string().optional(),
        }),
      ),
    }),
  }),
});

// reviews collection schema
const reviewsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/reviews" }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string(),
    testimonials: z.array(
      z.object({
        name: z.string(),
        designation: z.string(),
        content: z.string(),
        avatar: z.string().optional(),
        featured: z.boolean().optional(),
      }),
    ),
  }),
});

// contact collection schema
const contactCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    ...commonFields,
    address_section: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

// Homepage collection schema
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      spinning_text: z.string().optional(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    gallery: z.object({
      enable: z.boolean(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      images: z.array(z.string()),
    }),
    fun_facts: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      metrics: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          counter: z.object({
            count: z.string(),
            count_suffix: z.string(),
            count_prefix: z.string(),
            count_duration: z.number(),
          }),
        }),
      ),
    }),
    services: z.object({
      enable: z.boolean(),
      title: z.string(),
      subtitle: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    services_facts: z.object({
      enable: z.boolean(),
      title: z.string(),
      subtitle: z.string(),
      metrics: z.array(z.object({ name: z.string(), description: z.string() })),
    }),
    projects: z.object({
      enable: z.boolean(),
      title: z.string(),
      subtitle: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
  }),
});

// Services collection schema
const servicesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/services",
  }),
  schema: z.object({
    ...commonFields,
    categories: z.array(z.string()).optional(),
    featured_in_homepage: z.boolean().optional(),
    features: z
      .array(
        z.object({
          name: z.string().optional(),
          description: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

// Career collecitons schema
const careerCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/career",
  }),
  schema: z.object({
    ...commonFields,
    available_jobs: z.object({
      title: z.string(),
      description: z.string(),
      jobs: z
        .array(
          z.object({
            name: z.string(),
            location: z.string(),
            link: z.string(),
          }),
        )
        .optional(),
    }),
  }),
});

// Gallery collection schema
const galleryCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/gallery" }),
  schema: z.object({
    ...commonFields,
    gallery_images: z.array(
      z.object({
        design: z.string(),
        designer: z.string(),
        image: z.string(),
      }),
    ),
  }),
});

// FAQs collection schema
const faqsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/faqs" }),
  schema: z.object({
    ...commonFields,
    badge: z.object({
      enable: z.boolean(),
      label: z.string(),
      icon: z.string().optional(),
      bg_color: z.string(),
    }),
    button: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
    list: z.array(z.object({ question: z.string(), answer: z.string() })),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/projects",
  }),
  schema: z.object({
    ...commonFields,
    featured_in_homepage: z.boolean().optional(),
    client_name: z.string().optional(),
    project_type: z.string().optional(),
  }),
});

// Call to Action collection schema
const ctaSectionCollection = defineCollection({
  loader: glob({
    pattern: "call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    button_solid: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
    button_outline: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
  }),
});

// Collections collection schema
const collectionsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/collections",
  }),
  schema: z.object({
    ...commonFields,
    active: z.boolean().default(true),
    linea: z.enum(["Diseño", "Personalizados", "Infantiles", "Vinilicos"]),
    slug: z.string(),
    folder: z.string(),
    hero_slider: z.object({
      enabled: z.boolean(),
      eyebrow: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      cta_text: z.string().optional(),
      cta_link: z.string().optional(),
      image: z.string().nullable().optional(),
    }).optional(),
    showcase: z.object({
      featured: z.boolean(),
      featured_image: z.string().nullable().optional(),
      order: z.number().optional(),
    }).optional(),
    sku_count: z.number().optional(),
    available_colors: z.array(z.string()).optional(),
    available_patterns: z.array(z.string()).optional(),
  }),
});

// Wallpapers collection schema
const wallpapersCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/wallpapers",
  }),
  schema: z.object({
    ...commonFields,
    codigo: z.string(),
    linea: z.enum(["Diseño", "Personalizados", "Infantiles", "Vinilicos"]),
    coleccion: z.string(),
    coleccion_slug: z.string(),
    color: z.string().default("default"),
    patron: z.string().nullable().optional(),
    habitacion: z.string().nullable().optional(),
    images: z.object({
      sample: z.string().nullable().optional(),
      ambiente: z.array(z.string()).nullable().optional(),
    }),
    nueva: z.boolean().default(false),
    disponible: z.boolean().default(true),
    error: z.boolean().default(false),
  }),
});

// Export collections
export const collections = {
  // Pages
  homepage: homepageCollection,
  blog: blogCollection,
  pages: pagesCollection,
  about: aboutCollection,
  contact: contactCollection,
  services: servicesCollection,
  projects: projectsCollection,
  gallery: galleryCollection,
  career: careerCollection,
  reviews: reviewsCollection,
  faqs: faqsCollection,

  // Sections
  ctaSection: ctaSectionCollection,

  // Decomural content
  collections: collectionsCollection,
  wallpapers: wallpapersCollection,
};
