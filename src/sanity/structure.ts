import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('order').title('Orders'),
      S.documentTypeListItem('product').title('Products')
    ])
