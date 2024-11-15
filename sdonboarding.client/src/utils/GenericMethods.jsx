/**This files contains the common methods that can be used by different Templates.
 */

import customerApiServices from '../services/customerServices';
import productApiServices from '../services/productServices';
import storeApiServices from '../services/storeServices';

const genericMethods = {

    //Used to fetch all the customers records. Currently used to create and edit sale.
    async fetchCustomerDetails() {
        try {
            //getting totalCount
            let customersData = await customerApiServices.fetchCustomers({
                pageNumber: 1,
                pageSize: 1,
            });
            const totalCount = customersData.totalCount;

            //fetch again all the customer
            customersData = await customerApiServices.fetchCustomers({
                pageNumber: 1,
                pageSize: totalCount,
            });

            return customersData.dtos;

        } catch (errors) {
            console.log(errors);
            throw errors;
        }
    },
    //Used to fetch all the products records. Currently used to create and edit sale.
    async fetchProductDetails() {
        try {
            //getting totalCount
            let productsData = await productApiServices.fetchProducts({
                pageNumber: 1,
                pageSize: 1,
            });
            const totalCount = productsData.totalCount;

            //fetch again all the customer
            productsData = await productApiServices.fetchProducts({
                pageNumber: 1,
                pageSize: totalCount,
            });

            return productsData.dtos;

        } catch (errors) {
            console.log(errors);
            throw errors;
        }
    },
    //Used to fetch all the stores records. Currently used to create and edit sale.
    async fetchStoreDetails() {
        try {
            //getting totalCount
            let storesData = await storeApiServices.fetchStores({
                pageNumber: 1,
                pageSize: 1,
            });
            const totalCount = storesData.totalCount;

            //fetch again all the customer
            storesData = await storeApiServices.fetchStores({
                pageNumber: 1,
                pageSize: totalCount,
            });

            return storesData.dtos;

        } catch (errors) {
            console.log(errors);
            throw errors;
        }
    },
}

export default genericMethods;