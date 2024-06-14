export class Shirt {
    id: number;
    color: string;
    model: string;
    price: number;
  
    constructor(id: number, color: string, model: string, price: number) {
      this.id = id;
      this.color = color;
      this.model = model;
      this.price = price;
    }
  }