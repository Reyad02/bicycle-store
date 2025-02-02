export interface IBicycleData {
  _id: string;
  name: string;
  brand: string;
  type: string;
  price: string;
  image: string;
}

export interface IBicycle {
    _id: string
    name: string
    brand: string
    price: number
    type: string
    description: string
    quantity: number
    inStock: boolean
    image: string
    createdAt: string
    updatedAt: string
  }
  