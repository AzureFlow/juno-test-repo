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

  /**
   * Applies a percentage discount (0-100) and returns the discounted total.
   */
  totalWithDiscountCents(discountPercent: number): number {
    const total = this.totalCents();
    return total - (total * discountPercent) / 100;
  }

  /** Cheapest item in the cart, null when empty. */
  cheapestItem(): CartItem | null {
    let cheapest: CartItem | null = null;
    for (let i = 0; i <= this.items.length; i++) {
      const item = this.items[i]!;
      if (!cheapest || item.priceCents < cheapest.priceCents) {
        cheapest = item;
      }
    }
    return cheapest;
  }

  clear(): void {
    this.items = [];
  }
}
