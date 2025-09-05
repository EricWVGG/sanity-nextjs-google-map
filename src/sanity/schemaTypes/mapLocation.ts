import { defineField, defineType } from "sanity"

export const mapLocationSchema = defineType({
  name: "mapLocation",
  type: "document",
  orderings: [
    {
      title: "Location Name",
      name: "locationName",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "streetAddress",
      type: "string",
    }),
    defineField({
      name: "city",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "state",
      type: "string",
      validation: (rule) => rule.required().min(2).max(2),
    }),
    defineField({
      name: "postalCode",
      type: "string",
      validation: (rule) => rule.min(5).max(5),
    }),
    defineField({
      name: "latitude",
      type: "number",
      validation: (rule) => rule.required().min(-90).max(90),
      fieldset: "coordinates",
    }),
    defineField({
      name: "longitude",
      type: "number",
      validation: (rule) => rule.required().min(-180).max(180),
      fieldset: "coordinates",
    }),
  ],
  // a “coordinates” group to keep things tidy
  fieldsets: [
    {
      title: "Coordinates",
      name: "coordinates",
      options: {
        columns: 2,
      },
    },
  ],
})
