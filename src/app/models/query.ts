import { Platform } from './platform';
import { System } from './system';
import { Class } from './class';
import { Library } from './library';
import { Product } from './product';

export class Query {

	 platform?: Platform;
	 system?: System;
	 library?: Library;
	 clazz?: Class;
     component?: String;
     product?: Product;
     
     constructor () {}

}