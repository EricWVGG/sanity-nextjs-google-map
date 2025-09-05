"use client"

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { projectId, dataset, apiVersion } from "./src/sanity/env"
import { schema } from "./src/sanity/schemaTypes"

export default defineConfig({
  name: "default",
  title: "Demo",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      title: "Content",
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  scheduledPublishing: {
    enabled: false,
  },
})
