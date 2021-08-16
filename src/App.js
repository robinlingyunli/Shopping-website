import React , {useState, useEffect} from 'react';
import fire from './fire';
import {commerce} from './lib/commerce';

import Products from './components/Products/Products';
import CategoryProducts from './components/CategoryProducts/CategoryProducts'
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState('false');

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    }

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    }


    const handleLogin = () =>{
        clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                    default:
                }
            })
        
    } 

    const handleSignUp = () =>{
        clearErrors();
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                    default:
                }
            })
    } 
    
    // const handleLogOut = () => {
    //     fire.auth().signOut();
    // }

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                clearInputs();
                setUser(user);
            }else{
                setUser("");
            }
        })
    }

    useEffect(()=>{
        authListener();
    }, []);

    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async()=>{
        const {data: categories} = await commerce.products.list();
        const {data: categoriesData } = await commerce.categories.list();
        
        const productsPerCategory = categoriesData.reduce((acc, catergory)=> {
            return [
                ...acc,
                {
                    ...catergory,
                    productsData: categories.filter((product) =>
                        product.categories.find((cat)=> cat.id === catergory.id) 
                    ),
                },
            ];
        }, []);
        setProduct(categories);
        setCategories(productsPerCategory);
    }

    const fetchCart = async()=>{
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async(productId, quantity)=>{
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    const handleUpdateCartQty = async(productId, quantity)=>{
        const item = await commerce.cart.update(productId, {quantity});
        setCart(item.cart);
    }

    const handleRemoveFromCart = async(productId)=>{
        const item = await commerce.cart.delete(productId);
        setCart(item.cart);
    }

    const handleEmptyCart = async()=>{
        const item = await commerce.cart.empty();
        setCart(item.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} categories={categories} />

                <Switch>
                    {user ?  (
                        <Route exact path="/">
                            <Products products={products} onAddToCart={handleAddToCart} />
                        </Route>
                    ):( 
                        <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} 
                        handleLogin={handleLogin} handleSignUp={handleSignUp} hasAccount={hasAccount} 
                        setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError} />
                    )}

                    {categories.map((catergory)=>{
                        return (
                            <Route exact path={"/"+catergory.name}>
                                <CategoryProducts categories={categories} name={catergory.name} onAddToCart={handleAddToCart} />
                            </Route>     
                        )
                        })}
                    <Route exact path="/cart">
                        <Cart 
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>               
                </Switch>
                        
            </div>
        </Router>

    )
}

export default App
