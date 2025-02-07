import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import order from './order'  // Correct: default import

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order],
}
