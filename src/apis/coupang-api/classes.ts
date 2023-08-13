import { ShoppingCategory, ShoppingPlatform } from '@database/entities';
import { CoupangApiResultCode, CoupangShoppingCategoryStatus } from './enums';

export class CoupangApiResponse<T> {
  readonly code: CoupangApiResultCode;
  readonly message: string;
  readonly data: T;
}

export class CoupangShoppingCategory {
  readonly displayItemCategoryCode: number;
  readonly name: string;
  readonly status: CoupangShoppingCategoryStatus;
  readonly child: CoupangShoppingCategory[];

  public toEntity(parentId: number, depth: number) {
    const e = new ShoppingCategory();

    e.partentId = parentId ? parentId.toString() : null;
    e.platform = ShoppingPlatform.COUPANG;
    e.id = this.displayItemCategoryCode.toString();
    e.name = this.name;
    e.depth = depth;

    return e;
  }
}
