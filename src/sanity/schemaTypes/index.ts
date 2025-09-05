import { type SchemaTypeDefinition } from "sanity"

import { mapLocationSchema } from "./mapLocation"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [mapLocationSchema],
}
