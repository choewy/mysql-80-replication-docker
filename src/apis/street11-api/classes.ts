import { ShoppingCategory, ShoppingPlatform } from '@database/entities';
import { plainToInstance } from 'class-transformer';

export class Street11XMLShoppingCategory {
  readonly dispNo: { _text: string };
  readonly dispNm: { _text: string };
  readonly depth: { _text: string };
  readonly parentDispNo: { _text: string };
  readonly engDispYn?: { _text: 'Y' | 'N' };
  readonly gblDlvYn?: { _text: 'Y' | 'N' };
  readonly leafYn?: { _text: 'Y' | 'N' };
  readonly requiredYn?: { _text: 'Y' | 'N' };
  readonly certType?: { _text: 'Y' | 'N' };

  public static of(row: Street11XMLShoppingCategory) {
    return plainToInstance(Street11XMLShoppingCategory, row);
  }

  public toEntity() {
    const e = new ShoppingCategory();

    e.platform = ShoppingPlatform.STREET11;
    e.partentId = this.parentDispNo._text;
    e.id = this.dispNo._text;
    e.name = this.dispNm._text;
    e.depth = Number(this.depth._text);

    return e;
  }
}

export class Street11XMLShoppingCategoryResponse {
  readonly _declaration: {
    readonly _attributes: {
      encoding: 'euc-kr';
      version: string;
      standalone: 'yes';
    };
  };

  readonly 'ns2:categorys': {
    readonly _attributes: { 'xmlns:ns2': string };
    readonly 'ns2:category': Street11XMLShoppingCategory[];
  };

  public getCategories() {
    let categories = this['ns2:categorys']['ns2:category'];

    if (!categories) {
      return [];
    }

    categories = Array.isArray(categories) ? categories : [categories];

    return categories
      .filter(
        (r) => r.gblDlvYn._text === 'Y' && r.engDispYn._text === 'N' && (!r.requiredYn || r.requiredYn._text === 'N'),
      )
      .map(Street11XMLShoppingCategory.of);
  }
}
