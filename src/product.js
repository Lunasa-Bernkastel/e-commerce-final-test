
import { ref } from 'vue';

const brands = ref([
  'Vans', 'Bohoo', 'Mango', 'Reebok', 'Converse', 
  'Sandro', 'Nike', 'Adidas', 'Dior', 'Puma', 
  'Zara', 'Bershka', 'American Eagle'
]);

const mockImage = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80';

const popularItems = ref(Array(5).fill(null).map((_, idx) => ({
  id: idx + 1,
  price: 200000,
  name: idx === 0 ? 'Vintage chicago cubs white crewneck' : idx === 1 ? 'Red Crewneck' : 'Necklace',
  size: '8',
  brand: 'M',
  likes: 12,
  image: mockImage
})));

const newProducts = ref(Array(5).fill(null).map((_, idx) => ({
  id: idx + 10,
  price: 200000,
  name: idx === 0 ? 'Vintage chicago cubs white crewneck' : idx === 1 ? 'Red Crewneck' : 'Necklace',
  size: '8',
  brand: 'M',
  likes: 12,
  image: mockImage
})));

export  { newProducts, popularItems, brands }