import AsyncStorageFunctions from "./functions/AsyncStorageFunctions"
import BrandFunctions from "./functions/BrandFunctions"
import CategoryFunctions from "./functions/CategoryFunctions"
import ProductFunctions from "./functions/ProductFunctions"
import { ListFunctions, itemFunctions } from "./functions/UserStorageFunctions"



const Storage = {

    storage: AsyncStorageFunctions,

    Category: CategoryFunctions,
    Brand: BrandFunctions,
    Product: ProductFunctions,
    List: ListFunctions,
    // Item: itemFunctions,

}

export default Storage

console.debug('-------------------------renderizando app')

// Storage.storage.setItem('USER_LISTS', '')

Storage.storage.setItem('CATEGORIES', 
    [
        {id: 1, name:'Pães', image: 'https://cdn-icons-png.flaticon.com/512/4670/4670821.png'},
        {id: 2, name:'Lácteos', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png'},
        {id: 3, name:'Frutas e legumes', image: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png'},
    ]
)

Storage.storage.setItem('PRODUCTS', [

  {id: 1, name: 'Pão Francês  400g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/3014/3014538.png'},
  {id: 2, name: 'Pão Francês Tradicional 400g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/2215/2215883.png'},
  {id: 3, name: 'Pão de forma Pullman 480g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/2215/2215883.png'},
  {id: 4, name: 'Pão de Forma Visconti 400g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/5411/5411390.png'},
  {id: 5, name: 'Bisnaguinha 350g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/3245/3245145.png'},
  {id: 6, name: 'Pão de queijo congelado, 1kg', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/347/347315.png'},

  {id: 7, name: 'Iorgute integral 200g', categoryId: 2, image: 'https://cdn-icons-png.flaticon.com/512/2689/2689423.png'},
  {id: 8, name: 'Requeijão cremoso 150g', categoryId: 2, image: ''},
  {id: 9, name: 'Queijo cheedar fatiado 100g', categoryId: 2, image: ''},
  {id: 10, name: 'Cream cheese culinário 1kg', categoryId: 2, image: ''},
  {id: 11, name: 'Queijo prato aparas 1kg', categoryId: 2, image: ''},
  {id: 12, name: 'Manteiga sem sal 200g', categoryId: 2, image: ''},

  {id: 13, name: 'Abacaxi', categoryId: 3, image: ''},
  {id: 14, name: 'Laranja', categoryId: 3, image: ''},
  {id: 15, name: 'Banana', categoryId: 3, image: ''},
  {id: 16, name: 'Limão', categoryId: 3, image: ''},
  {id: 17, name: 'Mamão', categoryId: 3, image: ''},
  {id: 18, name: 'Melão', categoryId: 3, image: ''},
  {id: 19, name: 'Maçã', categoryId: 3, image: ''},
  {id: 20, name: 'Abóbora', categoryId: 3, image: ''},
  {id: 21, name: 'Abobrinha', categoryId: 3, image: ''},
  {id: 22, name: 'Batata', categoryId: 3, image: ''},
  {id: 23, name: 'Tomate', categoryId: 3, image: ''},
  {id: 24, name: 'Cebola', categoryId: 3, image: ''},
  {id: 25, name: 'Alho', categoryId: 3, image: ''},
  {id: 26, name: 'Cenoura', categoryId: 3, image: ''},
  {id: 27, name: 'Pepino', categoryId: 3, image: ''},
  {id: 28, name: 'Beterraba', categoryId: 3, image: ''},
  {id: 29, name: 'Vagem', categoryId: 3, image: ''},
  {id: 30, name: 'Berinjela', categoryId: 3, image: ''},
  {id: 31, name: 'Chuchu', categoryId: 3, image: ''},
  {id: 32, name: 'Alface', categoryId: 3, image: ''},
  {id: 33, name: 'Brócolis', categoryId: 3, image: ''},
  {id: 34, name: 'Rúcula', categoryId: 3, image: ''},
  {id: 35, name: 'Uvas', categoryId: 3, image: ''},

])

