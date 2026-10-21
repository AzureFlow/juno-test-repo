export interface CartItem {
  id: string;
  name: string;
  priceCents: number;
  quantity: number;
}

export class Cart {
  private items: CartItem[] = [];

  add(item: CartItem): void {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
      return;
    }
    this.items.push(item);
  }

  remove(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
  }

  totalCents(): number {
    return this.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  }

  clear(): void {
    this.items = [];
  }
}
