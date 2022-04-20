import { DeleteResult, UpdateResult } from 'typeorm';
import { Application } from 'express';
import { ProductStore } from '../entities/ProductStore';

export class ProductStoreService {

    /**
     * Return all users
     * @param app Express application
     * @returns Promise<User[]>
     */
    public static getProductStores(app: Application): Promise<ProductStore[]> {
        return app.get('db').getRepository(ProductStore).find();
    }

    /**
     * Return user by id
     * @param app Express application
     * @param id Product id
     * @returns Promise<User>
     */
     public static getProductStoresByProduct(app: Application, product_id: string): Promise<ProductStore[]> {
        return app.get('db').getRepository(ProductStore).find({
            where: {
                product_id: product_id
            }
        });
    }

    /**
     * Return user by id
     * @param app Express application
     * @param id Product id
     * @returns Promise<User>
     */
    public static getProductStoresByProductAndDC(app: Application, product_id: string, distributioncenter_id: string): Promise<ProductStore> {
        return app.get('db').getRepository(ProductStore).findOne({
            where: {
                product_id: product_id,
                distributioncenter_id: distributioncenter_id
            }
        });
    }

    /**
     * Add new user
     * @param app Express application
     * @param user User object
     * @returns Promise<User>
     */
    public static addProduct(app: Application, product: ProductStore): Promise<ProductStore> {
        return app.get('db').getRepository(ProductStore).save(product);
    }

    

}