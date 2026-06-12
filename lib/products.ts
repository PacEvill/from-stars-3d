export interface StaticProduct {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string; // main image (first one)
  images: string[]; // all images
  categoria: string;
  tamanho: string | null;
  disponibilidade: string;
  tags: string[];
}

export const allProducts: StaticProduct[] = [
  // === EXISTING PRODUCTS ===
  {
    id: 1,
    nome: 'Frieren',
    descricao: 'A maga imortal em sua forma mais elegante e misteriosa. Figura de alta qualidade com detalhes minuciosos.',
    preco: 280.00,
    imagem: '/frieren/Frieren_01.png',
    images: ['/frieren/Frieren_01.png', '/frieren/Frieren_02.png', '/frieren/Frieren_03.png', '/frieren/Frieren_04.png'],
    categoria: 'Figures',
    tamanho: '18cm',
    disponibilidade: 'Sob encomenda',
    tags: ['Anime', 'Fantasia', 'Magia'],
  },
  {
    id: 2,
    nome: 'Mercy',
    descricao: 'A anjo da guarda de Overwatch em detalhes realistas impressionantes. Peça pintada à mão.',
    preco: 320.00,
    imagem: '/mercy/mercy_01.png',
    images: ['/mercy/mercy_01.png', '/mercy/mercy_02.png', '/mercy/mercy_03.png', '/mercy/mercy_04.png', '/mercy/mercy_05.png', '/mercy/mercy_06.png'],
    categoria: 'Figures',
    tamanho: '22cm',
    disponibilidade: 'Sob encomenda',
    tags: ['Gaming', 'FPS', 'Heroico'],
  },
  {
    id: 3,
    nome: 'Roxy Migurdia',
    descricao: 'A professora de magia com sua personalidade única e carismática. Impressão FDM com acabamento premium.',
    preco: 250.00,
    imagem: '/roxy-migurdia/roxy_migurdia_01.png',
    images: ['/roxy-migurdia/roxy_migurdia_01.png', '/roxy-migurdia/roxy_migurdia_02.png', '/roxy-migurdia/roxy_migurdia_03.png', '/roxy-migurdia/roxy_migurdia_04.png', '/roxy-migurdia/roxy_migurdia_05.png'],
    categoria: 'Figures',
    tamanho: '20cm',
    disponibilidade: 'Sob encomenda',
    tags: ['Anime', 'Fantasia', 'Magia'],
  },
  {
    id: 4,
    nome: 'Going Merry',
    descricao: 'O navio mais querido de One Piece em formato chibi adorável. Perfeito para fãs da tripulação Chapéu de Palha.',
    preco: 180.00,
    imagem: '/going-merry/going_merry_01.png',
    images: ['/going-merry/going_merry_01.png', '/going-merry/going_merry_02.png', '/going-merry/going_merry_03.png', '/going-merry/going_merry_04.png'],
    categoria: 'Decorativos',
    tamanho: '15cm',
    disponibilidade: 'Pronta-entrega',
    tags: ['Anime', 'Aventura', 'Chibi'],
  },
  {
    id: 5,
    nome: 'This is Fine',
    descricao: 'O meme clássico do cachorro em situação de caos, perfeitamente capturado em impressão 3D.',
    preco: 120.00,
    imagem: '/this-is-fine/this_is_fine_01.png',
    images: ['/this-is-fine/this_is_fine_01.png', '/this-is-fine/this_is_fine_02.png', '/this-is-fine/this_is_fine_03.png', '/this-is-fine/this_is_fine_04.png'],
    categoria: 'Decorativos',
    tamanho: '12cm',
    disponibilidade: 'Pronta-entrega',
    tags: ['Meme', 'Humor', 'Internet'],
  },
  // === NEW PRODUCTS (from catalogo images) ===
  {
    id: 6,
    nome: 'Hollow Knight — Coreto',
    descricao: 'Diorama do Knight descansando em um coreto ornamentado. Cena icônica do jogo com detalhes intrincados no gazebo.',
    preco: 350.00,
    imagem: '/hollow-knight-coreto/hollow_knight_coreto_01.jpeg',
    images: ['/hollow-knight-coreto/hollow_knight_coreto_01.jpeg'],
    categoria: 'Figures',
    tamanho: '20cm',
    disponibilidade: 'Sob encomenda',
    tags: ['Gaming', 'Indie', 'Diorama'],
  },
  {
    id: 7,
    nome: 'Hornet — Greenpath',
    descricao: 'Diorama detalhado da Hornet em Greenpath com cenário completo de floresta, cogumelos e fauna. Pintura artesanal.',
    preco: 450.00,
    imagem: '/hollow-knight-hornet/hollow_knight_hornet_01.jpeg',
    images: ['/hollow-knight-hornet/hollow_knight_hornet_01.jpeg'],
    categoria: 'Figures',
    tamanho: '25cm',
    disponibilidade: 'Sob encomenda',
    tags: ['Gaming', 'Indie', 'Diorama'],
  },
  {
    id: 8,
    nome: 'Ganyu Chibi',
    descricao: 'Figure chibi da Ganyu de Genshin Impact com base de gelo detalhada. Pintura vibrante com acabamento profissional.',
    preco: 200.00,
    imagem: '/ganyu-chibi/ganyu_chibi_01.jpeg',
    images: ['/ganyu-chibi/ganyu_chibi_01.jpeg'],
    categoria: 'Figures',
    tamanho: '12cm',
    disponibilidade: 'Pronta-entrega',
    tags: ['Gaming', 'Chibi', 'Genshin'],
  },
  {
    id: 9,
    nome: 'Jaspion',
    descricao: 'O herói tokusatsu Jaspion em pose de combate com espada laser. Pintura detalhada com acabamento metalizado.',
    preco: 280.00,
    imagem: '/jaspion/jaspion_01.jpeg',
    images: ['/jaspion/jaspion_01.jpeg'],
    categoria: 'Figures',
    tamanho: '22cm',
    disponibilidade: 'Sob encomenda',
    tags: ['Tokusatsu', 'Retrô', 'Action'],
  },
  {
    id: 10,
    nome: 'Máscara Oni',
    descricao: 'Máscara tradicional japonesa Oni em resina com pintura artesanal em vermelho metálico e dentes esculpidos.',
    preco: 190.00,
    imagem: '/mascara-oni/mascara_oni_01.jpeg',
    images: ['/mascara-oni/mascara_oni_01.jpeg', '/mascara-oni/mascara_oni_02.jpeg', '/mascara-oni/mascara_oni_03.jpeg'],
    categoria: 'Decorativos',
    tamanho: '18cm',
    disponibilidade: 'Pronta-entrega',
    tags: ['Japonês', 'Decoração', 'Máscara'],
  },
];
