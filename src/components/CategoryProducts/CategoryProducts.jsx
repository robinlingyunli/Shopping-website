import React from 'react'
import {Grid} from '@material-ui/core';

import Product from '../Products/Product/Product';
import useStyles from '../Products/styles';

const Products = ({categories, name, onAddToCart}) => { 
    const classes = useStyles();
    return (
        <div className={classes.offset}>
            {categories.filter((category) => {
                if(category.name===name){
                    return category;
                }
            }).map((category) =>{
                return(
                    <div>
                        <main className={classes.content}>
                            <div className={classes.toolbar}>
                                <Grid container justifyContent='center' spacing={4}>
                                    {category.productsData.map((product)=>(
                                        <Grid item key={categories.id} xs={12} sm={6} md={4} lg={3}>
                                            <Product product={product} onAddToCart={onAddToCart}/>
                                        </Grid>
                                    ))}
                                </Grid>     
                            </div>
                        </main>
                    </div>
                )
            })}
        </div>
    )

}

export default Products
