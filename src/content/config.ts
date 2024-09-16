import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	schema: ({ image }) =>
		z.object({
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			description: z.string().min(50).max(160),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			title: z.string().max(60),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
		}),
	type: "content",
});

const work = defineCollection({
	schema: ({ image }) =>
		z.object({
			company: z.string(),
			companyURL: z.string().optional(),
			endDate: z.union([z.date(), z.string()]),
			logo: image().optional(),
			role: z.string(),
			startDate: z.date(),
		}),
	type: "content",
});

const resources = defineCollection({
	schema: z.object({
		description: z.string(),
		draft: z.boolean().default(false),
		publishDate: z.string().transform((str) => new Date(str)),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		title: z.string(),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
	}),
	type: "content",
});

export const collections = { post, resources, work };
