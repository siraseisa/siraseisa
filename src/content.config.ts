import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(), // Description用に追加
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).optional(),
			heroImage: z.string().optional(), // OGP・アイキャッチ画像用に追加
			image: z.string().optional(),     // 予備用に追加
		}),
});

const about = defineCollection({
	loader: glob({ base: './src/content/about', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			name: z.string(),
			title: z.string(),
		}),
});

export const collections = { blog, about };
