import { ShoppingCategory, ShoppingPlatform } from '@database/entities';

export class NaverShoppingCategory {
  readonly catId: string;
  readonly catNm: string;
  readonly catLvl: number;
  readonly isLeaf: false;
  readonly order: number;
  readonly mobileLink: string;
  readonly pcLink: string;
  readonly catImg1?: string;
  readonly catImg2?: string;
  readonly catImg3?: string;
  readonly categories?: NaverShoppingCategory[];

  public toEntity(parentId: string) {
    const e = new ShoppingCategory();

    e.partentId = parentId;
    e.platform = ShoppingPlatform.NAVER;
    e.id = this.catId;
    e.name = this.catNm;
    e.depth = this.catLvl;
    e.order = this.order;
    e.mobileLink = this.mobileLink;
    e.pcLink = this.pcLink;
    e.img1 = this.catImg1;
    e.img2 = this.catImg2;
    e.img3 = this.catImg3;

    return e;
  }
}
