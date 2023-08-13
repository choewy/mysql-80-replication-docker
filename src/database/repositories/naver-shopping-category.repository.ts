import { ShoppingCategory } from '../entities';

import { IRepository } from './abstracts';
import { InjectableRepository } from './decorators';

@InjectableRepository(ShoppingCategory)
export class ShoppingCategoryRepository extends IRepository<ShoppingCategory> {}
